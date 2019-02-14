import React from 'react';
import SortableTree from 'react-sortable-tree';
import { Layout, Button, Tabs } from 'antd';

import CCrawlerDefCollectorsItem from './CCrawlerDefCollectorsItem';
import CCrawlerDefCollectorsProcessors from './CCrawlerDefCollectorsProcessors';
import CCrawlerDefCollectorsFilters from './CCrawlerDefCollectorsFilters';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

class CCrawlerDefCollectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: '项目1' },
        { title: '项目2' },
        { title: '项目3' },
        { title: '项目4' },
        { title: '项目5', children: [{ title: '子项目1' }, { title: '子项目2' }, { title: '子项目3' }] },
      ],
    };
  }

  render() {
    return (
      <Layout>
        <Sider width={350} style={{ background: '#fff', height: '600px', borderRight: '1px solid #e3e3e3' }}>
          <div style={{ textAlign: 'center', padding: 6 }}>
            <Button type="primary" style={{ width: '100%' }}>
              追加项目
            </Button>
          </div>
          <SortableTree
            style={{ width: 340 }}
            rowHeight={50}
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
          />
        </Sider>
        <Content style={{ padding: '6', margin: 6, background: '#fff' }}>
          <CCrawlerDefCollectorsItem />
          <CCrawlerDefCollectorsProcessors />
          <CCrawlerDefCollectorsFilters />
        </Content>
      </Layout>
    );
  }
}

export default CCrawlerDefCollectors;
