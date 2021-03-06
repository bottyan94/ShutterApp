import React from 'react'
import CustomerStore from "../../store/CustomerStore";
import CustomerActions from "../../actions/CustomerActions";

class OrdersDetails extends React.Component {


    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {store: []}
    }

    _onChange() {

        this.setState({store: CustomerStore._selectedStore});

    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div className="card shadow-lg">
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <caption>Store Details</caption>
                        {this.state.store !== undefined && this.state.store !== null &&
                        <tbody>
                        <tr>
                            <td>OrderID</td>
                            <td>Shutters</td>
                            <td>Status and Payment</td>
                            <td>Buttons</td>
                        </tr>
                        {this.state.store.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>Height*Width</td>
                                                <td>Color</td>
                                                <td>Type</td>
                                                <td>Status</td>
                                            </tr>
                                            {order['shutter'].map((shutter) => {
                                                return (
                                                    <tr key={shutter.shutterID}>
                                                        <td>{shutter.height}*{shutter.width}</td>
                                                        <td>{shutter.color}</td>
                                                        <td>{shutter.type}</td>
                                                        <td>{shutter.status}</td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </td>

                                    <td className="text-center statusText font-weight-bolder font-italic text-uppercase">
                                        {order.status}
                                        <br/>
                                        {order.payment}
                                    </td>




                                    <td>
                                        <button className="btn btn-success m-2"
                                                onClick={() => CustomerActions.submit(order._id)}>Submit
                                        </button>
                                        <button className="btn btn-success m-2"
                                                onClick={() => CustomerActions.invoice(order._id)}>SeeInvoince
                                        </button>
                                        <button className="btn btn-success m-2"
                                                onClick={() => CustomerActions.pay(order._id)}>Pay
                                        </button>
                                    </td>



                                </tr>
                        )

                        })}
                        </tbody>
                        }
                            </table>
                            </div>
                            </div>

                            )
                        }
                        }

                        export default OrdersDetails