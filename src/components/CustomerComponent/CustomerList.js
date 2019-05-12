import React from 'react';
import CustomerActions from "../../actions/CustomerActions";
import CustomerStore from "../../store/CustomerStore";

class CustomerList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {customers: []};
    }

    _onChange() {
        this.setState({customers: CustomerStore._customers});
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
            <div className="card">
                <div className="card-header">Customers</div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            this.state.customers.map((customer) => {
                                return (
                                    <li key={customer._id}
                                        className="list-group-item"
                                        onClick={() => CustomerActions.listOrders(customer._id)}>
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
    </>
        )
    }
}

export default CustomerList