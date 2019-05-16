function workerService(dao) {
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
        this.dao = require('../DAO/workerDAO')
    }
}

workerService.prototype.listOrders = function (callback) {
   this.dao.listOrders((orders)=>{
       callback(orders)
   })
}
workerService.prototype.selectShutter = function (shutterID, succes, error) {
   this.dao.selectShutter(shutterID,(callback)=>{
       succes(callback)
   })
}
workerService.prototype.listPart = function (shutterID, succes, error) {
   this.dao.listPart(shutterID,(parts)=>{
       succes(parts)
   })
}
workerService.prototype.finish = function (orderID, callback) {
    this.dao.finish(orderID,(finish)=>{
        callback(finish)
    })
}
workerService.prototype.listParts = function (orderID, callback) {
    console.log(orderID)
    this.dao.read({"_id": orderID}, "orders", (order) => {
        let summ = 0
        let array = order[0]['partsList']
        console.log(order[0]['partsList'])
        for (let entity of array) {
            //console.log(entity[0]['parts'][0]['price'])
            summ = summ + (entity[0]['parts'][0]['price'])
            // console.log(summ)
            this.dao.update("orders", {"_id": orderID.toString()}, {$set: {"summ": summ}}, () => {
                callback()
            })
        }
        callback(order[0]['partsList'])

    })
}

module.exports = workerService;