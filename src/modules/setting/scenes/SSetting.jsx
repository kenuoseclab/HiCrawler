import React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { ROUTE_DASHBOARD } from '../../../util/constants';

const { Content, Footer, Sider } = Layout;

class SSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultContent: 'lll',
    };

    this.handleMenuOnClick = this.handleMenuOnClick.bind(this);
  }

  componentDidMount() {}

  handleMenuOnClick(e) {
    // const { key } = e;
    // switch (key) {
    //   case '1':
    //     this.setState({defaultContent: <STaskHistory />});
    //     break;
    //   case '2':
    //     this.setState({defaultContent: <STaskRun />});
    //     break;
    //   case '3':
    //     this.setState({defaultContent: <STaskSetting />});
    //     break;
    //   case '4':
    //     this.setState({defaultContent: <STaskDefHistory />});
    //     break;
    //   case '5':
    //     this.setState({visible: true});
    //     break;
    //   case '6':
    //     this.setState({defaultContent: <STaskDefImportExport />});
    //     break;
    //   default:
    //     this.setState({defaultContent: <STaskHistory />});
    //     break;
    // }
  }

  render() {
    const { defaultContent } = this.state;
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
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onClick={this.handleMenuOnClick}
              >
                <Menu.Item key="1">
                  <Icon type="profile" />
                  <span>个人情报</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="pay-circle" />
                  <span>账单</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="safety" />
                  <span>登录历史</span>
                </Menu.Item>
                <Menu.Item key="4">
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
