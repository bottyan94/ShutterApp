function managerService(dao) {
    if (dao != undefined && dao != null) {
        this.dao = dao
    }
    else {
        this.dao = require('../dao')
    }
}
managerService.prototype.list = function (callback) {
    var all = {"shutter.status":{$ne:null} }
    this.dao.read(all, "orders", (request) => {
        callback(request)
    })
}
managerService.prototype.customer = function (callback) {
    var all = {"customer.customerID":{$ne:null} }
    this.dao.read(all, "customers", (request) => {
        callback(request)
    })
}

module.exports = managerService;