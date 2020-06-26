import axios from 'axios';
import { SERVER_ADDRESS } from './envVariables';

import { dispatchCustomNetworkError, dispatchCustomAuthError } from './helpers/warningDispatcher';

const webservice = (props = {
  baseEndpoint: '',
  addHeaders: {},
}) => {
  const addHeaders = props.addHeaders || {};
  const baseEndpoint = props.baseEndpoint || '';
  const headers = {
    'Content-Type': 'application/json',
    ...addHeaders,
  };
  const instance = axios.create({
    baseURL: SERVER_ADDRESS + baseEndpoint,
    headers,
    withCredentials: true,
  });

  instance.interceptors.response.use(response => response, e => {
    if (e.message === 'Network Error') {
      dispatchCustomNetworkError();
    } else if (e.response?.status === 401) {
      dispatchCustomAuthError();
    }
    throw e;
  });
  return instance;
};

export default webservice;
