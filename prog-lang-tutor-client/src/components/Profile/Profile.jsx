import React, { Component } from 'react';
import axios from 'axios';
import Timeslot from '../Timeslot/Timeslot'
import './Profile.css';


class Profile extends Component {

    state = {};

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        axios.get(`http://localhost:5000/api/user/617b378c30aceadaa78445fb`)

        .then(user => {
            // console.log("USER", user.data.user)
            this.setState({...user.data.user})
        })
    }

    handleRange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }


    render() {
        console.log(this.state)
        return (
            <div className="container">
            <div>Hello there, {this.state.lastName}...{this.state.firstName} {this.state.lastName}</div>
            <div className="userImage"><p>user image to go here</p></div>
            <div>
            <div className="userDetails">
                <li>Name:</li>
                <li>Looking To Learn:</li>
                <li>Days/Time Available</li>
                <label>From</label>
                <input type='number' name = 'from' onChange ={(event) => this.handleRange(event)} ></input>
                <label>To</label>
                <input type='number' name = 'to' onChange = {this.handleTo} ></input>
                {/* <button onClick={this.handleTimeRange}>Continue</button> */}
            </div>
            <div className="bookedSessions"><p><Timeslot></Timeslot></p></div>
            </div>


                
            </div>
        );
    }
}

export default Profile;