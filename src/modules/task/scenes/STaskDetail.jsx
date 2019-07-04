import React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, message, Modal } from 'antd';

import { ROUTE_TASK_LIST, API_TASK_DETAIL } from '../../../util/constants';

import { get, put } from '../../../util/fetch';

import STaskHistory from './STaskHistory';
import STaskRun from './STaskRun';
import STaskSetting from './STaskSetting';
import STaskDefHistory from './STaskDefHistory';
import STaskDefEdit from './STaskDefEdit';
import STaskDefImportExport from './STaskDefImportExport';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class STaskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      defaultContent: <STaskHistory />,
      visible: false,
    };

    this.handleMenuOnClick = this.handleMenuOnClick.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.handleItemOnChange = this.handleItemOnChange.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  handleMenuOnClick(e) {
    const { key } = e;
    switch (key) {
      case '1':
        this.setState({ defaultContent: <STaskHistory /> });
        break;
      case '2':
        this.setState({ defaultContent: <STaskRun /> });
        break;
      case '3':
        this.setState({ defaultContent: <STaskSetting /> });
        break;
      case '4':
        this.setState({ defaultContent: <STaskDefHistory {...this.props} /> });
        break;
      case '5':
        this.setState({ visible: true });
        break;
      case '6':
        this.setState({ defaultContent: <STaskDefImportExport /> });
        break;
      default:
        this.setState({ defaultContent: <STaskHistory /> });
        break;
    }
  }

  async handleOk() {
    const { id } = this.props.match.params;
    const { detail } = this.state;
    if (id) {
      try {
        await put(`${API_TASK_DETAIL}/${id}`, { detail });
      } catch (e) {
        message.error('任务编辑失败，请重新编辑');
      } finally {
        this.fetch();
        this.setState({ visible: false });
      }
    } else {
      this.props.history.push(ROUTE_TASK_LIST);
    }
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleItemOnChange(detail) {
    console.log(123, detail);
    this.setState(detail);
  }

  async fetch() {
    const { id } = this.props.match.params;
    if (id) {
      try {
        const detail = await get(`${API_TASK_DETAIL}/${id}`);
        this.setState({ detail });
      } catch (e) {
        message.error('获取任务详细失败，返回到任务一览');
        this.props.history.push(ROUTE_TASK_LIST);
      }
    } else {
      this.props.history.push(ROUTE_TASK_LIST);
    }
  }

  render() {
    const { detail, defaultContent } = this.state;
    return (
      <Layout className="task-detail">
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={ROUTE_TASK_LIST}>任务一览</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{detail && detail.basicInfo && detail.basicInfo.name}</Breadcrumb.Item>
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
                  <Icon type="history" />
                  <span>履历</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="play-circle" />
                  <span>执行</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="setting" />
                  <span>设定</span>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="project" /> 定义
                    </span>
                  }
                >
                  <Menu.Item key="4">变更历史</Menu.Item>
                  <Menu.Item key="5">编辑</Menu.Item>
                  <Menu.Item key="6">导入\导出</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="content">{defaultContent}</Content>
          </Layout>
        </Content>
        <Footer>Copyright © 2019 HiDream Corporation. All Rights Reserved.</Footer>
        <Modal
          title="编辑任务"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
          cancelText="取消"
          width={900}
          className="task-modal"
        >
          <STaskDefEdit data={this.state.detail} itemOnChange={this.handleItemOnChange} />
        </Modal>
      </Layout>
    );
  }
}

STaskDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

STaskDetail.defaultProps = {};

export default STaskDetail;
