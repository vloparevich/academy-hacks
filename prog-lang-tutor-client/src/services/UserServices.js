import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});

const USER_SERVICE = {
  getAllTutors: () => {
    return service.get('/tutor/list').then((tutors) => {
      return tutors.data.tutors;
    });
  },
  getSpecificTutor: (id) => {
    return service.get(`/tutor/${id}`).then((tutor) => tutor.data);
  },
  getSpecificStudent: (id) => {
    return service.get(`/${id}`).then((student) => student.data);
  },
};

export default USER_SERVICE;
