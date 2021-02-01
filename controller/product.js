const slug = require('slug') //importing the module to get the hyphenated string
const service = require('../services/product')

exports.addProduct = async (req, res) => {

    //reading the req body
    const { name, description, price, images, category, offer_expiry_in_days } = req.body || {}
    console.log('name',req.body.name)

    if (!name) {
        return res.status(400).send({ error: "Please give a name of the product!." })
    }

    let result = await service.addProduct({ name, description, price, images, category, offer_expiry_in_days })
    if (result) {
        res.status(200).send({ message: "Product Created" });
    } else {
        return res.status(400).json({ message: "Product Creation failed" })
    }
}

exports.listProduct = async (req, res) => {

    let category_id = req.query.category_id || null
    let result = await service.listProduct(category_id)
    if (result) {
        res.status(200).send(result);
    } else {
        return res.status(400).json({ message: "list not found" })
    }
}

exports.productDetails = async (req, res) => {
    const slug = req.params.slug
    let result = await service.productDetails(slug)
    if (result) {
        res.status(200).send(result);
    } else {
        return res.status(400).json({ message: "Details not found" })
    }
}

exports.addCategory = async (req, res) => {

    //reading the req body
    const { name, product_id } = req.body || {}

    if (!name) {
        return res.status(400).send({ error: "Please give a name of the category!." })
    }
    let result = await service.addCategory({ name, product_id })
    if (result) {
        res.status(200).send({ message: "Category Created" });
    } else {
        return res.status(400).json({ message: "category Creation failed" })
    }
}

exports.listCategory = async (req, res) => {

    //reading the req body
    const product_id = req.params.product_id

    let result = await service.listCategory(product_id)
    if (result) {
        res.status(200).send(result);
    } else {
        return res.status(400).json({ message: "list not found" })
    }
}

exports.sendMail = async (req, res) => {

    service.sendMail()
    return res.status(200).json({ message: "All good" })

}