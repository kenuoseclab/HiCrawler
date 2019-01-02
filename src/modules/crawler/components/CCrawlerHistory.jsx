import React from 'react';
import moment from 'moment';
import { Button, Table } from 'antd';

import Helper from '../../../util/helper';

class CCrawlerHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataSource = [];
    for (let i = 0; i < 30; i++) {
      const tempObj = {
        _id: i + 1,
        date: moment().format('YYYY-MM-DD hh:mm'),
        time: Math.ceil(Math.random() * 1000),
        urls: Math.ceil(Math.random() * 100),
        size: Math.ceil(Math.random() * 100000),
      };
      dataSource.push(tempObj);
    }

    const columns = [
      {
        title: '执行日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '执行时常',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'URL数',
        dataIndex: 'urls',
        key: 'urls',
      },
      {
        title: '数据量',
        dataIndex: 'size',
        key: 'size',
        render: text => {
          return <span>{Helper.bytesToSize(text)}</span>;
        },
      },
      {
        title: '结果',
        dataIndex: 'operation',
        key: 'operation',
        render: () => {
          return (
            <span className="event-table-operation">
              <Button className="btn-list">结果出力</Button>
            </span>
          );
        },
      },
    ];
    return (
      <div className="content-history">
        <Table
          className="list-table"
          columns={columns}
          rowKey={record => {
            return record._id;
          }}
          dataSource={dataSource}
        />
      </div>
    );
  }
}

export default CCrawlerHistory;
