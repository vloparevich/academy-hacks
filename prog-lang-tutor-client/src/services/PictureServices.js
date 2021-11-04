import axios from "axios";

const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5000/api",
  // withCredentials: true // => you might need this when having the users in the app
});

const PROFILE_PIC_SERVICE = {
  getPictures: () => {
    return service.get("/").then((res) => res.data);
  },
  handleUpload: (file) => {
    return service.post("/upload", file).then((res) => res.data);
  },
  saveNewPic: (newPic) => {
    return service
      .post("/savePicture", newPic)
      .then((responseFromMyBackend) => responseFromMyBackend.data);
  },
};

export default PROFILE_PIC_SERVICE;
