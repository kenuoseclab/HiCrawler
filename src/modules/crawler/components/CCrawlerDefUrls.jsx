import React from 'react';
import { Input, Radio } from 'antd';

import CCommonItem from '../../system/components/CCommonItem';
import CCrawlerDefUrlsForm from './CCrawlerDefUrlsForm';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class CCrawlerDefUrls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlType: 1,
      paramDetail: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onItemEdit = this.onItemEdit.bind(this);
  }

  onChange(e) {
    this.setState({
      urlType: e.target.value,
    });
  }

  onItemEdit(e) {
    this.setState({
      paramDetail: true,
    });
  }

  render() {
    const { urlType, paramDetail } = this.state;
    return (
      <div className="content">
        <div className="area">
          <table className="area-table" border="1">
            <tbody>
              <tr>
                <th className="required">URL集合类型</th>
                <td>
                  <RadioGroup onChange={this.onChange} value={urlType}>
                    <Radio value={1}>简单的URL集合</Radio>
                    <Radio value={2}>基于模板的URL集合</Radio>
                  </RadioGroup>
                </td>
              </tr>
              {urlType === 1 && (
                <tr>
                  <th>指定的URL(复数个时用换行区分)</th>
                  <td>
                    <TextArea />
                  </td>
                </tr>
              )}
              {urlType === 2 && (
                <tr>
                  <th>URL模板</th>
                  <td>
                    <CCommonItem multiInput onItemEdit={this.onItemEdit} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paramDetail && (
          <div className="area">
            <span className="area-title">URL参数</span>
            <table className="area-table" border="1">
              <tbody>
                <tr>
                  <th>URL</th>
                  <td>{`http://xxx/foo/{p1}/{p2}`}</td>
                </tr>
                <tr>
                  <th>参数(p1)</th>
                  <td>
                    <CCrawlerDefUrlsForm />
                  </td>
                </tr>
                <tr>
                  <th>参数(p2)</th>
                  <td>
                    <CCrawlerDefUrlsForm />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default CCrawlerDefUrls;
