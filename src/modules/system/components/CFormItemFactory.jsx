import React from 'react';
import moment from 'moment';
import Clipboard from 'react-clipboard.js';
import { Form, Input, InputNumber, Radio, Select, Switch, Tooltip, DatePicker } from 'antd';
import { QuestionCircleOutlined, CopyOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

import CTaskDefUrlsTemplateForm from '../../task/components/CTaskDefUrlsTemplateForm';

import { DATE_FORMAT } from '../../../util/constants';

import CSelect from './CSelect';

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
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    );
  }

  if (obj.link) {
    label = (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={obj.link} target="_blank">
        {obj.title}&nbsp;
      </a>
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
          className="input-copy"
          addonAfter={
            <Clipboard
              className="input-copy"
              data-clipboard-text={`{${data[obj.key] || ''}}`}
              title="拷贝 {参数名} 到粘贴板"
            >
              <CopyOutlined />
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
      <TextArea
        value={data[obj.key] || ''}
        onChange={e => event(obj.key, e.target.value, data)}
        placeholder={obj.placeholder}
        autosize={obj.autosize || false}
      />
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

export function CFormInputSelect(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <CSelect options={obj.data} value={data[obj.key]} onChange={v => event(obj.key, v, data)} />
    </Form.Item>
  );
}

export function CFormDate(obj, data, event) {
  return (
    <Form.Item key={obj.key} label={commonLabel(obj)} extra={obj.extra || ''} required={obj.required}>
      <DatePicker
        defaultValue={moment(data[obj.key] || new Date(), DATE_FORMAT)}
        format={DATE_FORMAT}
        locale={locale}
        onChange={(v, s) => event(obj.key, s, data)}
      />
    </Form.Item>
  );
}

function CFormItemsFactory(items, data = {}, event) {
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
      case 'inputSelect':
        result = CFormInputSelect(i, data, event);
        break;
      case 'date':
        result = CFormDate(i, data, event);
        break;
      case 'urlForm':
        result = <CTaskDefUrlsTemplateForm data={data} itemOnChange={event} key={i.key} />;
        break;
      default:
        break;
    }

    return result;
  });
}

export default CFormItemsFactory;
