// src/api/service.js

import axios from 'axios';

const service = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: 'http://localhost:5000/api'
    // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = err => {
    throw err;
};


const getPictures = () => {
    return service
        .get("/user")
        .then((res) => res.data)
        .catch(errorHandler);
};
const handleUpload = (file) => {
    return service
        .post('/upload', file)
        .then(res => res.data)
        .catch(errorHandler);
};

const saveNewPic = (newPic) => {
    return service
        .post('/user', newPic)
        .then(res => res.data)
        .catch(errorHandler);
};


const logger = {
    service,
    handleUpload,
    saveNewPic,
    getPictures,
};
export default logger;

