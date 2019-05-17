import React from 'react';
import { Form, Input, Radio, Select } from 'antd';
import CCrawlerDefCollectorsProcessors from './CCrawlerDefCollectorsProcessors';
import CCrawlerDefCollectorsFilters from './CCrawlerDefCollectorsFilters';

const { Option } = Select;

class CCrawlerDefCollectorsItem extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
    };

    return (
      <div className="content collectors">
        <div className="area">
          {/*<span className="area-title">采集器</span>*/}
          <table className="area-table" border="1">
            <tbody>
              <tr>
                <th className="required">名字</th>
                <td>
                  <Input placeholder="名字" />
                </td>
              </tr>
              <tr>
                <th>Key</th>
                <td>
                  <Input placeholder="采集结果保存为json时，使用此key作为json对象的属性名。" />
                </td>
              </tr>
              <tr>
                <th>分页采集模式</th>
                <td>
                  <Radio.Group defaultValue="any">
                    <Radio.Button value="firstPage">首页</Radio.Button>
                    <Radio.Button value="lastPage">尾页</Radio.Button>
                    <Radio.Button value="everyPage">每一页</Radio.Button>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <th>分页采集结果连接符</th>
                <td>
                  <Input placeholder="分页采集结果连接符" />
                </td>
              </tr>
              <tr>
                <th>采集器的类型</th>
                <td>
                  <Select defaultValue="equals" style={{ width: '100%' }}>
                    <Option value="equals">从请求URL中采集数据的采集器</Option>
                    <Option value="notEquals">根据指定的css规则，从HTML文档中采集URL的采集器</Option>
                    <Option value="greaterThan">
                      根据指定的CSS选择器查找DOM节点，从DOM节点中提取指定的属性值的采集器
                    </Option>
                    <Option value="greaterEqualsThan">从HTTP头信息中提取数据的采集器</Option>
                    <Option value="lessThan">从HTTP响应文本中提取指定两个字符串之间的文本的采集器</Option>
                    <Option value="lessEqualsThan1">根据指定的路径从Json中提取属性值的采集器</Option>
                    <Option value="lessEqualsThan2">使用指定的javascript来从HTTP响应文本中提取数据的采集器</Option>
                    <Option value="lessEqualsThan3">返回指定函数的结果的采集器</Option>
                    <Option value="lessEqualsThan4">采集结果拼接采集器</Option>
                  </Select>
                  <h3>类型详细: </h3>
                  <Form>
                    <Form.Item label="从URL中要提取的指定部分" {...formItemLayout}>
                      <Select defaultValue="equals">
                        <Option value="equals">URL整体</Option>
                        <Option value="notEquals">协议</Option>
                        <Option value="greaterThan">端口号</Option>
                        <Option value="greaterEqualsThan">相对路径</Option>
                        <Option value="lessThan">相对路径分部</Option>
                        <Option value="lessEqualsThan">请求参数（同名参数有多个时，用半角逗号连接）</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="要提取的部分的下标" {...formItemLayout}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="要提取的请求参数的名称" {...formItemLayout}>
                      <Input />
                    </Form.Item>
                  </Form>
                </td>
              </tr>
              <tr>
                <th>过滤器</th>
                <td>
                  <CCrawlerDefCollectorsProcessors />
                </td>
              </tr>
              <tr>
                <th>后处理器</th>
                <td>
                  <CCrawlerDefCollectorsFilters />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CCrawlerDefCollectorsItem;
