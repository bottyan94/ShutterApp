import React from 'react'
import CustomerActions from "../../actions/CustomerActions";
import CustomerStore from "../../store/CustomerStore";

class AddOrders extends React.Component {


    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.shut = {
            height: "",
            width: "",
            color: "",
            type: "",
            status: "",

        }
        this.state = {
            customer: {customerID: CustomerStore._selectedCustomer},
            shutter: CustomerStore._shutters,
            partsList: [],
            payment:"waiting",
            status: "added"
        }
    }

    _onChange() {
        this.setState({customer: {customerID: CustomerStore._selectedCustomer}});
        this.setState({shutter: CustomerStore._shutters});
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
                        <div className="card shadow-lg">
                            <div className="card-header">Add shutter</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">Hello {CustomerStore._selectedCustomer}</div>
                                    <div className="col-12">
                                        <div className="row m-2">
                                            <div className="col-4">Height</div>
                                            <div className="col-8">
                                                <input
                                                    onChange={(event) => {
                                                        this.shut.height = event.target.value
                                                        this.setState({shut: this.shut.height});
                                                    }}
                                                    type="number"/>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-4">Width</div>
                                            <div className="col-8">
                                                <input
                                                    onChange={(event) => {
                                                        this.shut.width = event.target.value
                                                        this.setState({shut: this.shut.width});
                                                    }}
                                                    type="number"/>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-4">Color</div>
                                            <div className="col-8">
                                                <select className="w-25" onChange={(event) => {
                                                    this.shut.color = event.target.value
                                                    this.setState({shut: this.shut.color});
                                                }}>
                                                    <option defaultValue={null} label="---"></option>
                                                    {['White', 'Black', 'Brown'].map((color) => {
                                                        return (
                                                            <option key={color} value={color}>
                                                                {color}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-4"> Type</div>
                                            <div className="col-8">
                                                <select className="w-25" onChange={(event) => {
                                                    this.shut.type = event.target.value
                                                    this.setState({shut: this.shut.type});
                                                }}>
                                                    <option defaultValue={null} label="---"></option>
                                                    {['cheap', 'expensive'].map((type) => {
                                                        return (
                                                            <option key={type} value={type}>
                                                                {type}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                CustomerStore._shutters.push({
                                                    height: this.shut.height,
                                                    width: this.shut.width,
                                                    color: this.shut.color,
                                                    status: this.shut.status,
                                                    type: this.shut.type
                                                })
                                            }}
                                            className="btn submenu m-3">
                                            Add shutter
                                        </button>
                                        <button
                                            onClick={() => {
                                                CustomerActions.addOrders(this.state);
                                            }}
                                            className="btn submenu m-3">
                                            Finish orders
                                        </button>
                                        <button
                                            onClick={() => {
                                                CustomerActions.listOrders(CustomerStore._selectedCustomer);
                                            }}
                                            className="btn submenu m-3">
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            </>

        );

    }
}

export default AddOrders