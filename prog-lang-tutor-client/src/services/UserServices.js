import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});

const USER_SERVICE = {
  getAllTutors: () => {
    return service.get('/tutor/list').then((tutors) => {
      console.log('server side', tutors);
      return tutors.data.tutors;
    });
  },
  getSpecificTutor: (id) => {
    return service.get(`/tutor/${id}`).then((tutor) => tutor.data);
  },
  getSpecificStudent: (id) => {
    return service.get(`/${id}`).then((dataFromDb) => dataFromDb.data);
  },
};

export default USER_SERVICE;

// getUser = () => {
//   axios
//     .get(`http://localhost:5000/api/user/${this.state.user._id}`)
//     .then((dataFromDb) => {
//       const { user } = dataFromDb.data;
//       this.setState({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         countryOfOrigin: user.countryOfOrigin,
//         profilePic: user.profilePic,
//         aboutMe: user.aboutMe,
//       });
//     });
// };
