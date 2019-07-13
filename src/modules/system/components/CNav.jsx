import React from 'react';
import * as PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Input, Avatar } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import Storage from '../../../util/storage';
import { ROUTE_LOGIN, ROUTE_DASHBOARD, ROUTE_TASK_LIST, ROUTE_SETTING } from '../../../util/constants';

function CNav(props) {
  const { history, tabKey, intl } = props;
  const { formatMessage } = intl;
  const user = Storage.getUser() || { name: '' };
  const name = `${user.name}`;

  function handleLogout() {
    Storage.clearLocalStorage();
    history.push(ROUTE_LOGIN);
  }

  function handleClick(e) {
    switch (e.key) {
      case 'dashboard':
        history.push(ROUTE_DASHBOARD);
        break;
      case 'task':
        history.push(ROUTE_TASK_LIST);
        break;
      case 'setting':
        history.push(ROUTE_SETTING);
        break;
      default:
        history.push(ROUTE_DASHBOARD);
        break;
    }
  }

  const menu = (
    <Menu onClick={handleLogout}>
      <Menu.Item>{formatMessage({ id: 'logout.button.name' })}</Menu.Item>
    </Menu>
  );

  return (
    <div className="nav">
      <div className="clearfix layout-container">
        <div className="logo">壁虎・采集器</div>
        <div className="left">
          <div className="search">
            <Input placeholder="检索" prefix={<Icon type="search" />} />
          </div>
          <div className="menu">
            <Menu onClick={handleClick} selectedKeys={[tabKey]} mode="horizontal">
              <Menu.Item key="dashboard">仪表板</Menu.Item>
              <Menu.Item key="task">任务</Menu.Item>
              <Menu.Item key="setting">设定</Menu.Item>
              <Menu.Item key="template">模板市场</Menu.Item>
            </Menu>
          </div>
        </div>
        <div className="right">
          <Avatar icon="user" />
          &nbsp;&nbsp;
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
