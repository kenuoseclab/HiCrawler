import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Radio, DatePicker, Row, InputNumber, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import { FORM_ITEM_LAYOUT } from '../../../util/constants';

import CSelect from '../../system/components/CSelect';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const RadioGroup = Radio.Group;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

function CTaskDefUrlsTemplateForm(props) {
  const { data } = props || {};

  function handleDateTemplateChange(field, v) {
    switch (field) {
      case 'dateType':
        if (v === 'relative') {
          delete data.startDate;
          delete data.endDate;
          data.startDateOffsetOperation = 'plus';
          data.startDateOffset = 1;
          data.endDateOffsetOperation = 'plus';
          data.endDateOffset = 1;
          data.format = 'yyyyMMdd';
        } else {
          delete data.startDateOffsetOperation;
          delete data.startDateOffset;
          delete data.endDateOffsetOperation;
          delete data.endDateOffset;
          data.startDate = new Date();
          data.endDate = new Date();
          data.format = 'yyyyMMdd';
        }
        break;
      default:
        break;
    }

    data[field] = v;
    props.itemOnChange('dateForm', 'null', data);
  }

  return (
    <div>
      <Form {...FORM_ITEM_LAYOUT}>
        <Form.Item label="类型">
          <RadioGroup value={data.dateType} onChange={e => handleDateTemplateChange('dateType', e.target.value)}>
            <Radio value="relative">相对日期</Radio>
            <Radio value="absolute">绝对日期</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item label="开始日期" required>
          {data.dateType === 'relative' && (
            <Row style={{ display: 'flex' }}>
              今天&nbsp;
              <Select
                style={{ width: '50px' }}
                value={data.startDateOffsetOperation || 'plus'}
                onChange={v => handleDateTemplateChange('startDateOffsetOperation', v)}
              >
                <Option value="plus">+</Option>
                <Option value="minus">-</Option>
              </Select>
              <InputNumber
                style={{ width: '60px' }}
                value={data.startDateOffset}
                onChange={v => handleDateTemplateChange('startDateOffset', v)}
              />
              &nbsp;天
            </Row>
          )}
          {data.dateType === 'absolute' && (
            <DatePicker
              locale={locale}
              defaultValue={moment(data.startDate || new Date(), dateFormat)}
              format={dateFormat}
              onChange={v => handleDateTemplateChange('startDate', v)}
            />
          )}
        </Form.Item>
        <Form.Item label="结束日期" required>
          {data.dateType === 'relative' && (
            <Row style={{ display: 'flex' }}>
              今天&nbsp;
              <Select
                style={{ width: '50px' }}
                value={data.endDateOffsetOperation || 'plus'}
                onChange={v => handleDateTemplateChange('endDateOffsetOperation', v)}
              >
                <Option value="plus">+</Option>
                <Option value="minus">-</Option>
              </Select>
              <InputNumber
                style={{ width: '60px' }}
                value={data.endDateOffset}
                onChange={v => handleDateTemplateChange('endDateOffset', v)}
              />
              &nbsp;天
            </Row>
          )}
          {data.dateType === 'absolute' && (
            <DatePicker
              locale={locale}
              defaultValue={moment(data.endDate || new Date(), dateFormat)}
              format={dateFormat}
              onChange={v => handleDateTemplateChange('endDate', v)}
            />
          )}
        </Form.Item>
        <Form.Item label="格式" required className="url-template-date">
          <CSelect
            options={[{ id: '1', name: 'yyyyMM', value: 'yyyyMM' }, { name: 'yyyyMMdd', value: 'yyyyMMdd', id: '2' }]}
            defaultValue="yyyyMMdd"
            onChange={v => handleDateTemplateChange('format', v)}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

CTaskDefUrlsTemplateForm.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CTaskDefUrlsTemplateForm.defaultProps = {};

export default CTaskDefUrlsTemplateForm;
