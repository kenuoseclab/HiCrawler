import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import CNav from './CNav';

const { Content } = Layout;

class CDefaultLayout extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <CNav />
        <Layout style={{ background: '#fafafa' }}>
          <Content style={{ background: '#fafafa', padding: '0', margin: 0 }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

CDefaultLayout.defaultProps = {
  children: null,
  side: true,
};

CDefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  side: PropTypes.bool,
};

export default CDefaultLayout;
