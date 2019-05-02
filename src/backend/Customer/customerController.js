var express = require('express');
var router = express.Router();

var srs = require('./customerService')
const customerService = new srs()

router.get('/', (req, res) => {
    res.status(200).send("Hello this is a shutter application!")
})

router.get('/list', (req, res) => {
    customerService.list((requests) => {
        res.status(200).send(requests)
    })
})
router.get('/ownOrders', (req, res) => {
    customerService.ownOrders(req.query['name'], (request) => {
        res.status(200).send(request)
    })
})

//TODO EMAIL AND PHONE VALIDATION
router.post('/registerCustomer', (req, res) => {
    if (req.body[`customer`][`name`] == undefined || req.body[`customer`][`name`] === "") {
        res.status(414).send("Name must be defined")
        return
    }
    if (req.body[`customer`][`email`] == undefined || req.body[`customer`][`email`] === "") {
        res.status(414).send("Email must be defined")
        return
    }
    if (req.body[`customer`][`phone`] == undefined || req.body[`customer`][`phone`] === "") {
        res.status(414).send("Phone must be defined")
        return
    }
    if (req.body[`customer`][`birth`] == undefined || req.body[`customer`][`birth`] === "") {
        res.status(414).send("Birth must be defined")
        return
    }

    customerService.registerCustomer(req.body, (request) => {
        res.status(200).send(request)
    })

})

router.post('/addWindow', (req, res) => {
    if (req.body[`windows`][`window`][`height`] == undefined || req.body[`windows`][`window`][`height`] === "" || req.body[`windows`][`window`][`height`] < 20) {
        res.status(414).send("Window Height must be defined or too small this size")
        return
    }
    if (req.body[`windows`][`window`][`width`] == undefined || req.body[`windows`][`window`][`width`] === "" || req.body[`windows`][`window`][`width`] < 20) {
        res.status(414).send("Window Width must be defined or too small this size")
        return
    }
    customerService.addWindow(req.body)
    res.status(200).send(req.body)
})
router.post('/addShutter', (req, res) => {
    if (req.body[`shutters`][`shutter`][`height`] == undefined || req.body[`shutters`][`shutter`][`height`] === "" || req.body[`shutters`][`shutter`][`height`] < 20) {
        res.status(414).send("Window Height must be defined or too small this size")
        return
    }
    if (req.body[`shutters`][`shutter`][`width`] == undefined || req.body[`shutters`][`shutter`][`width`] === "" || req.body[`shutters`][`shutter`][`width`] < 20) {
        res.status(414).send("Window Width must be defined or too small this size")
        return
    }
    customerService.addShutter(req.body)
    res.status(200).send(req.body)
})
router.post('/submit', (req, res) => {
    customerService.submit(req.body)
    res.status(200).send(req.body)
})

module.exports = router;