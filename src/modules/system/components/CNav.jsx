import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Menu, Dropdown, Icon, Row, Col } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import Storage from '../../../util/storage';
import { ROUTE_LOGIN } from '../../../util/constants';

const history = createHistory({ forceRefresh: true });

class CNav extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    Storage.clearLocalStorage();
    history.push(ROUTE_LOGIN);
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
      <Row className="nav" style={{ zIndex: '1001' }}>
        <Col span={8}>
          <h2 style={{ color: 'white' }}>壁虎</h2>
        </Col>
        <Col span={8} offset={8} className="name">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              <i className="icon-user" /> {name} <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

CNav.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CNav);
