import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/review`,
  // withCredentials: true // => you might need this when having the users in the app
});

const REVIEW_SERVICE = {
  createReview: (studentId, tutorId, reviewContent) => {
    return service
      .post('/tutor/review', { studentId, tutorId, reviewContent })
      .then((responseFromApi) => {
        return responseFromApi.data;
      })
      .catch((err) => console.log('error', err));
  },
  getAllReviews: (tutorId) => {
    console.log('service tutorId', tutorId);
    return service.get(`/reviews/${tutorId}`).then((responseFromApi) => {
      console.log(responseFromApi);
      return responseFromApi.data;
    });
  },
  deleteReview: (reviewId) => {
    return service.post(`/delete`, { reviewId: reviewId }).then(() => {
      return;
    });
  },
};

export default REVIEW_SERVICE;
