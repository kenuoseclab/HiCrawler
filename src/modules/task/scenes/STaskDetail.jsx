import React, { useState } from 'react';
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

function STaskDetail(props) {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});
  const [defaultContent, setDefaultContent] = useState(<STaskHistory />);

  async function fetch() {
    const { id } = props.match.params;
    if (id) {
      try {
        const taskDetail = await get(`${API_TASK_DETAIL}/${id}`);
        setDetail(taskDetail);
      } catch (e) {
        message.error('获取任务详细失败，返回到任务一览');
        props.history.push(ROUTE_TASK_LIST);
      }
    } else {
      props.history.push(ROUTE_TASK_LIST);
    }
  }

  async function handleMenuOnClick(e) {
    const { key } = e;
    switch (key) {
      case '1':
        setDefaultContent(<STaskHistory />);
        break;
      case '2':
        setDefaultContent(<STaskRun />);
        break;
      case '3':
        setDefaultContent(<STaskSetting />);
        break;
      case '4':
        setDefaultContent(<STaskDefHistory {...props} />);
        break;
      case '5':
        await fetch();
        setVisible(true);
        setDefaultContent(<span>任务定义</span>);
        break;
      case '6':
        setDefaultContent(<STaskDefImportExport {...props} />);
        break;
      default:
        setDefaultContent(<STaskHistory />);
        break;
    }
  }

  async function handleOk() {
    const { id } = props.match.params;
    if (id) {
      try {
        console.log(123, detail);
        await put(`${API_TASK_DETAIL}/${id}`, { detail });
      } catch (e) {
        message.error('任务编辑失败，请重新编辑');
      } finally {
        setVisible(false);
      }
    } else {
      props.history.push(ROUTE_TASK_LIST);
    }
  }

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
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} onClick={handleMenuOnClick}>
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
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okText="保存"
        cancelText="取消"
        width={900}
        className="task-modal"
      >
        <STaskDefEdit data={detail} itemOnChange={setDetail} />
      </Modal>
    </Layout>
  );
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
