import {Dispatcher} from 'flux'
import React from 'react'
import ReactDOM from 'react-dom'

import CustomersStore from '../store/CustomerStore';
import OrdersDetails from '../components/CustomerComponent/OrdersDetails';
import AddOrders from "../components/CustomerComponent/AddOrders";
import WorkerStore from "../store/WorkerStore";
import ManagerStore from "../store/ManagerStore";
import CustomerComponent from "../components/CustomerComponent/CustomerComponent";
import CustomerAdd from "../components/CustomerComponent/CustomerAdd";
import WorkerComponent from "../components/WorkerComponent/WorkerComponent";
import ManagerComponent from "../components/ManagerComponent/ManagerComponent";
import ManagerOrdersDetails from "../components/ManagerComponent/ManagerOrdersDetails";
import CustomerList from "../components/CustomerComponent/CustomerList";
import ManagerCustomersList from "../components/ManagerComponent/ManagerCustomersList";
import ManagerOrdersList from "../components/ManagerComponent/ManagerOrdersList";
import ManagerStat from "../components/ManagerComponent/ManagerStat";
import WorkerActions from "../actions/WorkerActions";
import CustomerActions from "../actions/CustomerActions";
import ManagerActions from "../actions/ManagerAction"


class ShutterDispatcher extends Dispatcher {
    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            payload: action
        });
    }
}

const shutterDispatcher = new ShutterDispatcher();
//customer/list all customer
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listCustomers") {
        return;
    }
    fetch('/customer/list', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    })
        .then(result => {
            CustomersStore._customers = result;
            CustomersStore.emitChange();
        });
    CustomersStore.emitChange();
});
//customer/listOwnOrders
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listOwnOrders") {
        return;
    }
    fetch('/customer/ownOrders/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    }).then(result => {
        CustomersStore._selectedStore = result;
        CustomersStore._selectedCustomer = data.payload.payload
        CustomersStore.emitChange();
    });
    ReactDOM.render(
        React.createElement(OrdersDetails),
        document.getElementById('ccBig'),
    );

    CustomersStore.emitChange();
});
//customer/submit
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "submit") {
        return;
    }
    fetch('/customer/submit/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(() => {
      //  CustomersStore._selectedCustomer=data.payload.payload
        CustomerActions.listOrders(CustomersStore._selectedCustomer)
        CustomersStore.emitChange();
    })
});
//customer/invoice
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "invoiceOrder") {
        return;
    }
    fetch('/customer/invoice/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.text()
    }).then((result) => {
        alert(result)
        CustomersStore.emitChange()
    })
});

//customer/pay
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "pay") {
        return;
    }
    fetch('/customer/pay/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.text()
    }).then((res) => {
        CustomerActions.listOrders(CustomersStore._selectedCustomer)
        CustomersStore.emitChange()
    })
});
//customer/register
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "addCustomer") {
        return;
    }
    fetch('/customer/registerCustomer', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
        .then((response) => {
            return response.text()
        })
        .then((result) => {
            alert(result)
            CustomersStore.emitChange();
        })
    CustomersStore.emitChange();
});
//customer/addShutter
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "addOrders") {
        return;
    }
  fetch('/customer/addShutter', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
        .then((response) => {
            return response.text()
        })
        .then((result) => {
            CustomersStore._shutters = [];
            CustomersStore._selectedCustomer = data.payload.payload.customer.customerID;
            CustomersStore.emitChange();
        })
    CustomersStore.emitChange();
});

//worker list part
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listPart") {
        return;
    }

    fetch('worker/listPart/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    })
        .then(result => {
            var a = result[0]
            alert(
                "case:" + a.case +
                "\nguideRail:" + a.guideRail +
                "\nstrap:" + a.strap +
                "\nbox:" + a.box +
                "\nlowerRail:" + a.lowerRail +
                "\nprice:" + a.price
            )
            WorkerActions.listOrders();
            WorkerStore.emitChange();
        });
    WorkerStore.emitChange();
});
//worker/listOrders all orders
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listOrders") {
        return;
    }
    fetch('/worker/listOrders', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        // console.log(response)
        return response.json()
    })
        .then(result => {
            WorkerStore._orders = result;
            WorkerStore.emitChange();
        });
});
//worker/select
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "selectShutter") {
        return;
    }
    console.log("selectshutter")
    console.log(data.payload.payload)
    fetch('worker/selectShutter/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.text()
    }).then(result => {
        WorkerStore._selectedShutter = result;
        // WorkerStore._selectedCustomer = data.payload.payload
        WorkerActions.listOrders();
        WorkerStore.emitChange();
    });
    WorkerStore.emitChange();
});
//worker finish
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "finishOrder") {
        return;
    }
    fetch('worker/finish/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.text()
    }).then(result => {
        WorkerStore._selectedOrder = result;
        WorkerActions.listOrders();
        WorkerStore.emitChange();

    });
    WorkerStore.emitChange();
})

