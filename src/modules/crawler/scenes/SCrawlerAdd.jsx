import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Tabs, Breadcrumb, Button } from 'antd';

import CCrawlerDefinition from '../components/CCrawlerDefinition';
import CCrawlerSetting from '../components/CCrawlerSetting';
import CCrawlerRun from '../components/CCrawlerRun';
import CCrawlerHistory from '../components/CCrawlerHistory';
import { ROUTE_HOME } from '../../../util/constants';

const { Content } = Layout;
const { TabPane } = Tabs;

class SCrawlerAdd extends React.Component {
  render() {
    const operations = <Button>保存</Button>;
    return (
      <Layout style={{ padding: '0 12px', height: '100%' }}>
        <Breadcrumb className="nav-bar">
          <Breadcrumb.Item>
            <Link to={ROUTE_HOME}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新规</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', margin: '50px 0 0 0', minHeight: 280 }}>
          <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
            <TabPane tab="定义" key="1">
              <CCrawlerDefinition />
            </TabPane>
            <TabPane tab="设置" key="2">
              <CCrawlerSetting />
            </TabPane>
            <TabPane tab="执行" key="3">
              <CCrawlerRun />
            </TabPane>
            <TabPane tab="履历" key="4">
              <CCrawlerHistory />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}

export default SCrawlerAdd;
