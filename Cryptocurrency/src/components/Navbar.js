import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'


class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            loading: true, 
        }
        
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <NavLink className="navbar-brand" to="/">
                    <span className="brand-icon">⛓</span>
                    <b>Vansh Blockchain v4</b>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/">
                                🏠 Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/create-transaction">
                                💸 Create Transaction
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/pending-transactions">
                                ⏳ Pending Transactions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/my-wallet">
                                👛 My Wallet
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-none d-lg-flex">
                        <span className="stat-badge">
                            <span className="dot"></span>
                            Network Active
                        </span>
                    </div>
                </div>
            </nav>
        )

    }
}

export default withRouter(Navbar)