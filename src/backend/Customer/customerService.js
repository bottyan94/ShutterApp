var uniqID = require('uniq-id');

function CustomerService(dao) {
    winston = require('winston')
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
    this.dao.piece({"customer.name": customer.customer.name.toString()}, 'customers', (piece) => {
        if (piece !== 0) {
            logger.error(`${customer.customer.name} is alreadyin use`);
            error("This customer name is already in use! Try again")
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
    var orderID = uniqID.generateUUID('xxxx', 10)();
    var shutterID
    this.dao.piece({"orderID": orderID}, 'orders', (piece) => {
        if (piece !== 0) {
            logger.error(`${orderID} is already in use`);
            error("This orderID is already in use!")
        } else {
            data['_id'] = orderID
            for (let i of  data['shutter']) {
                shutterID = uniqID.generateUUID('xxxx', 10)();
                i.shutterID = shutterID
            }
            this.dao.insert('orders', data, () => {
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
                logger.info(`${orderID} Submitted`)
                succes()
            })
        } else {
            logger.error(`${orderID} not ready to submit`);
            error(`${orderID} not ready to submit`)
        }
    })
}
CustomerService.prototype.invoice = function (orderID, succes, error) {
    var mit = {"_id": orderID}
    this.dao.read(mit, "orders", (order) => {
        // console.log(order[0].invoice)
        if (order[0].invoice !== undefined && order[0].invoice !== null) {
            logger.info(`Invoice readed`)
            succes(order)
        } else {
            logger.error(`there is no invoice ready yet`);
            error("there is no invoice ready yet")
        }
    })
}
CustomerService.prototype.ownOrders = function (customerID, succes) {
    var id = {"customer.customerID": Number(customerID)}
    this.dao.read(id, "orders", (orders) => {
        logger.info(`${orders.length} customers were found!`)
        succes(orders)
    })
}
module.exports = CustomerService;