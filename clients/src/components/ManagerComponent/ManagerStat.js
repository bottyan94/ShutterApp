import React from 'react';
import PieChart from 'react-minimal-pie-chart';

import ManagerStore from "../../store/ManagerStore";




class ManagerStat extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {stat: []};
    }

    _onChange() {
        this.setState({stat: ManagerStore._stat});
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
                <div className="row d-flex justify-content-center p-2">
                    <div className="card col-3 p-2 shadow-lg">
                        <div className="card-header">Stat</div>
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">All Orders: {this.state.stat.allOrders} </li>
                                <li className="list-group-item">Added: {this.state.stat.added} </li>
                                <li className="list-group-item">Submitted: {this.state.stat.submitted} </li>
                                <li className="list-group-item">Finished: {this.state.stat.finished} </li>
                                <li className="list-group-item">Installed: {this.state.stat.installed} </li>
                            </ul>
                        </div>

                        <div className="card-footer"></div>
                    </div>
                    <div className="card col-5 p-2 shadow-lg">
                        <div className="card-header">Diagram</div>
                        <div className="card-body">
                            <PieChart className=""
                                data={[
                                    { title: 'Added', value: this.state.stat.added, color: '#E38627' },
                                    { title: 'Submitted', value: this.state.stat.submitted, color: '#C13C37' },
                                    { title: 'Finished', value: this.state.stat.finished, color: '#1c3f6a' },
                                    { title: 'Installed', value: this.state.stat.installed, color: '#096a0c' },
                                ]}
                            />
                        </div>

                        <div className="card-footer"></div>
                    </div>
                    <div className="col-9" id="ownOrders"></div>
                </div>
            </>
        )
    }
}

export default ManagerStat