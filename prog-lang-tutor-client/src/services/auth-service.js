import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true,
});

const authService = {
  signup: (body) =>
    instance.post('/signup', body).then((response) => response.data),
  getSession: () =>
    instance.get('/session').then((response) => {
      console.log({ response: response.data });
      return response.data;
    }),
};

export default authService;
