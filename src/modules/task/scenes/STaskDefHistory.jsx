import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import * as PropTypes from 'prop-types';

import { API_TASK_HISTORY, ROUTE_TASK_LIST } from '../../../util/constants';
import { get } from '../../../util/fetch';
import { formatDate } from '../../../util/helper';

const firstPage = 1;
const limit = 20;

function STaskDefHistory(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(firstPage);

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

  async function fetch(page = firstPage) {
    const { id } = props.match.params;
    if (id) {
      try {
        const skip = (page - firstPage) * limit;
        const result = await get(`${API_TASK_HISTORY}/${id}?skip=${skip}&limit=${limit}`);
        setData(result.items);
        setTotal(result.total);
      } catch (e) {
        message.error('任务定义履历取得失败，请重新获取');
      }
    } else {
      props.history.push(ROUTE_TASK_LIST);
    }
  }

  useEffect(() => {
    fetch();
  }, [fetch]);

  function onPagination(page) {
    setCurrentPage(page);
    fetch(page);
  }

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
        onChange: onPagination,
      }}
    />
  );
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
