const express = require('express')
const route = express.Router();
const mongoose = require("mongoose");
const ProductsController = require('../controllers/products');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file if null , false
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

route.get('/', ProductsController.products_get_all)

route.post('/', upload.single('productImage'), checkAuth,  ProductsController.products_create_product)

route.get('/:productID', ProductsController.products_get_product)

route.patch('/:productID', checkAuth, ProductsController.products_update_product)

route.delete('/:productID', checkAuth, ProductsController.products_delete)

module.exports = route