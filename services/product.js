const getUuid = require('uuid-by-string')
const Product = require('../model/product')
const Category = require('../model/category')
const service = require('./sendMail')
const slug = require('slug')


exports.addProduct = (data) => {
    console.log(data)

    let id = getUuid(data.name) //generating unique identifier by using the name
    return Product.findOne({
        where: { id }
    }).then(async (result) => {
        if (result == null) {
            return Product.create({
                id: id,
                name: data.name,
                description: data.description,
                price: data.price,
                images: data.images,
                category: data.category,
                offer_expiry_date: await offer_expiry_date(data.offer_expiry_in_days),
                status: 1  //active  = 1 ,inactive = 0 (after product getting expired)
            })
        }
        return false
    }).catch(error => {
        console.log(error, "Create Product")
        throw error
    })
}

function offer_expiry_date(date) {
    const expiry_date = new Date()
    expiry_date.setDate(expiry_date.getDate() + date)
    return expiry_date;
}


exports.listProduct = (id) => {

    if (id != null) {
        return Category.findOne({
            where: { id }
        }).then(async (result) => {
            if (result && result.length > 0) {
                let product_id = result.dataVales.product_id
                return Product.findOne({
                    attributes: ['name', 'description'],
                    where: { id: product_id }
                }).then(productResult => {
                    let hyphenatedName = slug(productResult.dataValues.name)
                    return {
                        name: productResult.dataValues.name,
                        slug: hyphenatedName,
                        description: productResult.dataValues.description
                    }
                })
            } else {
                return result
            }
        }).catch(error => {
            console.log(error, "Product List")
            throw error
        })
    } else {
        return Product.findOne({ attributes: ['name', 'description'] }).then(async (result) => {
            if (result) {
                let hyphenatedName = slug(result.dataValues.name)
                return {
                    name: result.dataValues.name,
                    slug: hyphenatedName,
                    description: result.dataValues.description
                }
            } else {
                return result
            }
        }).catch(error => {
            console.log(error, "Product List")
            throw error
        })
    }
}

exports.productDetails = (inputSlug) => {

    return Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'category', 'images']
    }).then(async productResult => {
        let productSlug
        if (productResult.length > 0) {
            return productResult.map(product => {
                productSlug = slug(product.dataValues.name)
                if (inputSlug === productSlug) {  //checking the input given is as same as hyphenatedName
                    return {
                        name: product.dataValues.name,
                        description: product.dataValues.description,
                        price: product.dataValues.price,
                        categoryHierarchy: getCategoryDetails(product.dataValues.id),
                        images: product.dataValues.images
                    }
                }
            });
        }

    }).catch(error => {
        console.log(error, "Product List")
        throw error
    })
}
function getCategoryDetails(product_id) {
    return Category.findAll({ where: { product_id } })
}
exports.addCategory = (data) => {
    console.log(data)

    let id = getUuid(data.name) //generating unique identifier by using the name
    return Category.create({
        id: id,
        name: data.hyphenedName,
        product_id: data.product_id
    }).catch(error => {
        console.log(error, "Create Category")
        throw error
    })
}

exports.listCategory = (product_id) => {

    return Category.findOne({
        where: { product_id: product_id }
    }).then(async (result) => {
        if (result) {
            return result.dataValues
        } else {
            return result
        }
    }).catch(error => {
        console.log(error, "Category List")
        throw error
    })
}

exports.sendMail = () => {

    Product.findAll({ attributes: [`id`, `name`, `description`, `price`, `images`, `category`, `offer_expiry_date`, `status`] }).then(async productResult => {
        if (productResult != null) {

            productResult.forEach(async element => {
                let product_id = element.dataValues.id
                let productExpiresInDays = await getDaysDiff(element.dataValues.offer_expiry_date)
                let productDetails = element.dataValues
                if (productExpiresInDays <= 5) {
                    let subject, result
                    Category.findAll({ where: { product_id } })
                        .then(categoryResult => {
                            let categoryDetails = categoryResult[0]
                            delete productDetails['id']
                            result = [productDetails, categoryDetails]
                            if (productExpiresInDays === 0) {
                                subject = 'Hurry Up !! Offer expires today '
                            } else if (productExpiresInDays === 1) {
                                subject = 'Hurry Up !! Offer expires tomorrow '
                            } else {
                                subject = 'Hurry Up !! Offer expires in ' + productExpiresInDays + ' days'
                            }
                            if (subject != null) service.sendMail(result, subject)
                        })
                }
            })
        }
    }).catch(error => {
        console.log(error, "Send Mail")
        throw error
    })
}


function getDaysDiff(date) {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays + " days");
    return diffDays
}