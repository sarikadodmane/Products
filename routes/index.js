const express = require('express')
const router = express.Router()  //
const controller = require('../controller/product.js')

//using the post method to insert the new record in the database
router.post('/addProduct', (req, res) => {
    controller.addProduct(req, res)  //sending the request body to the controller which will create a new record in the table called product in the database
})

router.get('/product', (req, res) => {
    controller.listProduct(req, res)  //getting the list of the product by giving category_id
})

router.get('/product/details/:slug', (req, res) => {
    controller.productDetails(req, res)  //getting the details of the product
})

router.post('/addCategory', (req, res) => {
    controller.addCategory(req, res)  //sending the request body to the controller which will create a new record in the table called category in the database
})

router.get('/category/:product_id', (req, res) => {
    controller.listCategory(req, res)  //getting the list of the category by giving product_id
})

router.get('/sendMail', (req, res) => {
    controller.sendMail(req, res)  //this should be called by Cron job which will run every day
})
//exporting the route so that we can use in the index file by importing it
module.exports = router