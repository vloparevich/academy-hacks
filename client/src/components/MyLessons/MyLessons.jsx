import React, { useState, useEffect } from 'react';
import './MyLessons.css';
import STUDENT_LESSON_SERVICE from '../../services/StudentLessonServices';
import LessonCardDetails from './LessonCardDetails';

export default function MyLessons(props) {
  const [userAndTutorDetails, setUserAndTutorDetails] = useState('');
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    getStudentWithLessons();
  }, []);

  useEffect(() => {
    setMyBookings(getMyBookings());
  }, [userAndTutorDetails]);

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
      <div id='myLessonsCmp'>
        {myBookings?.map(
          (el) =>
            el.courseName && (
              <LessonCardDetails
                details={el}
                userAndTutorDetails={userAndTutorDetails}
                handleLessonDeletion={handleLessonDeletion}
              />
            )
        )}
      </div>
    </React.Fragment>
  );
}
