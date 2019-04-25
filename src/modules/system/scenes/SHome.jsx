import React from 'react';
import { Row, Col, Icon, Menu, Tabs } from 'antd';
import CCrawlerDefinition from '../../crawler/components/CCrawlerDefinition';
import CCrawlerSetting from '../../crawler/components/CCrawlerSetting';
import CCrawlerRun from '../../crawler/components/CCrawlerRun';
import CCrawlerHistory from '../../crawler/components/CCrawlerHistory';

const { TabPane } = Tabs;
const { SubMenu } = Menu;

class SHome extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <Row style={{ height: '100%' }}>
        <Col span={4} style={{ borderRight: '1px solid #e8e8e8', height: '100%' }}>
          <div className="home-side">
            <Row>
              <Col span={18} style={{ textAlign: 'left' }}>
                <span>分类</span>
              </Col>
              <Col span={6}>
                <Icon type="folder-add" style={{ fontSize: '20px' }} />
              </Col>
              {/*<Col span={4}>*/}
              {/*<Icon type="sort-ascending" />*/}
              {/*</Col>*/}
            </Row>
            <span className="line" />
          </div>
          <div className="home-menu">
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="folder" />
                    <span>电影</span>
                  </span>
                }
              >
                <Menu.Item key="1">爱奇艺</Menu.Item>
                <Menu.Item key="2">腾讯</Menu.Item>
                <Menu.Item key="3">优酷</Menu.Item>
                <Menu.Item key="4">youtube</Menu.Item>
              </SubMenu>
              {/*<Menu.Divider />*/}
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="folder" />
                    <span>图片</span>
                  </span>
                }
              >
                <Menu.Item key="5">趣图</Menu.Item>
                <Menu.Item key="6">豆瓣</Menu.Item>
                <Menu.Item key="7">网库</Menu.Item>
                <Menu.Item key="8">dribbble</Menu.Item>
              </SubMenu>
              {/*<Menu.Divider />*/}
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="folder" />
                    <span>音乐</span>
                  </span>
                }
              >
                <Menu.Item key="9">网易云</Menu.Item>
                <Menu.Item key="10">百度</Menu.Item>
                <Menu.Item key="11">腾讯</Menu.Item>
                <Menu.Item key="12">虾米</Menu.Item>
              </SubMenu>
              {/*<Menu.Divider />*/}
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="folder" />
                    <span>书</span>
                  </span>
                }
              >
                <Menu.Item key="9">简书</Menu.Item>
                <Menu.Item key="10">当当网</Menu.Item>
                <Menu.Item key="11">京东</Menu.Item>
                <Menu.Item key="12">亚马逊</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Col>
        <Col span={20}>
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
            className="home-content"
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                <Tabs defaultActiveKey="1" animated={false} size="small">
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
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default SHome;