//manager/list all customer
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listCustomersManager") {
        return;
    }
    fetch('/customer/list', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    })
        .then(result => {
            ManagerStore._customers = result;
            ManagerStore.emitChange();
        });
});
//manager/list all orders
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listAllOrders") {
        return;
    }
    fetch('/manager/listOrders', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    })
        .then(result => {
            ManagerStore._orders = result;
            ManagerStore.emitChange();
        });
});
//manager/listOwnOrders
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "listOwnOrdersManager") {
        return;
    }
    fetch('/customer/ownOrders/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    }).then(result => {
        ManagerStore._selectedOrder = result;
        ManagerStore._selectedCustomer = data.payload.payload
        ManagerStore.emitChange();
    });
    ReactDOM.render(
        React.createElement(ManagerOrdersDetails),
        document.getElementById('ownOrders'),
    );

    ManagerStore.emitChange();
});
//manager/invoice
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "invoice") {
        return;
    }
    fetch('/manager/invoice/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.text()
    }).then(result => {
        // console.log(result)
        ManagerStore._selectedOrder = data.payload.payload
        ManagerStore.emitChange();
    })
    ManagerStore.emitChange();
});
//manager/install
shutterDispatcher.register((data) => {
    console.log(data.payload.payload)
    if (data.payload.actionType !== "install") {
        return;
    }
    fetch('/manager/install/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.text()
    }).then(() => {
        ManagerActions.listOrders()
        ManagerStore.emitChange()
    })

});
//manager/stat
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "stat") {
        return;
    }
    fetch('/manager/stat', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    })
        .then(result => {
            ManagerStore._stat = result;
            ManagerStore.emitChange();
        });
});

//menu customer
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showCustomer") {
        return;
    }
    ReactDOM.render(
        React.createElement(CustomerComponent),
        document.getElementById('mainContainer'),
    )
});
//reg
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showReg") {
        return;
    }
    ReactDOM.render(
        React.createElement(CustomerAdd),
        document.getElementById('ccLeft'),
    )
});
//customersList show
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showCustomersList") {
        return;
    }
    ReactDOM.render(
        React.createElement(CustomerList),
        document.getElementById('ccLeft'),
    )
    CustomersStore.emitChange();
});
//Customer add order show
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showAddOrder") {
        return;
    }
    ReactDOM.render(
        React.createElement(AddOrders),
        document.getElementById('ccRight'),
    )
    CustomersStore.emitChange();
});
//menu worker
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showWorker") {
        return;
    }
    ReactDOM.render(
        React.createElement(WorkerComponent),
        document.getElementById('mainContainer'),
    )
});
//menu manager
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showManager") {
        return;
    }
    ReactDOM.render(
        React.createElement(ManagerComponent),
        document.getElementById('mainContainer'),
    )
});
//manager show customers
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showCustomersListManager") {
        return;
    }
    ReactDOM.render(
        React.createElement(ManagerCustomersList),
        document.getElementById('containerManager'),
    )
    CustomersStore.emitChange();
});
//manager show all orders
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showOrdersAll") {
        return;
    }
    ReactDOM.render(
        React.createElement(ManagerOrdersList),
        document.getElementById('containerManager'),
    )
    CustomersStore.emitChange();
});
//manager show stat
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "showStat") {
        return;
    }
    ReactDOM.render(
        React.createElement(ManagerStat),
        document.getElementById('containerManager'),
    )
    CustomersStore.emitChange();
});

export default shutterDispatcher;