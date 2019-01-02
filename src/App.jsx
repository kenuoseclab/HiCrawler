import 'babel-polyfill';
import 'antd/dist/antd.css';
import 'react-sortable-tree/style.css';
import React from 'react';
import PropTypes from 'prop-types';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';

import { IntlProvider, addLocaleData } from 'react-intl';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import CDefaultLayout from './modules/system/components/CDefaultLayout';
import SLogin from './modules/system/scenes/SLogin';
import SHome from './modules/system/scenes/SHome';
import SInternalServerError from './modules/system/scenes/SInternalServerError';
import SNotFound from './modules/system/scenes/SNotFound';
import SCrawlerAdd from './modules/crawler/scenes/SCrawlerAdd';

import './static/css/resetant.css';
import './static/css/index.css';
import './static/css/layout.css';
import './static/css/login.css';

import localZH from './locales/zh';
import localEN from './locales/en';
import localJA from './locales/ja';
import storage from './util/storage';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_CRAWLER_ADD, ROUTE_ERROR } from './util/constants';

addLocaleData([...zh, ...en, ...ja]);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        storage.isAuthenticatedUser() ? (
          <CDefaultLayout side={rest.side}>
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
      render={props => (!storage.isAuthenticatedUser() ? <Component {...props} /> : <Redirect to={ROUTE_HOME} />)}
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

class App extends React.Component {
  render() {
    return (
      <IntlProvider locale={navigator.language} messages={chooseLocale()}>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <PublicRoute path="/" exact component={SLogin} />
            <PublicRoute path={ROUTE_LOGIN} component={SLogin} />
            <PrivateRoute path={ROUTE_HOME} component={SHome} />
            <PrivateRoute path={ROUTE_CRAWLER_ADD} component={SCrawlerAdd} side={false} />
            <Route path={ROUTE_ERROR} exact component={SInternalServerError} />
            <Route path="*" component={SNotFound} />
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
