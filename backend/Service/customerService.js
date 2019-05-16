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
CustomerService.prototype.registerCustomer = function (customer, callback) {
    var customerID = uniqID.generateUUID('xxxx', 10)();
    customer['_id'] = customerID
    this.dao.registerCustomer(customer, (insert)=>{
        logger.info(`${customer.customer.name} inserted!`)
        callback(insert)
    })
}
CustomerService.prototype.addShutter = function (order, callback) {
    var orderID = uniqID.generateUUID('xxxx', 10)();
    var shutterID;
    order['_id'] = orderID
    for (let i of  order['shutter']) {
        shutterID = uniqID.generateUUID('xxxx', 10)();
        i.shutterID = shutterID
    }
    this.dao.addOrder(order,() =>{
        callback();
    })
}
CustomerService.prototype.ownOrders = function (customerID, callback) {
   this.dao.ownOrders(customerID,(orders)=>{
       callback(orders)
   })
}
CustomerService.prototype.submit = function (orderID, callback) {
   this.dao.submit(orderID,(cb)=>{
       callback(cb)
   })
}
CustomerService.prototype.invoice = function (orderID, succes, error) {
    this.dao.invoice(orderID,(succ)=>{
        succes(succ)
    },(err)=>error(err))
}
CustomerService.prototype.pay = function (orderID, succes, error) {
    this.dao.pay(orderID, (succ)=>{
        succes(succ)
    },(err)=>error(err))
}

module.exports = CustomerService;