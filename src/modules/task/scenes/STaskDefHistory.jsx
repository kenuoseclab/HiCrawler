import React from 'react';
import { message, Table } from 'antd';
import PropTypes from 'prop-types';

import { API_TASK_HISTORY, ROUTE_TASK_LIST } from '../../../util/constants';
import { get } from '../../../util/fetch';
import { formatDate } from '../../../util/helper';

const firstPage = 1;
const limit = 20;

class STaskDefHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      currentPage: firstPage,
    };

    this.onPagination = this.onPagination.bind(this);
  }

  componentDidMount() {
    this.fetch(firstPage);
  }

  onPagination(page) {
    this.setState({ currentPage: page });
    this.fetch(page);
  }

  async fetch(page) {
    const { id } = this.props.match.params;
    if (id) {
      try {
        const skip = (page - firstPage) * limit;
        const result = await get(`${API_TASK_HISTORY}/${id}?skip=${skip}&limit=${limit}`);
        this.setState({ total: result.total, data: result.items });
      } catch (e) {
        message.error('任务定义履历取得失败，请重新获取');
      }
    } else {
      this.props.history.push(ROUTE_TASK_LIST);
    }
  }

  render() {
    const { data, total, currentPage } = this.state;

    const columns = [
      {
        title: '更新日',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => {
          return formatDate(text);
        },
      },
    ];

    return (
      <Table
        dataSource={data}
        columns={columns}
        rowKey={record => record._id}
        pagination={{
          total,
          current: currentPage,
          pageSize: limit,
          size: 'small',
          onChange: this.onPagination,
        }}
      />
    );
  }
}

STaskDefHistory.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

STaskDefHistory.defaultProps = {};

export default STaskDefHistory;
