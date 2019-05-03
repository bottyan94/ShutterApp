function CustomerService(dao) {
    if (dao != undefined && dao != null) {
        this.dao = dao
    }
    else {
        this.dao = require('../dao')
    }
}
CustomerService.prototype.list = function (callback) {
    this.dao.readAll("customers", (request) => {
        callback(request)
    })
}
CustomerService.prototype.registerCustomer = function (data, callback) {
    this.dao.insert("customers", data, (request) => {
        callback(request)
    })
}
CustomerService.prototype.addShutter = function (data, callback) {
    this.dao.insert("orders", data, (request) => {
        callback(request)
    })
    var mit = {"customer.customerID": data.customer.customerID}
    var mire = {$push: {"customer.ordersID": data.shutter.shutterID}}
    this.dao.update("customers", mit, mire, (request) => {
        callback(request)
    })

}
CustomerService.prototype.submit = function (shutterID, callback) {
    console.log("service: "+shutterID)
    var mit = {"shutter.shutterID": shutterID}
    var mire = {$set: {"shutter.status": "submitted"}}
    this.dao.update("orders", mit, mire, (request) => {
        callback(request)
    })
}
CustomerService.prototype.ownOrders = function (customerID, callback) {
    console.log(customerID)
    var id={"customer.customerID":Number(customerID)}
    this.dao.read(id,"orders", (request) => {
        callback(request)
    })
}

/*
CustomerService.prototype.ownOrders = function (customerID, callback) {
    this.CustomerDAO.ownOrders(customerID, (request) => {
        callback(request)
    })
}
CustomerService.prototype.addWindow = function (data) {
    this.CustomerDAO.addWindow(data)
}

}*/

module.exports = CustomerService;