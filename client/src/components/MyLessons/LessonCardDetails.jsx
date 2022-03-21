import React from 'react';

export default function LessonCardDetails(props) {
  return (
    <div className='myLessonCard' key={props.details.studentBookingId}>
      <p>{props.details.date}</p>
      <img
        src={props.details.profilePic}
        id='myLessonsTutorPic'
        alt='profile pic'
      />
      <p id='myLessonCourseName'>
        <span id='myLessonSubjectName'>{props.details.courseName}</span>
      </p>
      <p id='myLessonTutorName'>{props.details.tutorFullName}</p>
      <ul>
        {props.details.pickedSlots.map((scheduledHour, i) => (
          <li key={i}>
            {scheduledHour}:00{' '}
            <button
              className='myLesson_cancel_btn'
              onClick={() =>
                props.handleLessonDeletion(
                  props.details.studentBookingId,
                  props.details.date,
                  scheduledHour,
                  props.userAndTutorDetails._id,
                  props.details.tutorId
                )
              }
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
