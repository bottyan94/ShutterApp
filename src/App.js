import React from 'react';
import './App.css';
import CustomerActions from "./actions/CustomerActions";
import WorkerActions from "./actions/WorkerActions";
import ManagerAction from "./actions/ManagerAction";


function App() {
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top myNavbar">
                <a className="navbar-brand">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link buttonsMenu" onClick={() => {
                                CustomerActions.showCustomer()
                                CustomerActions.listCustomers();
                            }}>Customer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link buttonsMenu" onClick={() => {
                                WorkerActions.showWorker();
                                WorkerActions.listOrders();
                            }}>Worker</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link buttonsMenu" onClick={() => {
                                ManagerAction.showManager();
                                ManagerAction.listCustomers();
                                ManagerAction.listOrders();
                            }}>Manager</a>
                        </li>
                    </ul>

                </div>
            </nav>
            <div className="App mt-5">
                <div className="App container-fluid">
                    <div className="container" id="mainContainer">
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
