import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { ROUTE_DASHBOARD } from '../../../util/constants';

const { Content, Footer, Sider } = Layout;

function SSetting() {
  const [defaultContent, setDefaultContent] = useState('个人情报');

  function handleMenuOnClick(menu) {
    setDefaultContent(menu.item.props.name);
  }

  return (
    <Layout className="task-detail">
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={ROUTE_DASHBOARD}>仪表板</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>设定</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="layout">
          <Sider width={200}>
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} onClick={handleMenuOnClick}>
              <Menu.Item key="1" name="个人情报">
                <Icon type="profile" />
                <span>个人情报</span>
              </Menu.Item>
              <Menu.Item key="2" name="账单">
                <Icon type="pay-circle" />
                <span>账单</span>
              </Menu.Item>
              <Menu.Item key="3" name="登录历史">
                <Icon type="safety" />
                <span>登录历史</span>
              </Menu.Item>
              <Menu.Item key="4" name="系统设定">
                <Icon type="setting" />
                <span>系统设定</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="content">{defaultContent}</Content>
        </Layout>
      </Content>
      <Footer>Copyright © 2019 HiDream Corporation. All Rights Reserved.</Footer>
    </Layout>
  );
}

SSetting.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

SSetting.defaultProps = {};

export default SSetting;
