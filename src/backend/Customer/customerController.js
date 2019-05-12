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
router.post('/registerCustomer', (req, res) => {
    if (req.body[`customer`][`name`] === undefined || req.body[`customer`][`name`] === "") {
        res.status(414).send("Name must be defined");
        return
    }
    if (req.body[`customer`][`email`] === undefined || req.body[`customer`][`email`] === "") {
        res.status(414).send("Email must be defined");
        return
    }
    if (req.body[`customer`][`birth`] === undefined || req.body[`customer`][`birth`] === "") {
        res.status(414).send("Birth must be defined");
        return
    }
    customerService.registerCustomer(req.body,
        (inserted) => {res.status(200).send(inserted)},
        (bcs) => {res.status(400).send(bcs)}
        )

})
router.post('/addShutter', (req, res) => {
    /*if (req.body[`shutter`][`height`] == undefined || req.body[`shutter`][`height`] === "") {
        res.status(414).send("shutter Height must be defined or too small this size")
        return
    }
    if (req.body[`shutter`][`width`] == undefined || req.body[`shutter`][`width`] === "") {
        res.status(414).send("shutter Width must be defined or too small this size")
        return
    }
    if (req.body[`shutter`][`color`] == undefined || req.body[`shutter`][`color`] === "") {
        res.status(414).send("shutter color must be defined")
        return
    }
    if (req.body[`shutter`][`type`] == undefined || req.body[`shutter`][`type`] === "") {
        res.status(414).send("shutter type must be defined")
        return
    } */
    customerService.addShutter(req.body,
        (request) => {res.status(200).send(request)},
        (bcs) => {res.status(400).send(bcs)})
})
router.get('/ownOrders/:customerID', (req, res) => {
    customerService.ownOrders(req.params['customerID'], (orders) => {
        res.status(200).send(orders)
    })
})
router.get('/submit/:orderID', (req, res) => {
    customerService.submit(req.params['orderID'],
        (submitted) => {res.status(200).send(submitted)},
        (error) => {res.status(400).send("u cant do thath")})
})
router.get('/invoice/:orderID', (req, res) => {
    customerService.invoice(req.params['orderID'],
        (invoice) => {console.log(invoice);res.status(200).send(invoice)},
        (error) => {res.status(400).send(error)})
})

module.exports = router;