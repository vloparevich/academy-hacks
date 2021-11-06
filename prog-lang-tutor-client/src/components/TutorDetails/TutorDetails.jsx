import React, { Component } from "react";
// import { Link } from 'react-router-dom';
// import NavBar from "./components/NavBar/NavBar";
import USER_SERVICE from "../../services/UserServices";
import BOOKING_SERVICE from "../../services/BookingServices";
import Timeslot from "../Timeslot/Timeslot";

export default class TutorDetails extends Component {
  state = { isScheduleShown: false, timeRange: {} };
  tutorId = this.props.match.params;

  componentDidMount = () => {
    console.log("mounting");
    this.getTutorDetails();
  };

  getTutorDetails = () => {
    const { params } = this.props.match;

    USER_SERVICE.getSpecificTutor(params.id).then((responseFromAPI) =>
      this.setState({
        tutorDetails: responseFromAPI.tutor,
        timeRange: responseFromAPI.tutor.timeRangeOfAvailability,
      })
    );
  };

  handleBookClick = () => {
    this.setState({
      isScheduleShown: !this.state.isScheduleShown,
    });
  };

  savingBookedTimeslots = (details) => {
    BOOKING_SERVICE.updateMyAvailability(details, this.tutorId);
  };

  render() {
    console.log({ myObject: this.state.tutorDetails });
    return (
      <>
        {/* <NavBar user={this.state.user} loading={this.state.loading} /> */}
        {this.state.tutorDetails?.firstName && (
          <div>
            <div>
              <b>All the details should parsed and structured: </b>
            </div>
            <div className="tutorFirstName">
              {this.state.tutorDetails.firstName}
            </div>
            <div className="TutorActions">
              <button onClick={this.handleBookClick}>Book a lesson</button>
              <button>Review</button>
            </div>
            {this.state.isScheduleShown && (
              <Timeslot
                timeRange={this.state.timeRange}
                bookedTime={this.savingBookedTimeslots}
                tutorId={this.tutorId.id}
              />
            )}
          </div>
        )}
      </>
    );
  }
}
