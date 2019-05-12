import {Dispatcher} from 'flux'
import React from 'react'
import ReactDOM from 'react-dom'

import CustomersStore from '../store/CustomerStore';
import OrdersDetails from '../components/CustomerComponent/OrdersDetails';
import CustomerActions from "../actions/CustomerActions";
import AddOrders from "../components/CustomerComponent/AddOrders";
import WorkerStore from "../store/WorkerStore";
import WorkerActions from "../actions/WorkerActions";
import ManagerStore from "../store/ManagerStore";
import CustomerComponent from "../components/CustomerComponent/CustomerComponent";
import CustomerAdd from "../components/CustomerComponent/CustomerAdd";
import WorkerComponent from "../components/WorkerComponent/WorkerComponent";
import ManagerComponent from "../components/ManagerComponent/ManagerComponent";
import ManagerAction from "../actions/ManagerAction";
import ManagerOrdersDetails from "../components/ManagerComponent/ManagerOrdersDetails";

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
        // console.log(response)
        return response.json()
    })
        .then(result => {
            CustomersStore._customers = result;
            CustomersStore.emitChange();
        });
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
        document.getElementById('ownOrders'),
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
        CustomerActions.listOrders(CustomersStore._selectedCustomer)
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
        alert("<h1>Számla</h1>\n Név: "+result)
        CustomerActions.listOrders(CustomersStore._selectedCustomer)
    })
});
//customer/register
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "addCustomer") {
        return;
    }
    console.log(data.payload.payload);
    console.log(JSON.stringify(data.payload.payload));

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
            console.log(result)
            CustomerActions.listCustomers();
        })

    //console.log(data.payload.payload);
});
//customer/addShutter
shutterDispatcher.register((data) => {
    if (data.payload.actionType !== "addOrders") {
        return;
    }
    console.log(data.payload.payload);
    console.log(JSON.stringify(data.payload.payload));

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
        .then(() => {
            CustomerActions.listOrders(CustomersStore._selectedCustomer);
            CustomersStore._shutters = [];
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
        // document.getElementById("select").disabled=true;
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
            console.log(ManagerStore._orders)
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
        document.getElementById('ownOrdersManager'),
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
        ManagerStore._selectedOrder = result
        ManagerAction.listOrders(ManagerStore._selectedOrder)

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
        ManagerAction.listOwnOrders(ManagerStore._selectedCustomer)
        ManagerStore.emitChange()
    })

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

export default shutterDispatcher;