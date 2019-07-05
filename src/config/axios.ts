import axios from 'axios';
import history from './history';

const appId = "ChypEEVc3f3LSDoCJgcJQy3c"
const appSecret = "CWt3N4GL4dkgcQ2J4SgYowEW"

/* tslint:disable:no-string-literal */
const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com',
  timeout: 10000,
  headers: {
    't-app-id': appId,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if(xToken){
      config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.headers['x-token']){
      localStorage.setItem('x-token',response.headers['x-token'])
  }
  return response;
}, function (error) {
  // Do something with response error
  if(error.response.status === 401){
    history.push('/login')
  }
  return Promise.reject(error);
});
/* tslint:enable:no-string-literal */
export default instance