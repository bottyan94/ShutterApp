function CustomerService(customerDAO) {
    if(customerDAO!= undefined && customerDAO != null)
    {this.CustomerDAO= customerDAO}
    else {
        this.CustomerDAO= require('./customerDAO')
    }
}

CustomerService.prototype.list = function (callback) {
    this.CustomerDAO.readAllCustomers((request) =>{
        callback(request)
    })
}

CustomerService.prototype.addWindow = function (data) {
    this.CustomerDAO.addWindow(data)
}
CustomerService.prototype.addShutter = function (data) {
    this.CustomerDAO.addShutter(data)
}




module.exports = CustomerService;