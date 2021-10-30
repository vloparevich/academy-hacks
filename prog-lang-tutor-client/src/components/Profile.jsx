import React, { Component } from 'react';
import axios from 'axios';


class Profile extends Component {

    state = {
        profilePic: '',
    };

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        axios.get(`http://localhost:5000/api/user/tutor/617b378c30aceadaa78445fb`)

            .then(user => {
                console.log(user.data.tutor)
                this.setState({ ...user.data.tutor })
            })
    }

    render() {
        console.log(this.state.firstName)
        return (
            <div className="container">
                <div className="userImage"><p>user image to go here</p></div>
                <div>
                    <div className="userDetails">
                        <li>Name:</li>
                        <li>Looking To Learn:</li>
                        <li>Days/Time Available</li>
                    </div>
                    <div className="bookedSessions"><p>sessions calendar to go here</p></div>
                    <div>HELLO {this.state.firstName}</div>
                </div>



            </div>
        );
    }
}

export default Profile;