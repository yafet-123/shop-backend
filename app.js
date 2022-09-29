const express = require('express')
const morgan = require('morgan')
// it will console in to cmd the information is request method get,post and other the url and
// the time take
const bodyParser = require('body-parser')
const app = express()
const ProductRoutes = require('./api/routes/products')
const OrdersRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user');

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

app.use(morgan('dev'))
// this is to see the image that is stored in the db
app.use('/uploads', express.static('uploads'));
// the data that came from request is not easily readible so we need body-parser 
app.use(bodyParser.urlencoded({extended:false}))
// the above line is get url data extended means extended or large data
app.use(bodyParser.json());
// json data

mongoose.connect('mongodb+srv://Yafet:yafet123@cluster0.fv6qplg.mongodb.net/?retryWrites=true&w=majority')
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*')
	// it will allow the cors and * for all site but we can restrict it and set the headers
	res.header('Access-Control-Allow-Headers','Origin , X-Requested-With , Content-Type, Accept, Authorization')
	if(req.method == 'OPTIONS'){
		// browser send option efore it send request method
		// so we add additional header
		res.header('Access-Control-Allow-Methods','GET,POST, PATCH, PUT, DELETE')
		return res.status(200).json({})
	}
	next()
})

app.use('/products', ProductRoutes)
app.use('/orders', OrdersRoutes)
app.use("/user", userRoutes);
// after it pass the products and orders if the request not found in the product and orders routes
// it will get this error

app.use((req,res,next)=>{
	const error = new Error("Not found")
	// set the error to not found this is the message
	error.status = 404
	// set the error status to 404
	next(error)
	// go to other by passing the error ith status and message
})

app.use((error,req,res,next)=>{
	res.status(error.status || 500)
	// res status equal to the error the status that is 404 if it is not set it will be 500 then set the message
	res.json({
		error:{
			message:error.status
		}
	})
})


module.exports = app;