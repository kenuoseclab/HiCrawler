import fetch from 'axios';
import createHistory from 'history/createBrowserHistory';

import { ROUTE_ERROR } from './constants';
import Storage from './storage';

const history = createHistory({ forceRefresh: true });
fetch.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

const setHeaderToken = () => {
  const token = Storage.getToken();
  return { 'x-token-crawler': `${token}` };
};

const commonRequest = async options => {
  try {
    const response = await fetch(options);
    return response.data.data;
  } catch (err) {
    if (err.response) {
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

export function get(url, obj = {}) {
  const options = {
    params: obj,
    headers: setHeaderToken(),
    method: 'get',
    url,
  };

  return commonRequest(options);
}

export function post(url, data = {}) {
  const options = {
    headers: setHeaderToken(),
    method: 'post',
    url,
    data,
  };
  return commonRequest(options);
}

export function put(url, data = {}) {
  const options = {
    headers: setHeaderToken(),
    method: 'put',
    url,
    data,
  };

  return commonRequest(options);
}

export function del(url, data = {}) {
  const options = {
    headers: setHeaderToken(),
    method: 'delete',
    url,
    data,
  };

  return commonRequest(options);
}
