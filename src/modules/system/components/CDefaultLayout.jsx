import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import CNav from './CNav';
import CSider from './CSider';

const { Header, Content, Sider } = Layout;

class CDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header>
          <CNav />
        </Header>
        <Layout>
          {this.props.side && (
            <Sider width={200} style={{ background: '#fff' }}>
              <CSider />
            </Sider>
          )}
          <Content style={{ background: '#fff', padding: '0', margin: 0 }}>{this.props.children}</Content>
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
