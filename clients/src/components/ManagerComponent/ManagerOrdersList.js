import React from 'react';
import ManagerStore from "../../store/ManagerStore"
import ManagerAction from "../../actions/ManagerAction";


class ManagerOrdersList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {orders: []};
    }

    _onChange() {
        this.setState({orders: ManagerStore._orders});
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
                <div className="card shadow-lg">
                    <div className="card-header">Manager Orders</div>
                    <div className="card-body">
                        <ul className="list-group">


                            <table className="table table-bordered, table-striped">
                                <caption>Store Details</caption>


                                {this.state.orders !== undefined && this.state.orders !== null &&
                                <tbody>
                                <tr>
                                    <td>OrderID</td>
                                    <td>Shutters Info</td>
                                    <td>Order status</td>
                                    <td>Payment</td>
                                    <td>Buttons</td>
                                </tr>
                                {this.state.orders.map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td>ShutterID</td>
                                                        <td>Height*Width</td>
                                                        <td>Color</td>
                                                        <td>Type</td>
                                                        <td>Status</td>
                                                    </tr>
                                                    {order['shutter'].map((shutter) => {
                                                        return (
                                                            <tr key={shutter.shutterID}>
                                                                <td>{shutter.shutterID}</td>
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
                                            <td className="statusText font-weight-bolder font-italic text-uppercase">{order.status}</td>
                                        <td>
                                            <td>{order.payment}</td>
                                        </td>
                                            <td>
                                                <td>
                                                    <button className="btn btn-info m-2" id="select"
                                                            onClick={() => ManagerAction.install(order._id)}>Install
                                                    </button>


                                                    <button className="btn btn-info m-2" id="parts"
                                                            onClick={() => ManagerAction.invoice(order._id)}>Creat
                                                        Invoice
                                                    </button>
                                                </td>
                                            </td>
                                        </tr>

                                    )
                                })}
                                </tbody>
                                }
                            </table>
                        </ul>
                    </div>
                    <div className="card-footer"></div>
                </div>
            </>
        )
    }
}

export default ManagerOrdersList;