import React from 'react';
import { Input, Switch, Radio, InputNumber } from 'antd';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class CCrawlerDefBasic extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="area">
          <span className="area-title">基本情报</span>
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
                  <Input placeholder="响应页面的字符集" />
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
                  <TextArea />
                  <span>&nbsp;&nbsp;请求间隔时间，单位：毫秒</span>
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
                  <div style={{ display: 'flex' }}>
                    <Input placeholder="http://username:password@xxx.com" />&nbsp;:&nbsp;
                    <Input placeholder="端口" style={{ width: 80 }} />
                  </div>
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
