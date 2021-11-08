import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

// import TutorDetails from "../TutorDetails/TutorDetails";

export default class TutorList extends Component {
  render() {
    const { tutor } = this.props;
    return (
      <div>
        <Navbar />
        {/* <TutorDetails /> */}
        <div className="NameTutor">
          {tutor.firstName} {tutor.lastName[0].toUpperCase()}
        </div>
        <h1>hhbk</h1>
        <div className="work">hello</div>
      </div>
    );
  }
}
