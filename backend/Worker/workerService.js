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
        this.dao = require('../dao')
    }
}

workerService.prototype.listOrders = function (callback) {
    var submitted = {"status": "submitted"}
    this.dao.read(submitted, "orders", (orders) => {
        callback(orders)
    })
}
workerService.prototype.selectShutter = function (shutterID, succes, error) {
    var mit = {"shutter.shutterID": shutterID.toString()}
    this.dao.read(mit, "orders", (order) => {
            let shutter = order[0]['shutter']
            for (let element of shutter) {
                if (element.status === "") {
                    var mire = {$set: {"shutter.$.status": "selected"}}
                    this.dao.update("orders", mit, mire, () => {
                            this.dao.read(mit, "orders", (selected) => {
                                let array = selected[0]['shutter']
                                for (let entity of array) {
                                    if (entity.shutterID === shutterID) {
                                        this.dao.read({"type": entity.type}, "parts", (parts) => {
                                            const obj = {}
                                            obj['entity'] = entity;
                                            obj['parts'] = parts;
                                            var asd = {$push: {"partsList": parts}}
                                            this.dao.update("orders", mit, asd, () => {
                                                logger.info(`${shutterID} shutter SELECTED!`)
                                                succes()
                                            })
                                        })
                                    }
                                }
                            })
                        }
                    )
                }
            }
        }
    )
}
workerService.prototype.listPart = function (shutterID, succes, error) {
    var mit = {"shutter.shutterID": shutterID.toString()}
    var mire = {$set: {"shutter.$.status": "done"}}
    this.dao.update("orders", mit, mire, () => {
        this.dao.read(mit, "orders", (shutter) => {
            console.log(shutter[0].status)
            this.dao.read({"type": shutter[0].shutter[0].type}, "parts", (part) => {
                //  console.log(part[0].parts)
                succes(part[0].parts)

            })
        })
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
workerService.prototype.finish = function (orderID, callback) {
    var mit = {"_id": orderID.toString()}
    var mire = {$set: {"status": "finished"}}
    let finish = true
    this.dao.read({"_id": orderID.toString()}, 'orders', (order) => {
            //      console.log(order[0].shutter[1].status)
            let array = order[0].shutter
            for (let entity of array) {
                if (entity.status !== "done") {
                    finish = false;
                }
            }
            if (finish !== true) {
                callback('Még nem lehet befejezni, vannak job-ok amik még nem Done-ok')
            }
            if (finish === true) {
                this.dao.update("orders", mit, mire, () => {
                    logger.info(`${orderID} order Finished!`)
                    callback("Finished");
                })
            }
        }
    )
}

module.exports = workerService;