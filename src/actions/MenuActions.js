import ShutterDispatcher from '../dispatcher/ShutterDispatcher';

class CustomerActions {
    showCustomer() {
        ShutterDispatcher.handleViewAction({
            actionType: "showCustomer",
            payload: null
        });
    }
    showManager() {
        ShutterDispatcher.handleViewAction({
            actionType: "showManager",
            payload: null
        });
    }
    showWorker() {
        ShutterDispatcher.handleViewAction({
            actionType: "showWorker",
            payload: null
        });
    }


}
export default new CustomerActions();