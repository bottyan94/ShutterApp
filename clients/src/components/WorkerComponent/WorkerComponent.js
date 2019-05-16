import React from 'react';

import WorkerStore from "../../store/WorkerStore"
import WorkerActions from "../../actions/WorkerActions";

class WorkerComponent extends React.Component {

    constructor(props) {
        super(props);
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
        return (
            <>
                <div className="container-fluid p-2 " id="work">
                    <div className="card mt-5 shadow-lg">
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
                                                                        <button className="btn btn-info shadow-lg" id="select"
                                                                                onClick={() => {
                                                                                    WorkerActions.select(shutter.shutterID);
                                                                                    /*WorkerActions.listOrders();*/
                                                                                }}>Select
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-info shadow-lg" id="parts"
                                                                                onClick={() => {
                                                                                    WorkerActions.listParts(shutter.shutterID);
                                                                                   /* WorkerActions.listOrders()*/
                                                                                }}>Parts
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td className="statusText font-weight-bolder font-italic text-uppercase">{order.status}</td>
                                                <td>
                                                    <button className="btn submenu shadow-lg" id="finish"
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