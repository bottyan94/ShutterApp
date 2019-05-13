import React from 'react';
import CustomerActions from "../../actions/CustomerActions";
import CustomerStore from "../../store/CustomerStore";



class CustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        // CustomerActions.listCustomers();
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

                <button onClick={() => {
                    CustomerActions.showReg();
                }} className="buttonsMenu submenu btn shadow-lg  m-3">AddCustomer
                </button>
                <button onClick={() => {
                    CustomerActions.showCustomersList();
                    CustomerActions.listCustomers();
                    CustomerActions.listOrders();
                }} className="buttonsMenu submenu btn shadow-lg m-3">ListCustomers
                </button>
                <button onClick={() => {
                    CustomerActions.showAddOrder();
                }} className="buttonsMenu submenu btn shadow-lg m-3">Add Order
                </button>

                <div className="container-fluid" id="customerContainer">
                    <div className="row">
                        <div className="col-4" id="ccLeft"></div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col" id="ccRight"></div>
                            </div>
                            <div className="row">
                                <div className="col" id="ccBig"></div>
                            </div>
                        </div>

                    </div>


                </div>
            </>
        )
    }
}

export default CustomerComponent
