var express = require('express');
var router = express.Router();

var srs = require('./managerService')
const managerService = new srs();

router.get('/',(req, res) => {
    res.status(200).send("Hello")
})

router.get('/list',(req,res)=>{
    managerService.list((request)=>{
        res.status(200).send(request)
    })
})
router.post('/customer',(req,res)=>{
    managerService.customer((request)=>{
        res.status(200).send(request)
    })
})
module.exports = router;