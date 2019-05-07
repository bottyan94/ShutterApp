var express = require('express');
var router = express.Router();

var srs = require('./workerService')
const workerService = new srs();

router.get('/', (req, res) => {
    res.status(200).send("Hello")
})
router.get('/listOrders', (req, res) => {
    workerService.listOrders((requests) => {
        res.status(200).send(requests)
    })
})
router.post('/selectedOrder', (req, res) => {
    workerService.selectedOrder(req.body.shutterID, (request) => {
        res.status(200).send(request)
    })
})
router.post('/listParts', (req, res) => {
    workerService.listParts(req.body.orderID, (request) => {
        res.status(200).send(request)
    })
})
router.post('/assemble', (req, res) => {
    workerService.assemble(req.body.shutterID, (request) => {
        res.status(200).send(request)
    })
})
module.exports = router;