import React from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTE_CRAWLER_ADD } from '../../../util/constants';

class SHome extends React.Component {
  render() {
    const dataSource = [
      {
        _id: '1',
        name: '网易',
        url: 'www.163.com',
        prevDate: '2018-12-10 12:20',
        nextDate: '2018-12-10 12:20',
      },
      {
        _id: '2',
        name: '新浪',
        url: 'www.sina.com.cn',
        prevDate: '2018-12-10 12:20',
        nextDate: '2018-12-10 12:20',
      },
      {
        _id: '3',
        name: '开源中国',
        url: 'www.oschina.net',
        prevDate: '2018-12-10 12:20',
        nextDate: '2018-12-10 12:20',
      },
    ];

    const columns = [
      {
        title: '站名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '上次执行时间',
        dataIndex: 'prevDate',
        key: 'prevDate',
      },
      {
        title: '下次次执行时间',
        dataIndex: 'nextDate',
        key: 'nextDate',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => {
          return (
            <span className="event-table-operation">
              <Button className="btn-list">
                <Link to={ROUTE_CRAWLER_ADD}>详细</Link>
              </Button>&nbsp;&nbsp;
              <Button className="btn-list">删除</Button>
            </span>
          );
        },
      },
    ];

    return (
      <div style={{ padding: '12px' }}>
        <div className="list-operation">
          <Button type="primary">
            <Link to={ROUTE_CRAWLER_ADD}>新建</Link>
          </Button>&nbsp;&nbsp;
          <Button type="primary">模板导入</Button>
        </div>
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

export default SHome;
