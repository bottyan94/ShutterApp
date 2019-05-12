import React from 'react';
import CustomerActions from "../../actions/CustomerActions";
import CustomerStore from "../../store/CustomerStore";
import CustomerAdd from "./CustomerAdd";
import CustomerList from "./CustomerList";
import OrdersDetails from "./OrdersDetails";
import WorkerComponent from "../WorkerComponent/WorkerComponent";
import AddOrders from "./AddOrders";
import ManagerStore from "../../store/ManagerStore";

class CustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        CustomerActions.listCustomers();
        this._onChange = this._onChange.bind(this);
        this.state = {customers: []};
    }

    _onChange() {
        this.setState({customers: CustomerStore._stores});
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <>
                <div className="container-fluid" id="cust">
                    <div className="row">
                        <div className="col4">
                            <CustomerAdd/>
                        </div>
                        <div className="col-8">
                            <AddOrders/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <CustomerList/>
                        </div>
                        <div className="col-9" id="ownOrders">
                            <OrdersDetails/>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default CustomerComponent
