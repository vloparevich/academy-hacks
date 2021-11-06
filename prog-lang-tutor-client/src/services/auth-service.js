import axios from 'axios';
import USER_HELPERS from '../utils/userToken';

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: 'Internal server error. Please check your server',
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

const instance = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true,
});

// const authService = {
//   signup: (body) =>
//     instance.post("/signup", body).then((response) => response.data),
//   getSession: () => instance.get("/session").then((response) => response.data),
// };

export function login(credentials) {
  return instance
    .post('/login', credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getLoggedIn() {
  return instance
    .get(`/session`, {
      headers: {
        authorization: USER_HELPERS.getUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function signup(credentials) {
  return instance
    .post('/signup', credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logout() {
  return instance
    .delete('/logout', {
      headers: {
        authorization: USER_HELPERS.removeUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

// export default authService;
