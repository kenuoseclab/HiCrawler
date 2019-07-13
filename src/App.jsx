import React from 'react';
import * as PropTypes from 'prop-types';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';

import { IntlProvider, addLocaleData } from 'react-intl';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import CDefaultLayout from './modules/system/components/CDefaultLayout';
import SInternalServerError from './modules/system/scenes/SInternalServerError';
import SNotFound from './modules/system/scenes/SNotFound';
import SLogin from './modules/system/scenes/SLogin';
import SDashboard from './modules/dashboard/scenes/SDashboard';
import STaskList from './modules/task/scenes/STaskList';
import STaskDetail from './modules/task/scenes/STaskDetail';
import SSetting from './modules/setting/scenes/SSetting';

import './static/css/resetant.less';
import './static/css/login.less';
import './static/css/index.less';
import './static/css/task.less';

import localZH from './locales/zh';
import localEN from './locales/en';
import localJA from './locales/ja';
import Storage from './util/storage';

import {
  ROUTE_LOGIN,
  ROUTE_TASK_LIST,
  ROUTE_TASK_DETAIL,
  ROUTE_DASHBOARD,
  ROUTE_SETTING,
  ROUTE_ERROR,
} from './util/constants';

addLocaleData([...zh, ...en, ...ja]);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Storage.isAuthenticatedUser() ? (
          <CDefaultLayout tabKey={rest.tabKey} {...props}>
            <Component {...props} />
          </CDefaultLayout>
        ) : (
          <Redirect to={ROUTE_LOGIN} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (!Storage.isAuthenticatedUser() ? <Component {...props} /> : <Redirect to={ROUTE_DASHBOARD} />)}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

const chooseLocale = () => {
  let rtn = localZH;
  switch (navigator.language.split('-')[0]) {
    case 'en':
      rtn = localEN;
      break;
    case 'zh':
      rtn = localZH;
      break;
    case 'ja':
      rtn = localJA;
      break;
    default:
      rtn = localZH;
      break;
  }
  return rtn;
};

function App() {
  return (
    <IntlProvider locale={navigator.language} messages={chooseLocale()}>
      <Router>
        <Switch>
          <PublicRoute path="/" exact component={SLogin} />
          <PublicRoute path={ROUTE_LOGIN} component={SLogin} />
          <PrivateRoute path={ROUTE_DASHBOARD} component={SDashboard} tabKey="dashboard" />
          <PrivateRoute path={ROUTE_TASK_LIST} component={STaskList} tabKey="task" />
          <PrivateRoute path={`${ROUTE_TASK_DETAIL}/:id`} component={STaskDetail} tabKey="task" />
          <PrivateRoute path={ROUTE_SETTING} component={SSetting} tabKey="setting" />
          <Route path={ROUTE_ERROR} exact component={SInternalServerError} />
          <Route path="*" component={SNotFound} />
        </Switch>
      </Router>
    </IntlProvider>
  );
}

export default App;
