import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5000/api/review',
    // withCredentials: true // => you might need this when having the users in the app
});

const REVIEW_SERVICE = {
    createReview: (userId, reviewContent, tutorId) => {
        return service.post('/tutor/review', {userId, reviewContent, tutorId}).then((responseFromApi) => {
            return responseFromApi;
        }).catch(err => 
            console.log('error', err)
        )
    }
};

// const USER_SERVICE = {
//     getAllTutors: () => {
//       return service.get('/tutor/list').then((tutors) => {
//         return tutors.data.tutors;
//       });
//     },
//     getSpecificTutor: (id) => {
//       return service.get(`/tutor/${id}`).then((tutor) => tutor.data);
//     },
//     getSpecificStudent: (id) => {
//       return service.get(`/${id}`).then((student) => student.data);
//     },
//   };

export default REVIEW_SERVICE;