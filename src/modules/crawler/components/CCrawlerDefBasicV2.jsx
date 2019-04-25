import React from 'react';
import { Form, Input, Switch, Radio, InputNumber, Select } from 'antd';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const { Option } = Select;

class CCrawlerDefBasic extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    return (
      <div className="basic-info">
        <Form>
          <Form.Item label="Form Layout">
            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CCrawlerDefBasic;
