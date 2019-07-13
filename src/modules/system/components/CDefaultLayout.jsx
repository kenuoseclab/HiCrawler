import React from 'react';
import * as PropTypes from 'prop-types';
import { Layout } from 'antd';

import CNav from './CNav';

const { Content } = Layout;

function CDefaultLayout(props) {
  const { tabKey, children } = props;
  return (
    <Layout>
      <CNav tabKey={tabKey} {...props} />
      <Layout className="main-wrapper">
        <Content className="clearfix layout-container">{children}</Content>
      </Layout>
    </Layout>
  );
}

CDefaultLayout.defaultProps = {
  children: null,
  tabKey: 'dashboard',
};

CDefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tabKey: PropTypes.string,
};

export default CDefaultLayout;
