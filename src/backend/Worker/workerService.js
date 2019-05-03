function workerService(workerDAO) {
    if (workerDAO != undefined && workerDAO != null) {
        this.workerDAO = workerDAO
    }
    else {
        this.workerDAO = require('./workerDAO')
    }
}
workerService.prototype.listOrders = function (callback) {
    this.workerDAO.readAllOrders((request) => {
        callback(request)
    })
}
workerService.prototype.selectedOrder = function (name, callback) {
    this.workerDAO.selectedOrder(name, (request) => {
        callback(request)
    })
}
module.exports = workerService;