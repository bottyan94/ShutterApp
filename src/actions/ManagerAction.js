import ShutterDispatcher from '../dispatcher/ShutterDispatcher';

class ManagerAction {
    showManager() {
        ShutterDispatcher.handleViewAction({
            actionType: "showManager",
            payload: null
        });
    }
    showCustomersList() {
        ShutterDispatcher.handleViewAction({
            actionType: "showCustomersListManager",
            payload: null
        });
    }
    showOrdersAll() {
        ShutterDispatcher.handleViewAction({
            actionType: "showOrdersAll",
            payload: null
        });
    }
    showStat() {
        ShutterDispatcher.handleViewAction({
            actionType: "showStat",
            payload: null
        });
    }
    listCustomers() {
        ShutterDispatcher.handleViewAction({
            actionType: "listCustomersManager",
            payload: null
        });
    }
    listOwnOrders(customerID) {
        ShutterDispatcher.handleViewAction({
            actionType: "listOwnOrdersManager",
            payload: parseInt(customerID)
        });
    }
    install(orderId) {
        ShutterDispatcher.handleViewAction({
            actionType: "install",
            payload: parseInt(orderId)
        });
    }
    listOrders() {
        ShutterDispatcher.handleViewAction({
            actionType: "listAllOrders",
            payload: null
        });
    }
    invoice(orderID) {
        ShutterDispatcher.handleViewAction({
            actionType: "invoice",
            payload: orderID
        });
    }
    stat() {
        ShutterDispatcher.handleViewAction({
            actionType: "stat",
            payload: null
        });
    }


}
export default new ManagerAction();