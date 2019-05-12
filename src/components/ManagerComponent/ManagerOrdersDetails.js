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
            <div className="card">
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <table className="table table-bordered, table-striped">
                        <caption>Store Details</caption>
                        {this.state.store !== undefined && this.state.store !== null &&
                        <tbody>
                        <tr>
                            <td>OrderID</td>
                            <td>Shutters</td>
                        </tr>
                        {this.state.store.map((order) => {
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
                                                <td>{order.status}</td>
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
                                    <td>
                                        <button className="btn-success"
                                                onClick={() => ManagerAction.install(order._id)}>Install
                                        </button>
                                    </td>
                                    <td>
                                        <button id="submit" className="btn-success"
                                                onClick={() => ManagerAction.invoice(order._id)}>CreateInvoince
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

export default ManagerOrdersDetails