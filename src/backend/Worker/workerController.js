var express = require('express');
var router = express.Router();

var srs = require('./workerService')
const service = new srs();

router.get('/',(req, res) => {
    res.status(200).send("Hello")
})