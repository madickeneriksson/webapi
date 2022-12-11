let products = require('../data/database')
const express = require('express')
const controller = express.Router()


controller.param("articleNumber", (req, res, next, articleNumber ) => {
 req.product = products.find(x => x.articleNumber == articleNumber)
    next()
})
controller.param("tag", (req, res, next, tag ) => {
    req.product = products.filter(x => x.tag== tag)
       next()
   })

controller.route('/details/:articleNumber').get((req, res) => {
    if(req.product != undefined)
    res.status(200).json(req.products)
    else
    res.status(404).json()
})

controller.route('/:tag').get((req, res) => {
    if(req.product != undefined)
    res.status(200).json(req.products)
    else
    res.status(404).json() 
})
controller.route('/').get((req, res) => {
    res.status(200).json(products)
})

module.exports = controller


