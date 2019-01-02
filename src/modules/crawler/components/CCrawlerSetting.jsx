import React from 'react';
import { Input, Radio, Button } from 'antd';

const RadioGroup = Radio.Group;

class CCrawlerSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlType: 1,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      urlType: e.target.value,
    });
  }

  render() {
    const { urlType } = this.state;
    return (
      <div className="content">
        <div className="area">
          <span className="area-title">基本设置</span>
          <table className="area-table" border="1">
            <tbody>
              <tr>
                <th>执行</th>
                <td>
                  <RadioGroup onChange={this.onChange} value={urlType}>
                    <Radio value={1}>手动</Radio>
                    <Radio value={2}>定时</Radio>
                  </RadioGroup>
                </td>
              </tr>
              {urlType === 2 && (
                <tr>
                  <th>URL模板</th>
                  <td>
                    <Input placeholder="执行时间" />
                    <RadioGroup>
                      <Radio value={1}>每小时</Radio>
                      <Radio value={2}>每天</Radio>
                      <Radio value={2}>每周</Radio>
                      <Radio value={2}>每月</Radio>
                    </RadioGroup>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="area-operation">
          <Button type="primary">保存</Button>
        </div>
      </div>
    );
  }
}

export default CCrawlerSetting;
