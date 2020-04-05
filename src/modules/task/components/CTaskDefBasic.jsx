import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Input, Radio, Switch, InputNumber, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import CSelect from '../../system/components/CSelect';

import { DEF_CHARSET, DEF_USER_AGENT, FORM_ITEM_LAYOUT } from '../../../util/constants';

import CTaskDefBasicProxyForm from './CTaskDefBasicProxyForm';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

function CTaskDefBasic(props) {
  const { data, itemOnChange } = props;
  const [basicInfo, setBasicInfo] = useState(data || {});

  function handleBasicInfoChange(field, v) {
    const tempBasicInfo = { ...basicInfo };
    tempBasicInfo[field] = v;
    setBasicInfo(tempBasicInfo);

    if (props.itemOnChange) {
      itemOnChange({ ...data, ...tempBasicInfo });
    }
  }

  return (
    <Form {...FORM_ITEM_LAYOUT} className="task-edit">
      <Form.Item label="任务名" required>
        <Input value={basicInfo.name || ''} onChange={e => handleBasicInfoChange('name', e.target.value)} />
      </Form.Item>
      <Form.Item
        label={
          <span>
            遇404停止采集&nbsp;
            <Tooltip title="访问URL返回404时，是否停止采集">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Switch
          checkedChildren="开"
          unCheckedChildren="关"
          defaultChecked={basicInfo.stopAt404}
          onChange={e => handleBasicInfoChange('stopAt404', e)}
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            渲染页面&nbsp;
            <Tooltip title="对于返回的画面，是否执行渲染并执行js">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Switch
          checkedChildren="开"
          unCheckedChildren="关"
          defaultChecked={basicInfo.enableRender}
          onChange={e => handleBasicInfoChange('enableRender', e)}
        />
      </Form.Item>
      <Form.Item label="页面字符集" className="select">
        <CSelect
          options={DEF_CHARSET}
          defaultValue={basicInfo.charset || 'UTF-8'}
          onChange={e => handleBasicInfoChange('charset', e)}
        />
      </Form.Item>
      <Form.Item label="读取超时时间">
        <InputNumber value={basicInfo.readTimeout} onChange={e => handleBasicInfoChange('readTimeout', e)} />
        &nbsp;秒
      </Form.Item>
      <Form.Item label="请求间隔时间">
        <InputNumber value={basicInfo.requestInterval} onChange={e => handleBasicInfoChange('requestInterval', e)} />
        &nbsp;毫秒
      </Form.Item>
      <Form.Item label="UserAgent" className="select">
        <CSelect
          options={DEF_USER_AGENT}
          defaultValue={basicInfo.userAgent}
          onChange={e => handleBasicInfoChange('userAgent', e)}
        />
      </Form.Item>
      <Form.Item label="匹配模式">
        <RadioGroup
          value={basicInfo.collectorsMatchMode}
          onChange={e => handleBasicInfoChange('collectorsMatchMode', e.target.value)}
        >
          <Radio value="ANY">任意匹配</Radio>
          <Radio value="ALL">全部匹配</Radio>
        </RadioGroup>
      </Form.Item>
      <Form.Item label="请求头">
        <TextArea
          value={basicInfo.httpHeaders}
          placeholder="name1=value1&#10;name2=value2&#10;..."
          onChange={e => handleBasicInfoChange('httpHeaders', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="代理设定">
        <CTaskDefBasicProxyForm data={basicInfo.proxy} onChange={v => handleBasicInfoChange('proxy', v)} />
      </Form.Item>
    </Form>
  );
}

CTaskDefBasic.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CTaskDefBasic.defaultProps = {};

export default CTaskDefBasic;
