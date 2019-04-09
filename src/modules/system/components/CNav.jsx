import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Menu, Dropdown, Icon, Input, Avatar } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import Storage from '../../../util/storage';
import { ROUTE_LOGIN } from '../../../util/constants';

const history = createHistory({ forceRefresh: true });

class CNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 'mail',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    Storage.clearLocalStorage();
    history.push(ROUTE_LOGIN);
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {
    const { formatMessage } = this.props.intl;

    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item>{formatMessage({ id: 'logout.button.name' })}</Menu.Item>
      </Menu>
    );

    const user = Storage.getUser() || { name: '' };
    const name = `${user.name}`;

    return (
      <div className="nav">
        <div className="clearfix layout-container">
          <div className="logo">壁虎・采集器</div>
          <div className="left">
            <div className="search">
              <Input placeholder="检索" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </div>
            <div className="menu">
              <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="mail">规则定义</Menu.Item>
                <Menu.Item key="app">统计</Menu.Item>
              </Menu>
            </div>
          </div>
          <div className="right">
            <Avatar icon="user" />&nbsp;&nbsp;
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                <i className="icon-user" /> {name} <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

CNav.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CNav);
