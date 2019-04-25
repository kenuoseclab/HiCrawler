import React from 'react';
import { Layout, Button, Tabs } from 'antd';

import CCrawlerDefCollectorsItem from './CCrawlerDefCollectorsItem';
import CCrawlerDefCollectorsProcessors from './CCrawlerDefCollectorsProcessors';
import CCrawlerDefCollectorsFilters from './CCrawlerDefCollectorsFilters';
import CCollectorDropableList from './CCollectorDropableList';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

class CCrawlerDefCollectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Layout className="collectors-def">
        <Sider width={220} style={{ background: '#fff', height: '100%', borderRight: '1px solid #e3e3e3' }}>
          <CCollectorDropableList />
        </Sider>
        <Content style={{ background: '#fff' }}>
          <div>
            <CCrawlerDefCollectorsItem />
            <CCrawlerDefCollectorsProcessors />
            <CCrawlerDefCollectorsFilters />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default CCrawlerDefCollectors;
