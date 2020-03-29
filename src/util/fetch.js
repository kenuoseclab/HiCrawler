import fetch from 'axios';
import qs from 'qs';

import { createBrowserHistory as createHistory } from 'history';

import { ROUTE_ERROR } from './constants';
import Storage from './storage';

const history = createHistory({ forceRefresh: true });
fetch.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

const commonRequest = async (method, url, data) => {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method,
    url,
    data: qs.stringify(data),
  };

  try {
    const response = await fetch(options);
    return response.data && response.data.data ? response.data.data : response.data;
  } catch (err) {
    if (err && err.response) {
      if (err.response.data.errorCode === 401 || err.response.data.errorCode === 500) {
        Storage.clearLocalStorage();
        history.push(ROUTE_ERROR, err.response.data);
        return null;
      }
      throw new Error(err.response.data.errorMessage);
    } else {
      throw new Error('不能连接服务器。');
    }
  }
};

export function get(url, params = {}) {
  return commonRequest('get', url, { params });
}

export function post(url, data = {}) {
  return commonRequest('post', url, data);
}

export function put(url, data = {}) {
  return commonRequest('put', url, data);
}

export function del(url, data = {}) {
  return commonRequest('delete', url, data);
}
