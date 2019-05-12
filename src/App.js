import React from 'react';
import './App.scss';
import CustomerList from "./components/CustomerComponent/CustomerList";
import CustomerAdd from "./components/CustomerComponent/CustomerAdd";
import AddOrders from "./components/CustomerComponent/AddOrders";
import WorkerComponent from "./components/WorkerComponent/WorkerComponent";
import ManagerComponent from "./components/ManagerComponent/ManagerComponent";
import CustomerComponent from "./components/CustomerComponent/CustomerComponent";
import CustomerActions from "./actions/CustomerActions";
import MenuActions from "./actions/MenuActions";


function App() {
    return (
        <div className="App">
            <div className="App container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#cust">Customer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#work">Worker</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#man">Manager</a>
                            </li>
                        </ul>

                    </div>
                </nav>
                <div className="container" id="mainContainer">
                    <CustomerComponent/>
                    <WorkerComponent/>
                    <ManagerComponent/>
                </div>
            </div>
        </div>
    );
}

export default App;
