import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api/profile',
  // withCredentials: true // => you might need this when having the users in the app
});

const PROFILE_SERVICE = {
  handleUpload: (profilePic, userId) => {
    return service
      .post(`/profileImage/${userId}`, profilePic)
      .then((responseFromApi) => responseFromApi.data)
      .catch((err) =>
        console.log('Picture has not been uploaded', { err: err })
      );
  },
  handleUpdateTutorDetails: (updatedData) => {
    console.log('from the component:', { updatedData: updatedData });
    const {
      firstName,
      lastName,
      countryOfOrigin,
      teachingExperience,
      courseName,
      description,
      from,
      to,
      prevCourseName,
    } = updatedData;

    console.log('previous course name', prevCourseName);
    console.log('previous course name', courseName);
    return service
      .patch(`tutor/${updatedData.user._id}`, {
        firstName,
        lastName,
        countryOfOrigin,
        teachingExperience,
        courseName,
        description,
        from,
        to,
        prevCourseName,
      })
      .then((responseFromApi) => responseFromApi.data)
      .catch((err) => console.log("Tutor's data was not updated", err));
  },
};

export default PROFILE_SERVICE;
