import axios from 'axios';

const BASEURL = 'https://dummyjson.com';

const instance = axios.create({
  baseURL: BASEURL,
  timeout: 20000,
});

export { instance };
