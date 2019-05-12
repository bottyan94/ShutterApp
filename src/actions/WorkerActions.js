import ShutterDispatcher from '../dispatcher/ShutterDispatcher';

class WorkerActions {
    listOrders() {
        ShutterDispatcher.handleViewAction({
            actionType: "listOrders",
            payload: null
        });
    }
    listParts(type) {
        ShutterDispatcher.handleViewAction({
            actionType: "listPart",
            payload: type
        });
    }
    select(shutterID) {
        ShutterDispatcher.handleViewAction({
            actionType: "selectShutter",
            payload: shutterID
        });
    }
    finish(orderID) {
        ShutterDispatcher.handleViewAction({
            actionType: "finishOrder",
            payload: orderID
        });
    }

}
export default new WorkerActions();