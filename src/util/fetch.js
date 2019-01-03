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

const commonRequest = async (options) => {

  try {
    const response = await fetch(options);
    return response.data.data;
  } catch (err) {
    if (err.response.data.errorCode === 401 || err.response.data.errorCode === 500) {
      Storage.clearLocalStorage();
      history.push(ROUTE_ERROR, err.response.data);
      return null;
    }
    throw err.response.data;
  }
};

export async function get(url, obj = {}) {
  const options = {
    params: obj,
    headers: setHeaderToken(),
    method: 'get',
    url,
  };

  const result =  await commonRequest(options);
  return result;
}

export async function post(url, data = {}) {
  const options = {
    headers: setHeaderToken(),
    method: 'post',
    url,
    data,
  };
  const result =  await commonRequest(options);
  return result;
}

export async function put(url, data = {}) {
  const options = {
    headers: setHeaderToken(),
    method: 'put',
    url,
    data,
  };

  const result =  await commonRequest(options);
  return result;
}

export async function del(url, data = {}) {
  const options = {
    headers: setHeaderToken(),
    method: 'delete',
    url,
    data,
  };

  const result =  await commonRequest(options);
  return result;
}
