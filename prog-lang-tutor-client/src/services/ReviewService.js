import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5000/api/review',
    // withCredentials: true // => you might need this when having the users in the app
});

const REVIEW_SERVICE = {
    createReview: (studentId, tutorId, reviewContent) => {
        return service.post('/tutor/review', {studentId, tutorId, reviewContent}).then((responseFromApi) => {
            console.log(responseFromApi);
            return responseFromApi.data;
        }).catch(err => 
            console.log('error', err)
        )
    },
    getAllReviews: (tutorId) => {
        return service.get(`/reviews/${tutorId}`).then((responseFromApi) => {
            console.log(responseFromApi);
            return responseFromApi.data;
        })
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