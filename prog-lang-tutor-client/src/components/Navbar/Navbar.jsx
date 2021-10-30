import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {

    render() {
        return (
            <nav className="nav-style">
                <img className="logo" src="logo.png" alt="logo"/>
                <ul>
                    <li>
                        <Link to="/">Academy Hacks</Link>
                    </li>
                    <li>
                        <Link to="/user">Profile</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;