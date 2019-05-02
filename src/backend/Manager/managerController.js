var express = require('express');
var router = express.Router();

var srs = require('./managerService')
const service = new srs();

router.get('/',(req, res) => {
    res.status(200).send("Hello")
})