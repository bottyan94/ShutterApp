var express = require('express');
var router = express.Router();

var srs = require('./managerService')
const managerService = new srs();

router.get('/',(req, res) => {
    res.status(200).send("Hello")
})

router.get('/listOrders',(req,res)=>{
    managerService.listOrders((request)=>{
        res.status(200).send(request)
    })
})
router.post('/customers',(req,res)=>{
    managerService.customers((request)=>{
        res.status(200).send(request)
    })
})
router.get('/install/:orderID',(req,res)=>{
    managerService.install(req.params['orderID'],(request)=>{
        res.status(200).send(request)
    })
})
router.get('/invoice/:orderID',(req,res)=>{
    managerService.invoice(req.params['orderID'],(request)=>{
        res.status(200).send(request)
    })
})
router.get('/stat',(req,res)=>{
    managerService.stat((request)=>{
        res.status(200).send(request)
    })
})

module.exports = router;