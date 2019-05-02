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

router.post('/addWindow', (req, res) => {
    customerService.addWindow(req.body)
    res.status(200).send(req.body)
})
router.post('/addShutter', (req, res) => {
    customerService.addShutter(req.body)
    res.status(200).send(req.body)
})


module.exports = router;