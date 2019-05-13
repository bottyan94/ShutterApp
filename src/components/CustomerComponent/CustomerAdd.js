import React from 'react'
import CustomerActions from "../../actions/CustomerActions";
import CustomerStore from "../../store/CustomerStore";

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            customer: {
                name: "",
                email: "",
                birth: "",
                ordersID: []
            }
        }
    }

    _onChange() {
        this.setState();
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (<>


                    <div className="card shadow-lg">
                        <div className="card-header">Register Customer</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row m-2">
                                        <div className="col-4">Name</div>
                                        <div className="col-8">
                                            <input className="w-75"
                                                   onChange={(event) => {
                                                       this.state.customer.name = event.target.value
                                                       this.setState({customer: this.state.customer});
                                                   }}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="row m-2">
                                        <div className="col-4">Email</div>
                                        <div className="col-8">
                                            <input className="w-75"
                                                   onChange={(event) => {
                                                       this.state.customer.email = event.target.value
                                                       this.setState({customer: this.state.customer});
                                                   }}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="row m-2">
                                        <div className="col-4">Birth</div>
                                        <div className="col-8">
                                            <input className="w-75"
                                                   onChange={(event) => {
                                                       this.state.customer.birth = event.target.value
                                                       this.setState({customer: this.state.customer});
                                                   }}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            CustomerActions.addCustomer(this.state);
                                            CustomerActions.listCustomers();
                                        }}
                                        className="btn submenu m-3">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


            </>
        );
    }
}

export default CustomerAdd