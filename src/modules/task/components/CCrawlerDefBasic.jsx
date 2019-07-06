import React from 'react';
import * as PropTypes from 'prop-types';
import { Form, Input, Radio, Switch, InputNumber, Tooltip, Icon } from 'antd';

import CSelect from '../../system/components/CSelect';

import { DEF_CHARSET, DEF_USER_AGENT } from '../../../util/constants';

import CTaskProxyForm from './CTaskProxyForm';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class CCrawlerDefBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicInfo: this.props.data.basicInfo || {},
    };

    this.handleBasicInfoChange = this.handleBasicInfoChange.bind(this);
  }

  handleBasicInfoChange(field, v) {
    const { basicInfo } = this.state;
    basicInfo[field] = v;
    this.setState({ basicInfo });
    if (this.props.itemOnChange) {
      const { data } = this.props;
      data.basicInfo = basicInfo;
      this.props.itemOnChange({ detail: data });
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const { basicInfo } = this.state;

    return (
      <Form {...formItemLayout} className="task-edit">
        <Form.Item label="任务名" required>
          <Input value={basicInfo.name || ''} onChange={e => this.handleBasicInfoChange('name', e.target.value)} />
        </Form.Item>
        <Form.Item
          label={
            <span>
              遇404停止采集&nbsp;
              <Tooltip title="访问URL返回404时，是否停止采集">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={basicInfo.stopAt404}
            onChange={e => this.handleBasicInfoChange('stopAt404', e)}
          />
        </Form.Item>
        <Form.Item
          label={
            <span>
              渲染页面&nbsp;
              <Tooltip title="对于返回的画面，是否执行渲染并执行js">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={basicInfo.enableRender}
            onChange={e => this.handleBasicInfoChange('enableRender', e)}
          />
        </Form.Item>
        <Form.Item label="页面字符集" className="select">
          <CSelect
            options={DEF_CHARSET}
            defaultValue={basicInfo.charset}
            onChange={e => this.handleBasicInfoChange('charset', e)}
          />
        </Form.Item>
        <Form.Item label="读取超时时间" extra="请求读取的超时时间，单位：秒">
          <InputNumber value={basicInfo.readTimeout} onChange={e => this.handleBasicInfoChange('readTimeout', e)} />
        </Form.Item>
        <Form.Item label="请求间隔时间" extra="请求间隔时间，单位：毫秒">
          <InputNumber
            value={basicInfo.requestInterval}
            onChange={e => this.handleBasicInfoChange('requestInterval', e)}
          />
        </Form.Item>
        <Form.Item label="UserAgent" className="select">
          <CSelect
            options={DEF_USER_AGENT}
            defaultValue={basicInfo.userAgent}
            onChange={e => this.handleBasicInfoChange('userAgent', e)}
          />
        </Form.Item>
        <Form.Item label="匹配模式">
          <RadioGroup
            value={basicInfo.collectorsMatchMode}
            onChange={e => this.handleBasicInfoChange('collectorsMatchMode', e.target.value)}
          >
            <Radio value="ANY">任意匹配</Radio>
            <Radio value="ALL">全部匹配</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item label="请求头">
          <TextArea
            value={basicInfo.httpHeaders}
            placeholder="name1=value1&#10;name2=value2&#10;..."
            onChange={e => this.handleBasicInfoChange('httpHeaders', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="代理设定">
          <CTaskProxyForm data={basicInfo.proxy} onChange={v => this.handleBasicInfoChange('proxy', v)} />
        </Form.Item>
      </Form>
    );
  }
}

CCrawlerDefBasic.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CCrawlerDefBasic.defaultProps = {};

export default CCrawlerDefBasic;
