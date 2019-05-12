var uniqID = require('uniq-id');

function CustomerService(dao) {
    winston = require('winston')
    md5 = require('md5.js')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {service: 'user-service'},
        transports: [
            new winston.transports.File({filename: 'error.log', level: 'error'}),
            new winston.transports.File({filename: 'combined.log'})
        ]
    });
    if (dao != undefined && dao != null) {
        this.dao = dao
    }
    else {
        this.dao = require('../dao')
    }
}

CustomerService.prototype.list = function (callback) {
    this.dao.readAll("customers", (customers) => {
        logger.info(`${customers.length} customers were found!`)
        callback(customers)
    })
}
CustomerService.prototype.registerCustomer = function (customer, succes, error) {
    var customerID = uniqID.generateUUID('xxxx', 10)();

    this.dao.piece({"_id": customerID}, 'customers', (piece) => {
        if (piece !== 0) {
            error("This customer _id is already in use! Try again")
        } else {
            customer['_id'] = customerID
            this.dao.insert('customers', customer, (inserted) => {
                logger.info(`${customer.customer.name} inserted!`)
                succes(inserted)
            })
        }
    })
}
CustomerService.prototype.addShutter = function (data, succes, error) {
//console.log(data.orderID)
    var orderID = uniqID.generateUUID('xxxx', 10)();
    var shutterID
    this.dao.piece({"orderID": orderID}, 'orders', (piece) => {
        if (piece !== 0) {
            error("This orderID is already in use!")
        } else {
            data['_id'] = orderID
            for (let i of  data['shutter']) {
                shutterID = uniqID.generateUUID('xxxx', 10)();
                i.shutterID = shutterID
                //  console.log(i.shutterID)
            }
            this.dao.insert('orders', data, () => {
                // console.log(data.customer.customerID)
                var mit = {"_id": data.customer.customerID.toString()}
                var mire = {$push: {"customer.ordersID": orderID}}
                this.dao.update("customers", mit, mire, () => {
                    logger.info(`${data.customer.name} has placed the order with orderID: ${orderID}`)
                    succes()
                })
            })

        }
    })
}
CustomerService.prototype.submit = function (orderID, succes, error) {
    var mit = {"_id": orderID}
    var mire = {$set: {"status": "submitted"}}
    this.dao.read(mit, "orders", (order) => {
        if (order[0].status === "added") {
            this.dao.update("orders", mit, mire, () => {
                succes()
            })
        } else {error()}
    })
}
CustomerService.prototype.invoice = function (orderID, succes, error) {
    var mit = {"_id": orderID}
    this.dao.read(mit, "orders", (order) => {
       // console.log(order[0].invoice)
        if(order[0].invoice !== undefined && order[0].invoice !== null){
            succes(order)
        } else error("Nincs még számla")
    })
}

CustomerService.prototype.ownOrders = function (customerID, succes) {
    //console.log(customerID)
    var id = {"customer.customerID": Number(customerID)}
    this.dao.read(id, "orders", (orders) => {
        succes(orders)
    })
}
CustomerService.prototype.ownOrdersShutters = function (customerID, succes) {
    //console.log(customerID)
    var id = {"customer.customerID": Number(customerID)}
    this.dao.read(id, "orders", (orders) => {
        console.log(orders)
        succes(orders)
    })
}


module.exports = CustomerService;