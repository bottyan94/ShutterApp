import ShutterDispatcher from '../dispatcher/ShutterDispatcher';

class CustomerActions {
    showCustomer() {
        ShutterDispatcher.handleViewAction({
            actionType: "showCustomer",
            payload: null
        });
    }
    showReg() {
        ShutterDispatcher.handleViewAction({
            actionType: "showReg",
            payload: null
        });
    }
    showCustomersList() {
        ShutterDispatcher.handleViewAction({
            actionType: "showCustomersList",
            payload: null
        });
    }
    showAddOrder() {
        ShutterDispatcher.handleViewAction({
            actionType: "showAddOrder",
            payload: null
        });
    }
    listCustomers() {
        ShutterDispatcher.handleViewAction({
            actionType: "listCustomers",
            payload: null
        });
    }
    listOrders(customerID) {
        ShutterDispatcher.handleViewAction({
            actionType: "listOwnOrders",
            payload: parseInt(customerID)
        });
    }
    submit(customerID) {
        ShutterDispatcher.handleViewAction({
            actionType: "submit",
            payload: parseInt(customerID)
        });
    }
    addCustomer(customer) {
        ShutterDispatcher.handleViewAction({
            actionType: "addCustomer",
            payload: customer
        });
    }
    addOrders(order) {
        ShutterDispatcher.handleViewAction({
            actionType: "addOrders",
            payload: order
        });
    }
    invoice(orderID){
        ShutterDispatcher.handleViewAction({
            actionType: "invoiceOrder",
            payload: orderID
        });
    }

}
export default new CustomerActions();