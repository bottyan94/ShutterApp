function CustomerService(customerDAO) {
    if (customerDAO != undefined && customerDAO != null) {
        this.CustomerDAO = customerDAO
    }
    else {
        this.CustomerDAO = require('./customerDAO')
    }
}

CustomerService.prototype.list = function (callback) {
    this.CustomerDAO.readAllCustomers((request) => {
        callback(request)
    })
}
CustomerService.prototype.ownOrders = function (name ,callback) {
    this.CustomerDAO.ownOrders(name, (request) => {
        callback(request)
    })
}
CustomerService.prototype.registerCustomer = function(data, callback){
    this.CustomerDAO.registerCustomer(data,(request)=>{callback(request)})
}
CustomerService.prototype.addWindow = function (data) {
    this.CustomerDAO.addWindow(data)
}
CustomerService.prototype.addShutter = function (data) {
    this.CustomerDAO.addShutter(data)
}
CustomerService.prototype.submit = function (data) {
    this.CustomerDAO.submit(data)
}

module.exports = CustomerService;