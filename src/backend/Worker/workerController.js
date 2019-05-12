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
router.get('/selectShutter/:shutterID', (req, res) => {
  //  console.log(req.params['shutterID'])
    workerService.selectShutter(req.params['shutterID'],
        (request) => {res.status(200).send(request)},
            (bcs) => {res.status(400).send(bcs)})
})
router.post('/listParts', (req, res) => {
    workerService.listParts(req.body.orderID,
        (request) => {
        res.status(200).send(request)},
        (bcs) => {res.status(400).send(bcs)})
})
router.get('/finish/:orderID', (req, res) => {
    workerService.finish(req.params['orderID'],
        (request) => {res.status(200).send(request)},
        (bcs) => {res.status(400).send(bcs)})
})
router.get('/listPart/:shutterID', (req, res) => {
    workerService.listPart(req.params['shutterID'],
        (request) => {res.status(200).send(request)},
        (bcs) => {res.status(400).send(bcs)})
})
module.exports = router;