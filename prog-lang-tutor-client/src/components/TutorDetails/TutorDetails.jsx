import React, { Component } from 'react';

import USER_SERVICE from '../../services/UserServices';
import BOOKING_SERVICE from '../../services/BookingServices';
import Timeslot from '../Timeslot/Timeslot';
import ReviewTutor from '../ReviewTutor/ReviewTutor';
import { Link } from 'react-router-dom';
import '../TutorDetails/TutorDetails.css'

export default class TutorDetails extends Component {
  state = { isScheduleShown: false, timeRange: {} };
  tutorId = this.props.match.params;

  componentDidMount = () => {
    console.log('mounting');
    this.getTutorDetails();
  };

  getTutorDetails = () => {
    const { params } = this.props.match;

    USER_SERVICE.getSpecificTutor(params.id).then((responseFromAPI) => {
      console.log({ responseFromAPI: responseFromAPI })
      this.setState({
        tutorDetails: responseFromAPI.tutor,
        timeRange: responseFromAPI.tutor.timeRangeOfAvailability,
        coursesTaught: responseFromAPI.tutor.coursesTaught.courses[0]
      })
    });
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
        {this.state.tutorDetails?.firstName && (
          <div className='TutorPage'>
          <div>
            <img className='TutorProfilePicture' src={this.state.tutorDetails.profilePic} alt="pic" />
            </div>
            <div className='TutorInfo'>
              <h1>{this.state.tutorDetails.firstName} {this.state.tutorDetails.lastName}</h1>
            
            
              <h3>{this.state.tutorDetails.teachingExperience} years of experience!</h3>
            
            
              <h2>{this.state.coursesTaught.courseName} : {this.state.coursesTaught.description}.</h2>
              <Link to={`/tutor/review/${this.state.tutorDetails._id}`}>
                <button type="button">
                  Review This Tutor
                </button>
              </Link>
            </div>
            <div className='TutorActions'>
              <button onClick={this.handleBookClick}>Book a lesson</button>
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
