import React, { useState, useEffect } from 'react';
import './MyLessons.css';
import STUDENT_LESSON_SERVICE from '../../services/StudentLessonServices';

export default function MyLessons(props) {
  const [userAndTutorDetails, setUserAndTutorDetails] = useState('');

  useEffect(() => {
    getStudentWithLessons();
  }, []);

  const getStudentWithLessons = () => {
    const studentId = props.match?.params.id
      ? props.match.params.id
      : props.studentId;
    STUDENT_LESSON_SERVICE.getStudentAndLessons(studentId)
      .then((responseFromApi) => {
        setUserAndTutorDetails(responseFromApi.data.studentWithBookings);
      })
      .catch((err) => console.log({ err: err }));
  };

  const getMyBookings = () => {
    let data = [];
    console.log('long =>' + userAndTutorDetails);
    const details = userAndTutorDetails?.myBookings;

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

  const handleLessonDeletion = (
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
    ).then(() => {
      getStudentWithLessons();
    });
  };
  return (
    <React.Fragment>
      {getMyBookings().length > 0 && (
        <div id='myLessonsCmp'>
          {getMyBookings()?.map(
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
                            handleLessonDeletion(
                              el.studentBookingId,
                              el.date,
                              scheduledHour,
                              userAndTutorDetails._id,
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
    </React.Fragment>
  );
}
