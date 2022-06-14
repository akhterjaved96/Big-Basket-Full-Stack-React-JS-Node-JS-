const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const authenticate = require('../middlewares/authenticate');

/*
    USAGE : Get all the Products
    URL : http://127.0.0.1:5000/api/products/all
	REQUEST : GET
	method : router.get()
	fields : no-fields
 */
router.get('/all', async (request, response) => {
    try {
        let products = await Product.find();
        response.status(200).json(products);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: error.message
        });
    }
});

/*
    USAGE : Get a single Products
    URL : http://127.0.0.1:5000/api/products/:productId
	REQUEST : GET
	method : router.get()
	fields : no-fields
 */
router.get('/:productId', async (request, response) => {
    let {productId} = request.params;
    try {
        let products = await Product.findById(productId);
        response.status(200).json(products);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: error.message
        });
    }
});

/*
    USAGE : Create a Products
    URL : http://127.0.0.1:5000/api/products/
	REQUEST : POST
	method : router.post()
	fields : name , image , price , qty , info
 */
router.post('/', authenticate, async (request, response) => {
    let {name , image , price , qty , info} = request.body;
    let newProduct = {
        name: name,
        image: image,
        price: price,
        qty: qty,
        info: info
    };
    try {
        // if Product is already exists
        let product = await Product.findOne({name: newProduct.name});
        if(product){
            return response.status(401).json({
                msg : 'Product is Already Exists'
            });
        }
        // save to database
        product = new Product(newProduct);
        product = await product.save();
        response.status(200).json({
            result : 'Product Creation success',
            product : product
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: error.message
        });
    }
});

/*
    USAGE : Update a Product
    URL : http://127.0.0.1:5000/api/products/:productId
	REQUEST : PUT
	method : router.put()
	fields : name , image , price , qty , info
 */
router.put('/:productId', authenticate, async (request, response) => {
    let {productId} = request.params;
    let {name , image , price , qty , info} = request.body;
    let updateProduct = {
        name: name,
        image: image,
        price: price,
        qty: qty,
        info: info
    };
    try {
        // if Product is already exists
        let product = await Product.findById(productId);
        if(!product){
            return response.status(401).json({
                msg : 'Product is Not Exists'
            });
        }
        // update to database
        product = await Product.findByIdAndUpdate(productId, {
            $set : updateProduct
         }, {new : true});
         response.status(200).json({
             result : 'Product Update is success',
             product : product
         });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: error.message
        });
    }
});

/*
    USAGE : Delete a Product
    URL : http://127.0.0.1:5000/api/products/:productId
	REQUEST : DELETE
	method : router.delete()
	fields : no-fields
 */
router.delete('/:productId', authenticate, async (request, response) => {
    let {productId} = request.params;
    try {
         // if product is already exists
         let product = await Product.findById(productId);
         if(!product){
             return response.status(401).json({
                 msg : 'Product is Not Exists'
             });
         }
        // delete from database
        product = await Product.findByIdAndDelete(productId);
        response.status(200).json({
            result : 'Product Deletion is success',
            product : product
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
