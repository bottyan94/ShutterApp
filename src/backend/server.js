var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const port = 8080

app.use(bodyParser.json());

const customerController = require('./Customer/customerController')
app.use('/customer', customerController)

const workerController = require('./Worker/workerController')
app.use('/worker',workerController)

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})