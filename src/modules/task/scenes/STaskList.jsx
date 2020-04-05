import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Card, Modal, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import block from '../../../static/img/block.png';

import { ROUTE_TASK_DETAIL, API_TASK_LIST, API_TASK_NEW, API_TASK_DETAIL } from '../../../util/constants';
import { post, put, del, get } from '../../../util/fetch';
import { formatDate } from '../../../util/helper';

const { TextArea } = Input;
const { confirm } = Modal;

function STaskList(props) {
  const [visible, setVisible] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [editTaskId, setEditTaskId] = useState('');

  async function getCardList() {
    try {
      const items = await get(API_TASK_LIST);
      setCardItems(items || []);
    } catch (e) {
      message.error('任务获取失败，请重新取得。');
    }
  }

  function handleTaskDetailClick(id) {
    if (id) {
      props.history.push(`${ROUTE_TASK_DETAIL}/${id}`);
    }
  }

  useEffect(() => {
    getCardList();
  }, []);

  async function handleOk() {
    if (!name) {
      message.error('请输入任务名。');
    } else {
      try {
        if (editTaskId) {
          await put(`${API_TASK_DETAIL}/${editTaskId}`, { name, comment });
        } else {
          await post(API_TASK_NEW, { name, comment });
        }
        await getCardList();
      } catch (error) {
        message.error('创建任务失败，请重新创建。');
      } finally {
        setVisible(false);
      }
    }
  }

  function handleInputOnChange(e) {
    const { value } = e.target;
    const field = e.target.getAttribute('data-field');
    if (field === 'name') {
      setName(value);
    } else {
      setComment(value);
    }
  }

  function handleDeleteTask(id) {
    confirm({
      title: '删除任务？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      async onOk() {
        await del(`${API_TASK_DETAIL}/${id}`);
        await getCardList();
      },
      onCancel() {},
    });
  }

  function handleEditTask(c = {}) {
    setVisible(true);
    setEditTaskId(c.id || '');
    setName(c.name || '');
    setComment(c.comment || '');
  }

  return (
    <div className="task-list">
      {cardItems.map(c => {
        return (
          <Card className="task-card" key={c.id}>
            <div className="name" onClick={() => handleTaskDetailClick(c.id)}>
              {c.name}
            </div>
            <div className="operation">
              <span className="date">{formatDate(c.updateTime)}</span>
              <span className="btn">
                <EditOutlined onClick={() => handleEditTask(c)} />
                <DeleteOutlined onClick={() => handleDeleteTask(c.id)} />
              </span>
            </div>
          </Card>
        );
      })}
      <Card className="task-card" onClick={handleEditTask}>
        <img src={block} alt="空白" />
      </Card>
      <Modal
        title="新规任务"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okText={editTaskId ? '更新' : '追加'}
        cancelText="取消"
      >
        <Input placeholder="任务名" data-field="name" onChange={handleInputOnChange} value={name} />
        <div style={{ margin: '24px 0' }} />
        <TextArea
          data-field="comment"
          placeholder="备考"
          value={comment}
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={handleInputOnChange}
        />
      </Modal>
    </div>
  );
}

STaskList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

STaskList.defaultProps = {};

export default injectIntl(STaskList);
