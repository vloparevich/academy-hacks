import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api/booking',
});

const BOOKING_SERVICE = {
  updateMyAvailability: (data, tutorId) => {
    return service
      .post('/', { data: data, tutorId: tutorId })
      .then((responseFromApi) => responseFromApi)
      .catch((err) => console.log(err));
  },
  getMyScheduleForThisDay: (thisDay, tutorId) => {
    return service
      .post('/calendar', { thisDay: thisDay, tutorId: tutorId })
      .then((responseFromApi) => responseFromApi)
      .catch((err) => console.log(err));
  },
  createBookingsOnStudent: (date, pickedSlots, studentId, tutorId) => {
    return service
      .post('/saveBookingsOnStudent', {
        date: date,
        pickedSlots: pickedSlots,
        studentId: studentId,
        tutorId: tutorId,
      })
      .then((responseFromApi) => responseFromApi)
      .catch((err) => console.log(err));
  },
};

export default BOOKING_SERVICE;
