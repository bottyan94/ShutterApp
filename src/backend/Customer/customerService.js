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
    this.dao.piece({"customer.customerID": data.customer.customerID}, 'customers', (piece) => {
        if (piece !== 0) {
            callback("This customerID is already in use!")
        } else {
            this.dao.insert('customers', data, (insert) => {
                callback(insert)
            })
        }

    })
}
CustomerService.prototype.addShutter = function (data, callback) {
console.log(data.orderID)
    this.dao.exists({"orderID": data.orderID}, 'orders', (piece) => {
        if (piece !== 0) {
            callback("This orderID is already in use!")
        } else {
            this.dao.insert('orders', data, (insert) => {
                callback(insert)
            })
            var mit = {"customer.customerID": data.customer.customerID}
            var mire = {$push: {"customer.ordersID": data.orderID}}
            this.dao.update("customers", mit, mire, (request) => {
                callback(request)
            })
        }


    })


}
CustomerService.prototype.submit = function (orderID, succes) {
    var mit = {"orderID": orderID}
    var mire = {$set: {"status": "submitted"}}
    this.dao.update("orders", mit, mire, (request) => {
        succes(request)
    })
}
CustomerService.prototype.ownOrders = function (customerID, callback) {
    var id = {"customer.customerID": Number(customerID)}
    this.dao.read(id, "orders", (request) => {
        callback(request)
    })
}

/*
CustomerService.prototype.addWindow = function (data) {
    this.CustomerDAO.addWindow(data)
}

}*/

module.exports = CustomerService;