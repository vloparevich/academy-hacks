import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {

    render() {
        return (
            <nav className="nav-style">
                {/* <img className="logo" src="logo.png" alt="logo" /> */}
                {/* <img className="logo" src="logo.png" alt="logo" /> */}
                <ul>
                    <Link to="/" ><img className="logo" src="logo.png" alt="logo" /></Link>
                    <li>
                        <Link to="/">Academy Hacks</Link>
                    </li>
                    <li>
                        <Link to="/user">Profile</Link>
                    </li>


                </ul>
                <hr></hr>
            </nav>

        )
    }
}

export default Navbar;