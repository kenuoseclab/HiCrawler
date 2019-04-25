import React from 'react';
import { Form, Input, Switch, Radio, InputNumber, Select } from 'antd';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const { Option } = Select;

class CCrawlerDefBasic extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div className="content">
        <div className="area">
          <table className="area-table" border="1">
            <tbody>
              <tr>
                <th className="required">任务名</th>
                <td>
                  <Input placeholder="任务名" />
                </td>
              </tr>
              <tr>
                <th>是否中断</th>
                <td>
                  <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                  <span>&nbsp;&nbsp;访问URL返回404时，是否停止采集</span>
                </td>
              </tr>
              <tr>
                <th>是否渲染</th>
                <td>
                  <Switch checkedChildren="开" unCheckedChildren="关" />
                  <span>&nbsp;&nbsp;对于返回的画面，是否执行渲染并执行js</span>
                </td>
              </tr>
              <tr>
                <th>字符集</th>
                <td>
                  <div style={{ display: 'flex' }}>
                    <Select defaultValue="equals" style={{ width: 100 }}>
                      <Option value="equals">UTF-8</Option>
                    </Select>
                    <Input placeholder="响应页面的字符集" value="UTF-8" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>超时时间</th>
                <td>
                  <InputNumber />
                  <span>&nbsp;&nbsp;请求读取的超时时间，单位：秒</span>
                </td>
              </tr>
              <tr>
                <th>间隔时间</th>
                <td>
                  <InputNumber />
                  <span>&nbsp;&nbsp;请求间隔时间，单位：毫秒</span>
                </td>
              </tr>
              <tr>
                <th>User-Agent</th>
                <td>
                  <Select defaultValue="equals" style={{ width: 200 }}>
                    <Option value="equals">Chrome Mac</Option>
                    <Option value="notEquals">Chrome Windows</Option>
                    <Option value="greaterThan">Firefox Mac</Option>
                    <Option value="greaterEqualsThan">Firefox Windows</Option>
                    <Option value="lessThan">Internet Explorer</Option>
                    <Option value="lessEqualsThan">Edge</Option>
                  </Select>
                  <TextArea value="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36" />
                </td>
              </tr>
              <tr>
                <th>匹配模式</th>
                <td>
                  <RadioGroup value="1">
                    <Radio value={1}>任意匹配</Radio>
                    <Radio value={2}>全部匹配</Radio>
                  </RadioGroup>
                </td>
              </tr>
              <tr>
                <th>请求头设定</th>
                <td>
                  <TextArea />
                </td>
              </tr>
              <tr>
                <th>代理设定</th>
                <td>
                  <Form>
                    <Form.Item label="代理服务器地址" {...formItemLayout}>
                      <div style={{ display: 'flex' }}>
                        <Input placeholder="服务器地址" />&nbsp;:&nbsp;
                        <Input placeholder="端口" style={{ width: 80 }} />
                      </div>
                    </Form.Item>
                    <Form.Item label="用户名" {...formItemLayout}>
                      <Input placeholder="用户名" />
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                      <Input placeholder="密码" />
                    </Form.Item>
                  </Form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CCrawlerDefBasic;
