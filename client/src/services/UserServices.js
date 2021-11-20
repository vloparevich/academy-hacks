import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`,
});

const USER_SERVICE = {
  getAllTutors: () => {
    return service.get('/tutor/list').then((tutors) => {
      console.log('server side', tutors);
      return tutors.data.tutors;
    });
  },
  getSpecificTutor: (id) => {
    return service.get(`/tutor/${id}`).then((tutor) => {
      console.log('my tutor is back from backend', tutor);
      return tutor.data;
    });
  },
  getSpecificStudent: (id) => {
    return service.get(`/${id}`).then((dataFromDb) => dataFromDb.data);
  },
  deleteTutor: (id) => {
    return service.delete(`/tutor/${id}`).then((respnseFromApi) => {
      console.log(respnseFromApi);
      return respnseFromApi.data;
    });
  },
  deleteStudent: (id) => {
    return service.delete(`/student/${id}`).then((respnseFromApi) => {
      console.log(respnseFromApi);
      return respnseFromApi.data;
    });
  },
};

export default USER_SERVICE;
