import fetch from 'axios';
import createHistory from 'history/createBrowserHistory';

import { ROUTE_ERROR } from './constants';
import storage from './storage';

const history = createHistory({ forceRefresh: true });
fetch.defaults.baseURL = `${process.env.API_URL}`;

const setHeaderToken = () => {
  const token = storage.getToken();
  return { 'web-crawler-token-template': `${token}` };
};

const commonRequest = (options, callback) => {
  fetch(options)
    .then(response => {
      callback(undefined, response.data.data);
    })
    .catch(err => {
      if (err.response.data.errorCode === 401 || err.response.data.errorCode === 500) {
        storage.clearLocalStorage();
        history.push(ROUTE_ERROR, err.response.data);
      } else {
        callback(err.response.data, undefined);
      }
    });
};

export function get(url, obj = {}, callback) {
  const options = {
    params: obj,
    headers: setHeaderToken(),
    method: 'get',
    url,
  };

  commonRequest(options, callback);
}

export function post(url, data = {}, callback) {
  const options = {
    headers: setHeaderToken(),
    method: 'post',
    url,
    data,
  };

  commonRequest(options, callback);
}

export function put(url, data = {}, callback) {
  const options = {
    headers: setHeaderToken(),
    method: 'put',
    url,
    data,
  };

  commonRequest(options, callback);
}

export function del(url, data = {}, callback) {
  const options = {
    headers: setHeaderToken(),
    method: 'delete',
    url,
    data,
  };

  commonRequest(options, callback);
}
