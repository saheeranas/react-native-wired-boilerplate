import axios from 'axios';
import {getToken} from '../utils/token';

// TODO: import from ENV
const BASE_URL = 'http://10.0.2.2:3003';
// const BASE_URL = 'https://jsonplaceholder.typicode.com';

const request = axios.create({
  baseURL: BASE_URL,
});

export const updateAxiosHeaders = () => {
  let token = getToken();

  request.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : '';
};

export default request;
