import React from 'react'
import ManagerStore from "../../store/ManagerStore";
import ManagerAction from "../../actions/ManagerAction";

class ManagerOrdersDetails extends React.Component {


    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {store: []}
    }

    _onChange() {
        this.setState({store: ManagerStore._selectedOrder});
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div className="card shadow-lg">
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <table className="table table-bordered, table-striped">
                        <caption>Store Details</caption>
                        {this.state.store !== undefined && this.state.store !== null &&
                        <tbody>
                        <tr>
                            <td>OrderID</td>
                            <td>Shutters</td>
                            <td>Status</td>
                            <td>Payment</td>
                            <td>Buttons</td>
                        </tr>
                        {this.state.store.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        <table>
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
                                    <td>{order.status}</td><td> {order.payment}</td>
                                    <button className="btn btn-info m-2 p-2"
                                            onClick={() => ManagerAction.install(order._id)}>Install
                                    </button>
                                    <button
                                        id="submit"
                                        className="btn btn-success m-2 p-2"
                                        onClick={() =>
                                            ManagerAction.invoice(order._id)
                                        }>
                                        CreateInvoince
                                    </button>

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

export default ManagerOrdersDetails