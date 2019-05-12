import React from 'react';

import ManagerStore from "../../store/ManagerStore"
import ManagerAction from "../../actions/ManagerAction";
import CustomerActions from "../../actions/CustomerActions";
import CustomerList from "../CustomerComponent/CustomerList";
import OrdersDetails from "../CustomerComponent/OrdersDetails";
import WorkerComponent from "../WorkerComponent/WorkerComponent";
import ManagerOrdersList from "./ManagerOrdersList";
import ManagerCustomersList from "./ManagerCustomersList";
import ManagerOrdersDetails from "./ManagerOrdersDetails";

class ManagerComponent extends React.Component {


    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        this.setState();
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange)
    }

    render() {

        return (
            <> <div className="container-fluid" id="man">
                <div className="row">
                    <div className="col-3">
                        <ManagerCustomersList/>
                    </div>
                    <div className="col-9" id="ownOrdersManager"><ManagerOrdersDetails/></div>
                    <div className="col" id="ManagerOrders"><ManagerOrdersList/></div>
                </div>
            </div>
            </>
        )
    }
}

export default ManagerComponent