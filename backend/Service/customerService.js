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
        this.dao = require('../DAO/customerDAO')
    }
}
CustomerService.prototype.list = function (callback) {
    this.dao.readAll((customers) => {
        logger.info(`${customers.length} customers were found!`)
        callback(customers)
    })
}
CustomerService.prototype.registerCustomer = function (customer, succes) {
    var customerID = uniqID.generateUUID('xxxx', 10)();
    customer['_id'] = customerID
    this.dao.registerCustomer(customer, (insert)=>{
        logger.info(`${customer.customer.name} inserted!`)
        succes(insert)
    })
}
CustomerService.prototype.addShutter = function (order, succes, error) {
    var orderID = uniqID.generateUUID('xxxx', 10)();
    var shutterID;
    order['_id'] = orderID
    for (let i of  order['shutter']) {
        shutterID = uniqID.generateUUID('xxxx', 10)();
        i.shutterID = shutterID
    }
    this.dao.addOrder(order,() =>{
        succes();
    })
}
CustomerService.prototype.ownOrders = function (customerID, succes) {
   this.dao.ownOrders(customerID,(orders)=>{
        succes(orders)
   })
}
CustomerService.prototype.submit = function (orderID, succes, error) {
   this.dao.submit(orderID,(callback)=>{
       succes(callback)
   })
}
CustomerService.prototype.invoice = function (orderID, succes, error) {
    this.dao.invoice(orderID,(callback)=>{
        succes(callback)
    })
}
CustomerService.prototype.pay = function (orderID, succes, error) {
    this.dao.pay(orderID, (callback)=>{
        succes(callback)
    })
}

module.exports = CustomerService;