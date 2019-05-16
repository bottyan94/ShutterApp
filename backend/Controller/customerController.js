var express = require('express');
var router = express.Router();

var srs = require('../Service/customerService')
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
        (inserted) => {
            res.status(200).send(inserted)
        },
        (error) => {
            res.status(400).send(error)
        })
})
router.post('/addShutter', (req, res) => {
    customerService.addShutter(req.body,
        (request) => {
            res.status(200).send(request)
        },
        (error) => {
            res.status(400).send(error)
        })
})
router.get('/ownOrders/:customerID', (req, res) => {
    try {
        customerService.ownOrders(req.params['customerID'], (orders) => {
            res.status(200).send(orders)
        })
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/submit/:orderID', (req, res) => {
    customerService.submit(req.params['orderID'],
        (submitted) => {
            try {
                res.status(200).send(submitted)
            } catch (e) {
                res.status(400).send(e)
            }
        })
})
router.get('/invoice/:orderID', (req, res) => {
    customerService.invoice(req.params['orderID'],
        (invoice) => {
            //console.log(invoice);
            res.status(200).send(invoice)
        },
        (error) => {
            res.status(500).send(error)
        })
})
router.get('/pay/:orderID', (req, res) => {
    customerService.pay(req.params['orderID'],
        (succes) => {
            res.status(200).send(succes)
        },
        (err) => {
            res.status(500).send(err)
        })
})

module.exports = router;