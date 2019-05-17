import React from 'react';
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class CCrawlerDefCollectorsFilters extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    return (
      <div>
        <Form layout="inline">
          <Form.Item>
            <Select defaultValue="equals" style={{ width: 290 }}>
              <Option value="equals">判定字符串是否为空的布尔值函数</Option>
              <Option value="notEquals">判断字符串是否包含指定的字符串的布尔值函数</Option>
              <Option value="greaterThan">判断字符串是否等于指定的字符串的布尔值函数</Option>
              <Option value="greaterEqualsThan">判断字符串是否以指定的字符串为后缀的布尔值函数</Option>
              <Option value="lessThan">判定字符串是否非空的布尔值函数</Option>
              <Option value="lessEqualsThan">判定字符串是否不包含指定的字符串布尔值函数</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="small">
              追加
            </Button>
          </Form.Item>
        </Form>
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判定字符串是否为空的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判断字符串是否包含指定的字符串的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="匹配模式" {...formItemLayout}>*/}
        {/*<Radio.Group defaultValue="any">*/}
        {/*<Radio.Button value="any">任意</Radio.Button>*/}
        {/*<Radio.Button value="all">全部</Radio.Button>*/}
        {/*</Radio.Group>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判断字符串是否等于指定的字符串的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判断字符串是否以指定的字符串为后缀的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判定字符串是否非空的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判定字符串是否不包含指定的字符串布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判定输入的字符串是否不等于给定的字符串的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>判定字符串是否以给定的字符串为前缀的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>使用javascript开判定字符串是否满足要求的布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="字符串" {...formItemLayout}>*/}
        {/*<TextArea />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>简单的数值判定布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="判定符" {...formItemLayout}>*/}
        {/*<Select defaultValue="equals">*/}
        {/*<Option value="equals">等于</Option>*/}
        {/*<Option value="notEquals">不等于</Option>*/}
        {/*<Option value="greaterThan">大于</Option>*/}
        {/*<Option value="greaterEqualsThan">大于等于</Option>*/}
        {/*<Option value="lessThan">小于</Option>*/}
        {/*<Option value="lessEqualsThan">小于等于</Option>*/}
        {/*</Select>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="判定符右侧的数值" {...formItemLayout}>*/}
        {/*<Input />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
        {/*<div className="title">*/}
        {/*<Checkbox>简单的日期判定布尔值函数</Checkbox>*/}
        {/*</div>*/}
        {/*<Form>*/}
        {/*<Form.Item label="判定符" {...formItemLayout}>*/}
        {/*<Select defaultValue="equals">*/}
        {/*<Option value="equals">等于</Option>*/}
        {/*<Option value="notEquals">不等于</Option>*/}
        {/*<Option value="greaterThan">大于</Option>*/}
        {/*<Option value="greaterEqualsThan">大于等于</Option>*/}
        {/*<Option value="lessThan">小于</Option>*/}
        {/*<Option value="lessEqualsThan">小于等于</Option>*/}
        {/*</Select>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="判定符右侧的日期" {...formItemLayout}>*/}
        {/*<Input />*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="日期的格式" {...formItemLayout}>*/}
        {/*<Input />*/}
        {/*</Form.Item>*/}
        {/*</Form>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default CCrawlerDefCollectorsFilters;
