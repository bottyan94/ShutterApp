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
        this.dao = require('../DAO/managerDAO')
    }
}

managerService.prototype.listOrders = function (callback) {
    this.dao.listOrders((orders) => {
        //console.log(orders)
        // logger.info(`${orders.length} customers were found!`)
        callback(orders)
    })
}
managerService.prototype.customers = function (callback) {
  this.dao.listCustomers((customers)=>{
      callback(customers)
  })
}
managerService.prototype.install = function (orderID, callback) {
    this.dao.install(orderID, (install)=>{
        callback(install)
    })
}
managerService.prototype.invoice = function (orderID, callback) {
    var invoiceID = uniqID.generateUUID('xxxx', 10)();
   this.dao.invoice(invoiceID,orderID,(invoice)=>{
       callback(invoice)
   })
}
managerService.prototype.stat = function (callback) {
    this.dao.stat((stat)=>{
        callback(stat)
    })
}



module.exports = managerService;