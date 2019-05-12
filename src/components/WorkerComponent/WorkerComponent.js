import React from 'react';
import CustomerActions from "../../actions/CustomerActions";
import CustomerStore from "../../store/CustomerStore";
import WorkerStore from "../../store/WorkerStore"
import WorkerActions from "../../actions/WorkerActions";

class WorkerComponent extends React.Component {

    constructor(props) {
        super(props);
        WorkerActions.listOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {orders: []};
    }

    _onChange() {
        this.setState({orders: WorkerStore._orders});
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange)
    }

    render() {
        // console.log("bentvagyok")
        return (
            <>
                <div className="container-fluid" id="work">
                    <div className="card">
                        <div className="card-header">Orders</div>
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
                                                            <td>Buttons</td>
                                                        </tr>
                                                        {order['shutter'].map((shutter) => {
                                                            return (
                                                                <tr key={shutter.shutterID}>
                                                                    <td>{shutter.shutterID}</td>
                                                                    <td>{shutter.height}*{shutter.width}</td>
                                                                    <td>{shutter.color}</td>
                                                                    <td>{shutter.type}</td>
                                                                    <td>{shutter.status}</td>
                                                                    <td>
                                                                        <button className="btn-info" id="select"
                                                                                onClick={() => WorkerActions.select(shutter.shutterID)}>Select
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn-info" id="parts"
                                                                                onClick={() => WorkerActions.listParts(shutter.shutterID)}>Parts
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <button className="btn-success" id="finish"
                                                            onClick={() => WorkerActions.finish(order._id)}>Finish
                                                    </button>
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
                </div>
            </>
        )
    }
}

export default WorkerComponent