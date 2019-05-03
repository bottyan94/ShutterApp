var express = require('express');
var router = express.Router();

var srs = require('./workerService')
const workerService = new srs();

router.get('/',(req, res) => {
    res.status(200).send("Hello")
})
router.get('/listOrders', (req, res) => {
    workerService.listOrders((requests) => {
        res.status(200).send(requests)
    })
})
router.get('/selectedOrder', (req, res) => {
    workerService.selectedOrder(req.query['name'], (request) => {
        res.status(200).send(request)
    })
})
module.exports = router;