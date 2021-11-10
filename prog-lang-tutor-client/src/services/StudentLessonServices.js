import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api/lesson',
});

const STUDENT_LESSON_SERVICE = {
  getStudentAndLessons: (studentId) => {
    return service
      .get(`/${studentId}`)
      .then((responseFromApi) => {
        console.log('populating', responseFromApi);
        return responseFromApi;
      })
      .catch((err) =>
        console.log('Student with the lessosn was not found', { err: err })
      );
  },
  cancelStudentBooking: (
    studentBookingId,
    date,
    scheduledHour,
    studentId,
    tutorId
  ) => {
    return service
      .post('/cancelBooking', {
        studentBookingId,
        date,
        scheduledHour,
        studentId,
        tutorId,
      })
      .then((responseFromApi) => {
        return responseFromApi;
      })
      .catch((err) => console.log('Booking was not cancelled'));
  },
};

export default STUDENT_LESSON_SERVICE;
