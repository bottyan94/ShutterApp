import React from 'react';
import ManagerAction from "../../actions/ManagerAction";
import ManagerStore from "../../store/ManagerStore";

class ManagerCustomersList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {customers: []};
    }

    _onChange() {
        this.setState({customers: ManagerStore._customers});
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
                <div className="row">
                <div className="card col-3 shadow-lg">
                    <div className="card-header">Customers</div>
                    <div className="card-body">
                        <ul className="list-group">
                            {
                                this.state.customers.map((customer) => {
                                    return (
                                        <li key={customer._id}
                                            className="list-group-item"
                                            onClick={() => ManagerAction.listOwnOrders(customer._id)}>
                                            {customer._id},<br/>
                                            {customer.customer.name}<br/>
                                            {customer.customer.email}, {customer.customer.birth}
                                        </li>)
                                })
                            }
                        </ul>
                    </div>

                    <div className="card-footer"></div>
                </div>
                <div className="col-9" id="ownOrders"></div>
                </div>
            </>
        )
    }
}

export default ManagerCustomersList