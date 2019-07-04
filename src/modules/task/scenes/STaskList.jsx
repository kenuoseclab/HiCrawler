import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Card, Modal, Input, message, Tag } from 'antd';

import block from '../../../static/img/block.png';

import { ROUTE_TASK_DETAIL, API_TASK_LIST, API_TASK_NEW } from '../../../util/constants';
import { post, get } from '../../../util/fetch';
import { formatDate } from '../../../util/helper';

const { TextArea } = Input;

class STaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      cardItems: [],
      name: '',
      comment: '',
    };
    this.handleTaskDetailClick = this.handleTaskDetailClick.bind(this);
    this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  handleTaskDetailClick(id) {
    if (id) {
      this.props.history.push(`${ROUTE_TASK_DETAIL}/${id}`);
    }
  }

  handleAddTaskClick() {
    this.setState({ visible: true });
  }

  async handleOk() {
    const { name, comment } = this.state;
    if (!name) {
      message.error('请输入任务名。');
    } else {
      try {
        await post(API_TASK_NEW, { name, comment });
        this.fetch();
      } catch (error) {
        message.error('创建任务失败，请重新创建。');
      } finally {
        this.setState({ visible: false });
      }
    }
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleInputOnChange(e) {
    const field = e.target.getAttribute('data-field');
    this.setState({ [field]: e.target.value });
  }

  async fetch() {
    try {
      const cardItems = await get(API_TASK_LIST);
      this.setState({ cardItems });
    } catch (e) {
      message.error('任务获取失败，请重新取得。');
    }
  }

  render() {
    const { cardItems } = this.state;
    return (
      <div className="task-list">
        <div className="task-tag">
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </div>
        {cardItems.map(c => {
          console.log(c);
          return (
            <Card className="task-card" key={c._id} onClick={() => this.handleTaskDetailClick(c._id)}>
              <div className="name">{c.basicInfo.name}</div>
              <div className="date">更新日：{formatDate(c.updatedAt)}</div>
            </Card>
          );
        })}
        <Card className="task-card" onClick={this.handleAddTaskClick}>
          <img src={block} alt="空白" />
        </Card>
        <Modal
          title="新规任务"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="追加"
          cancelText="取消"
        >
          <Input placeholder="任务名" data-field="name" onChange={this.handleInputOnChange} />
          <div style={{ margin: '24px 0' }} />
          <TextArea
            data-field="comment"
            placeholder="备考"
            autosize={{ minRows: 2, maxRows: 6 }}
            onChange={this.handleInputOnChange}
          />
        </Modal>
      </div>
    );
  }
}

STaskList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

STaskList.defaultProps = {};

export default injectIntl(STaskList);
