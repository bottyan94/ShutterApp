import React from 'react';

import ManagerStore from "../../store/ManagerStore"
import ManagerAction from "../../actions/ManagerAction";

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
            <>
                <row>
                    <button onClick={() => {
                        ManagerAction.showCustomersList();
                        ManagerAction.listCustomers();
                    }} className="btn submenu m-3 shadow-lg">ListCustomers
                    </button>
                    <button onClick={() => {
                        ManagerAction.showOrdersAll();
                        ManagerAction.listOrders();
                    }} className="btn submenu m-3 hadow-lg">Show All Orders
                    </button>
                    <button onClick={() => {
                        ManagerAction.showStat();
                        ManagerAction.stat();
                    }} className="btn submenu m-3 hadow-lg">Show Stat
                    </button>
                </row>
                <div className="container-fluid" id="containerManager">
                </div>

            </>
        )
    }
}

export default ManagerComponent