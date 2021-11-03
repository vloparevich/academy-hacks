import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import USER_SERVICE from '../../services/UserServices';
import BOOKING_SERVICE from '../../services/BookingServices';
import Timeslot from '../Timeslot/Timeslot';

export default class TutorDetails extends Component {
  state = { isScheduleShown: false, timeRange: {} };
  tutorId = this.props.match.params;

  componentDidMount = () => {
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
    return (
      <div>
        <div>
          <b>All the details should parsed and structured: </b>
          {JSON.stringify(this.state.tutorDetails)}
        </div>
        <div className='TutorActions'>
          <button onClick={this.handleBookClick}>Book a lesson</button>
          <button>Message</button>
        </div>
        {this.state.isScheduleShown && (
          <Timeslot
            timeRange={this.state.timeRange}
            bookedTime={this.savingBookedTimeslots}
            tutorId={this.tutorId.id}
          />
        )}
      </div>
    );
  }
}
