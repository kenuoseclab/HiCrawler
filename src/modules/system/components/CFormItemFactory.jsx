import React from 'react';
import Clipboard from 'react-clipboard.js';

import { Form, Input, InputNumber, Radio, Select, Switch, Tooltip, Icon } from 'antd';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const { Option } = Select;

function commonLabel(obj) {
  let label = obj.title;
  if (obj.desc) {
    label = (
      <span>
        {obj.title}&nbsp;
        <Tooltip title={obj.desc}>
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    );
  }

  return label;
}

export function CFormInput(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      {!obj.copy && <Input value={data[obj.key] || ''} onChange={e => event(obj.key, e.target.value, data)} />}
      {obj.copy && (
        <Input
          addonAfter={
            <Clipboard className="input-copy" data-clipboard-text={`{${data[obj.key] || ''}}`}>
              <Icon type="copy" />
            </Clipboard>
          }
          value={data[obj.key] || ''}
          onChange={e => event(obj.key, e.target.value, data)}
        />
      )}
    </Form.Item>
  );
}

export function CFormInputNumber(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <InputNumber value={data[obj.key] || ''} onChange={v => event(obj.key, v, data)} />
    </Form.Item>
  );
}

export function CFormSwitch(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <Switch
        checkedChildren="开"
        unCheckedChildren="关"
        checked={data[obj.key] || false}
        onChange={v => event(obj.key, v, data)}
      />
    </Form.Item>
  );
}

export function CFormTextArea(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <TextArea value={data[obj.key] || ''} onChange={e => event(obj.key, e.target.value, data)} />
    </Form.Item>
  );
}

export function CFormRadio(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <RadioGroup value={data[obj.key]} onChange={e => event(obj.key, e.target.value, data)}>
        {obj.data.map(d => (
          <Radio key={d.value} value={d.value}>
            {d.name}
          </Radio>
        ))}
      </RadioGroup>
    </Form.Item>
  );
}

export function CFormSelect(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <Select value={data[obj.key]} onChange={v => event(obj.key, v, data)}>
        {obj.data.map(d => (
          <Option key={d.value} value={d.value}>
            {d.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default function CFormItemsFactory(items, data = {}, event) {
  return items.map(i => {
    let result;
    switch (i.type) {
      case 'input':
        result = CFormInput(i, data, event);
        break;
      case 'number':
        result = CFormInputNumber(i, data, event);
        break;
      case 'switch':
        result = CFormSwitch(i, data, event);
        break;
      case 'textarea':
        result = CFormTextArea(i, data, event);
        break;
      case 'radio':
        result = CFormRadio(i, data, event);
        break;
      case 'select':
        result = CFormSelect(i, data, event);
        break;
      default:
        break;
    }

    return result;
  });
}