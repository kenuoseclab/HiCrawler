import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Input, Avatar } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import Storage from '../../../util/storage';
import { ROUTE_LOGIN, ROUTE_DASHBOARD, ROUTE_TASK_LIST, ROUTE_SETTING } from '../../../util/constants';

class CNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { history } = this.props;
    Storage.clearLocalStorage();
    history.push(ROUTE_LOGIN);
  }

  handleClick(e) {
    const { history } = this.props;
    if (e.key === 'dashboard') {
      history.push(ROUTE_DASHBOARD);
    }

    if (e.key === 'task') {
      history.push(ROUTE_TASK_LIST);
    }

    if (e.key === 'setting') {
      history.push(ROUTE_SETTING);
    }
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
              <Menu onClick={this.handleClick} selectedKeys={[this.props.tabKey]} mode="horizontal">
                <Menu.Item key="dashboard">仪表板</Menu.Item>
                <Menu.Item key="task">任务</Menu.Item>
                <Menu.Item key="setting">设定</Menu.Item>
                <Menu.Item key="template">模板市场</Menu.Item>
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
  tabKey: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

CNav.defaultProps = {
  tabKey: 'dashboard',
};

export default injectIntl(CNav);
