import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Radio, DatePicker, Row, InputNumber, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import CSelect from '../../system/components/CSelect';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const RadioGroup = Radio.Group;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

class CCrawlerDefUrlsTemplateForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateTemplateChange = this.handleDateTemplateChange.bind(this);
  }

  handleDateTemplateChange(field, v) {
    const { data } = this.props;
    switch (field) {
      case 'dateType':
        if (v === 'relative') {
          data.startDate = '';
          data.endDate = '';
        } else {
          data.startDateOffsetOperation = 'plus';
          data.startDateOffset = 1;
          data.endDateOffsetOperation = 'plus';
          data.endDateOffset = 1;
          data.startDate = new Date();
          data.endDate = new Date();
        }
        break;
      default:
        break;
    }

    data[field] = v;
    this.props.itemOnChange('dateForm', 'null', data);
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
    const { data } = this.props || {};
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="类型">
            <RadioGroup value={data.dateType} onChange={e => this.handleDateTemplateChange('dateType', e.target.value)}>
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
                  onChange={v => this.handleDateTemplateChange('startDateOffsetOperation', v)}
                >
                  <Option value="plus">+</Option>
                  <Option value="minus">-</Option>
                </Select>
                <InputNumber
                  style={{ width: '60px' }}
                  value={data.startDateOffset}
                  onChange={v => this.handleDateTemplateChange('startDateOffset', v)}
                />
                &nbsp;天
              </Row>
            )}
            {data.dateType === 'absolute' && (
              <DatePicker
                locale={locale}
                defaultValue={moment(data.startDate || new Date(), dateFormat)}
                format={dateFormat}
                onChange={v => this.handleDateTemplateChange('startDate', v)}
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
                  onChange={v => this.handleDateTemplateChange('endDateOffsetOperation', v)}
                >
                  <Option value="plus">+</Option>
                  <Option value="minus">-</Option>
                </Select>
                <InputNumber
                  style={{ width: '60px' }}
                  value={data.endDateOffset}
                  onChange={v => this.handleDateTemplateChange('endDateOffset', v)}
                />
                &nbsp;天
              </Row>
            )}
            {data.dateType === 'absolute' && (
              <DatePicker
                locale={locale}
                defaultValue={moment(data.endDate || new Date(), dateFormat)}
                format={dateFormat}
                onChange={v => this.handleDateTemplateChange('endDate', v)}
              />
            )}
          </Form.Item>
          <Form.Item label="格式" required className="url-template-date">
            <CSelect
              options={[{ id: '1', name: 'yyyyMM', value: 'yyyyMM' }, { name: 'yyyyMMdd', value: 'yyyyMMdd', id: '2' }]}
              defaultValue="yyyyMMdd"
              onChange={v => this.handleDateTemplateChange('format', v)}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

CCrawlerDefUrlsTemplateForm.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CCrawlerDefUrlsTemplateForm.defaultProps = {};

export default CCrawlerDefUrlsTemplateForm;
