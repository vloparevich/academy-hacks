import React, { Component } from "react";
// import Navbar from "../Navbar/Navbar";
import "./TutorList.css";
import TutorDetails from "../TutorDetails/TutorDetails";

export default class TutorList extends Component {
  // state = {
  //   coursesTaught: "",
  // };
  render() {
    // const { isTutor } = this.props;
    return (
      <div>
        {/* <Navbar /> */}
        <TutorDetails />
        <div>hi</div>

        <div className="work">hello</div>
      </div>
    );
  }
}
