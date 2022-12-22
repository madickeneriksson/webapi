const express = require('express')
const controller = express.Router()

const productSchema = require('../schemas/productSchema')

// osäkra router
controller.route('/').get(async(req, res) => {
    const products = []
    const list = await productSchema.find()
    if(list) {
         for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                rating: product.rating,
                imageName: product.imageName,
                tag: product.tag
            })
        }
        res.status(200).json(products)
    } else
    res.status(400).json() 
})


controller.route('/:tag').get(async(req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag })
    if(list) {
         for(let product of list) {
            products.push ({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                rating: product.rating,
                imageName: product.imageName,
                tag: product.tag
            })
        }
        res.status(200).json(products)
    } else
    res.status(400).json() 
})

controller.route('/:tag/:take').get(async(req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag }) .limit(req.params.take)
    if(list) {
        for(let product of list) {
           products.push ({
               articleNumber: product._id,
               name: product.name,
               description: product.description,
               price: product.price,
               category: product.category,
               rating: product.rating,
               imageName: product.imageName,
               tag: product.tag
           })
    }
    res.status(200).json(products)
   } else
   res.status(400).json() 
})

controller.route('/product/details/:articleNumber').get(async(req, res) => {
    const product = await productSchema.findById(req.params.articleNumber)
    if(product) {
        res.status(200).json(product)({
            articleNumber: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            rating: product.rating,
            imageName: product.imageName,
            tag: product.tag
        })
    } else
    res.status(404).json() 
})

// säkra rauter
controller.route('/').post(async(req, res) => {
    const { tag, name, description, category, price, rating, imageName } = req.body

    if (!name || !price)
    res.status(400).json({text: 'name and price is required!'})

    const item_exists = await productSchema.findOne({name})
    if (item_exists)
    res.status(409).json({text: 'product already exist!'})
    else {
        const product = await productSchema.create({
            tag,
            name,
            description,
            category,
            price,
            rating,
            imageName
        })
        if (product)
        res.status(201).json({text: `product ${product._id} is created`})
        else
        res.status(400).json({text: 'somthing went wrong'})
    }
})
controller.route('/:articleNumber').delete(async(req, res) => {
    if(!req.params.articleNumber)
    res.status(400).json('enter a article number')
    else {
    const item = await productSchema.findById(req.params.articleNumber)
    if (item) {
        await productSchema.remove(item)
        res.status(200).json({text: `product ${req.params.articleNumber} is removed`})
    } else {
        res.status(404).json({text: `product ${req.params.articleNumber} is not found`})
    }
    }
})

controller.route('/:articleNumber').put(async(req, res) => {
    console.log(req.params)
    if(!req.params.articleNumber)
    res.status(400).json('enter a article number')
    else {
    const item = await productSchema.findByIdAndUpdate((req.params.articleNumber), req.body, {new: true })

        if(item) {
            res.status(200).json({text: `product ${req.params.articleNumber} was updated`})
        } else {
            res.status(401).json({text: `product ${req.params.articleNumber} not found`})
        }
        }
    })
    
    


module.exports = controller

