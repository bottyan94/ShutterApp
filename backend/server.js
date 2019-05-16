var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const port = 8080

app.use(bodyParser.json());

const customerController = require('./Controller/customerController')
app.use('/customer', customerController)

const workerController = require('./Controller/workerController')
app.use('/worker',workerController)

const managerController = require('./Controller/managerController')
app.use('/manager',managerController)


app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
module.exports=app;