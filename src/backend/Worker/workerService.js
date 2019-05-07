function workerService(dao) {
    if (dao != undefined && dao != null) {
        this.dao = dao
    }
    else {
        this.dao = require('../dao')
    }
}

workerService.prototype.listOrders = function (callback) {
    var submitted = {"status": "submitted"}
    this.dao.read(submitted, "orders", (request) => {
        callback(request)
    })
}
workerService.prototype.selectedOrder = function (shutterID, callback) {
    console.log(shutterID)
    var mit = {"shutter.shutterID": shutterID}
    var mire = {$set: {"shutter.$.status": "selected"}}
    this.dao.update("orders", mit, mire, (request) => {
        callback(request)
    })
}
workerService.prototype.listParts = function (orderID, callback) {
    /*console.log(orderID)
    let piece = 0
    this.dao.read({"orderID": orderID}, 'orders', (asd) => {

        console.log(asd[0]['shutter'])
        let array = asd[0]['shutter']
        for (let entity of array) {
            if (entity.status === "selected")
                piece = piece + 1;
        }
    })
    console.log("kint:" + piece)*/
    var mit = {"orderID": orderID}
    var mire = {
        $set: {
            "parts": {
                "Case": 1,
                "Guide Rail": 2,
                "Strap": 1,
                "Box": 1,
                "Lower Rail": 1
            }
        }
    }
    this.dao.update("orders", mit, mire, (request) => {
        callback(request)
    })
}
workerService.prototype.assemble = function (shutterID, callback) {
    var mit = {"shutter.shutterID": shutterID}
    var mire = {$set: {"shutter.status": "assemble"}}
    this.dao.update("orders", mit, mire, (request) => {
        var selected = {"shutter.shutterID": Number(shutterID)}
        this.dao.read(selected, "orders", (request) => {
            callback(request)
        })
    })
}

module.exports = workerService;