import ShutterDispatcher from '../dispatcher/ShutterDispatcher';

class ManagerAction {
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


}
export default new ManagerAction();