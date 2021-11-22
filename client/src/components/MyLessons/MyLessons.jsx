import axios from 'axios';
import React, { Component } from 'react';
import './MyLessons.css';
import STUDENT_LESSON_SERVICE from '../../services/StudentLessonServices';

export default class MyLessons extends Component {
  state = {};

  componentDidMount = () => {
    this.getStudentWithLessons();
  };

  getStudentWithLessons = () => {
    const studentId = this.props.match?.params.id
      ? this.props.match.params.id
      : this.props.studentId;
    STUDENT_LESSON_SERVICE.getStudentAndLessons(studentId)
      .then((responseFromApi) => {
        this.setState(
          { userAndTutorDetails: responseFromApi.data.studentWithBookings },
          () => {
            console.log('state', this.state);
          }
        );
      })
      .catch((err) => console.log({ err: err }));
  };

  getMyBookings = () => {
    let data = [];
    console.log('long', this.state.userAndTutorDetails);
    const details = this.state.userAndTutorDetails?.myBookings;

    details?.forEach((el) => {
      data.push({
        date: el.date,
        pickedSlots: el.pickedSlots.sort((a, b) => a - b),
        tutorFullName: `${el.tutorId?.firstName} ${el.tutorId?.lastName}`,
        studentBookingId: el._id,
        tutorId: el.tutorId?._id,
        courseName: el.tutorId?.coursesTaught.courses[0].courseName,
        profilePic: el.tutorId?.profilePic,
      });
    });
    const sortedByDate = [...data].sort((a, b) => (a.date > b.date ? 1 : -1));
    return sortedByDate;
  };

  handleLessonDeletion = (
    studentBookingId,
    date,
    scheduledHour,
    studentId,
    tutorId
  ) => {
    STUDENT_LESSON_SERVICE.cancelStudentBooking(
      studentBookingId,
      date,
      scheduledHour,
      studentId,
      tutorId
    ).then((response) => {
      this.getStudentWithLessons();
    });
  };

  render() {
    return (
      <>
        {this.getMyBookings().length > 0 && (
          <div id='myLessonsCmp'>
            {this.getMyBookings()?.map(
              (el) =>
                el.courseName && (
                  <div className='myLessonCard' key={el.studentBookingId}>
                    <p>{el.date}</p>
                    <img
                      src={el.profilePic}
                      id='myLessonsTutorPic'
                      alt='profile pic'
                    />
                    <p id='myLessonCourseName'>
                      <span id='myLessonSubjectName'>{el.courseName}</span>
                    </p>
                    <p id='myLessonTutorName'>{el.tutorFullName}</p>
                    <ul>
                      {el.pickedSlots.map((scheduledHour, i) => (
                        <li key={i}>
                          {scheduledHour}:00{' '}
                          <button
                            className='myLesson_cancel_btn'
                            onClick={() =>
                              this.handleLessonDeletion(
                                el.studentBookingId,
                                el.date,
                                scheduledHour,
                                this.state.userAndTutorDetails._id,
                                el.tutorId
                              )
                            }
                          >
                            Cancel
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
      </>
    );
  }
}
