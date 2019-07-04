import React from 'react';
import * as PropTypes from 'prop-types';
import { Layout } from 'antd';

import CNav from './CNav';

const { Content } = Layout;

class CDefaultLayout extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <CNav tabKey={this.props.tabKey} {...this.props} />
        <Layout className="main-wrapper">
          <Content className="clearfix layout-container">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
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
