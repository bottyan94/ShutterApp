var uniqID = require('uniq-id');

function managerService(dao) {
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

managerService.prototype.listOrders = function (callback) {
    this.dao.readAll("orders", (orders) => {
        //console.log(orders)
        // logger.info(`${orders.length} customers were found!`)
        callback(orders)
    })
}
managerService.prototype.customers = function (callback) {
    var all = {"_id": {$ne: null}}
    this.dao.read(all, "customers", (customers) => {
        logger.info(`${customers.length} customers were found!`)
        callback(customers)
    })
}
managerService.prototype.install = function (orderID, callback) {
    this.dao.read({"_id": orderID.toString()}, 'orders', (order) => {
        if (order[0].status === "finished") {
            var mit = {"_id": orderID.toString()}
            var mire = {$set: {"status": "installed"}}
            this.dao.update("orders", mit, mire, (request) => {
                logger.info(`${orderID} order has updated the status to Need a date for the installation!`)
                callback(request)
            })
        } else callback("nem lehet installálni még a munkét")
    })
}
managerService.prototype.invoice = function (orderID, callback) {
    var invoiceID = uniqID.generateUUID('xxxx', 10)();
    var order = {"_id": orderID.toString()}
    var invoice = {}
    this.dao.read(order, "orders", (obj) => {
        //console.log(obj[0])
        //  console.log(obj[0].customer.customerID)
        let id = obj[0].customer.customerID.toString()
        //    console.log(id)
        this.dao.read({"_id": id}, 'customers', (customer) => {
            //console.log(customer[0].customer)
            invoice['_id'] = invoiceID
            invoice['customer'] = customer[0].customer.name
            invoice['shutter'] = obj[0]['shutter']
            invoice['partsList'] = obj[0]['partsList']
            invoice['summ'] = obj[0]['summ']
            invoice['payment'] = false
            console.log(obj[0])
            this.dao.insert('invoice', invoice, () => {
                this.dao.update('orders', {"_id": orderID}, {$set: {"invoice": invoiceID}}, () => {
                    logger.info(`${invoiceID} invoice has inserted to invoice table!`)
                    callback(invoice)
                })
            })
        })
    })
}
managerService.prototype.stat = function (callback) {
    var obj = {}
    this.dao.piece({}, "orders", (piece) => {
        obj['allOrders'] = piece;
        this.dao.piece({"status": "installed"}, "orders", (piece) => {
            obj['installed'] = piece;
            this.dao.piece({"status": "finished"}, "orders", (piece) => {
                obj['finished'] = piece;
                this.dao.piece({"status": "submitted"}, "orders", (piece) => {
                    obj['submitted'] = piece;
                    this.dao.piece({"status": "added"}, "orders", (piece) => {
                        obj['added'] = piece;
                        //console.log(obj)
                        callback(obj)
                    })
                })
            })
        })
    })
}



module.exports = managerService;