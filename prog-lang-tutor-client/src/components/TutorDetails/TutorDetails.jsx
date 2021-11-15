import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import USER_SERVICE from '../../services/UserServices';
import BOOKING_SERVICE from '../../services/BookingServices';
import * as PATHS from '../../utils/paths';
import Timeslot from '../Timeslot/Timeslot';
import ReviewTutor from '../ReviewTutor/ReviewTutor';
import '../TutorDetails/TutorDetails.css';
import CountryFlag from '../CountryFlag/CountryFlag';
import { Link } from 'react-router-dom';

export default class TutorDetails extends Component {
  state = { isScheduleShown: false, timeRange: {} };

  tutorId = this.props.match.params;

  componentDidMount = () => {
    console.log('mounting');
    this.getTutorDetails();
    this.setCurrentUSerDetails();
  };
  getTutorDetails = () => {
    const { params } = this.props.match;
    USER_SERVICE.getSpecificTutor(params.id).then((responseFromAPI) => {
      this.setState({
        tutorDetails: responseFromAPI.tutor,
        timeRange: responseFromAPI.tutor?.timeRangeOfAvailability,
        coursesTaught: responseFromAPI.tutor?.coursesTaught.courses[0],
      });
    });
  };

  setCurrentUSerDetails = () => {
    this.setState({ currentUser: this.props.user });
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
    console.log('details state', this.state.currentUser?.isTutor);
    return (
      <>
        {this.state.tutorDetails?.firstName && (
          <div className='TutorContainer'>
            <div className='TutorDetails'>
              <img
                className='TutorProfilePicture'
                src={this.state.tutorDetails.profilePic}
                alt='pic'
              />
              <div className='TutorInfo'>
                <h1>
                  {this.state.tutorDetails.firstName}{' '}
                  {this.state.tutorDetails.lastName}{' '}
                  <CountryFlag
                    countryOfOrigin={this.state.tutorDetails?.countryOfOrigin}
                  />
                </h1>
                <p>
                  {this.state.tutorDetails.teachingExperience} years of
                  experience Country: {this.state.tutorDetails?.countryOfOrigin}
                </p>
                <p>
                  <b>Teaches</b> {this.state.coursesTaught.courseName}
                </p>
              </div>
            </div>
            <div className='TutorDetailsDescription'>
              <h2>About the tutor</h2>
              {this.state.coursesTaught.description}
            </div>
            <div className='TutorDetailsScheduleContainer'>
              <h2>Schedule</h2>
              {!this.state.currentUser?.isTutor ? (
                <>
                  <div className='TutorActions'>
                    <button
                      id='bookLessonButton'
                      onClick={this.handleBookClick}
                    >
                      Book a lesson
                    </button>
                  </div>
                </>
              ) : (
                <div className='TutorDetailsScheduleNotLoggedIn'>
                  <span>
                    ⚠ Please{' '}
                    <Link to='/auth/login'>
                      <b>log in</b>
                    </Link>{' '}
                    or{' '}
                    <Link to='/auth/signup'>
                      <b>sign up as a student</b>
                    </Link>{' '}
                    to book a class or leave a review.
                  </span>
                </div>
              )}
              {!this.props.user && this.state.isScheduleShown && (
                <Redirect
                  to={{
                    pathname: PATHS.LOGINPAGE,
                    toBeRedirectedBack: this.props.location,
                  }}
                />
              )}
              {this.state.isScheduleShown && (
                <Timeslot
                  timeRange={this.state.timeRange}
                  bookedTime={this.savingBookedTimeslots}
                  tutorId={this.tutorId.id}
                  studentId={this.props.user?._id}
                />
              )}
            </div>
            <div className='TutorReviews'>
              <ReviewTutor
                tutorId={this.tutorId.id}
                studentId={this.props.user?._id}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
