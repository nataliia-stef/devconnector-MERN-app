import axios from 'axios';
import { DEFAULT_ECDH_CURVE } from 'tls';

const setAuthToken = token => {
  if (token) {
    //Apply to each request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //Delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
