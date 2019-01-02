import React from 'react';
import { Form, Input, Radio } from 'antd';

const { TextArea } = Input;

class CCrawlerDefUrlsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'sequence',
    };

    this.handleFormLayoutChange = this.handleFormLayoutChange.bind(this);
  }

  handleFormLayoutChange(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const { type } = this.state;

    return (
      <div>
        <Form>
          <Form.Item label="参数类型" {...formItemLayout}>
            <Radio.Group defaultValue="sequence" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="sequence">序列型</Radio.Button>
              <Radio.Button value="enum">枚举型</Radio.Button>
              <Radio.Button value="date">日期型</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {type === 'sequence' && (
            <div>
              <Form.Item label="初始值" {...formItemLayout}>
                <Input placeholder="初始值" />
              </Form.Item>
              <Form.Item label="最大值" {...formItemLayout}>
                <Input placeholder="最大值" />
              </Form.Item>
              <Form.Item label="步增" {...formItemLayout}>
                <Input placeholder="步增" />
              </Form.Item>
              <Form.Item label="补齐后长度" {...formItemLayout}>
                <Input placeholder="补齐后长度（左端补0）" />
              </Form.Item>
            </div>
          )}
          {type === 'enum' && (
            <Form.Item label="枚举值集合" {...formItemLayout}>
              <TextArea />
            </Form.Item>
          )}
          {type === 'date' && (
            <div>
              <Form.Item label="开始日期" {...formItemLayout}>
                <Input placeholder="格式为yyyy-MM-dd" />
              </Form.Item>
              <Form.Item label="偏移天数" {...formItemLayout}>
                <Input placeholder="偏移天数" />
              </Form.Item>
              <Form.Item label="结束日期" {...formItemLayout}>
                <Input placeholder="格式为yyyy-MM-dd" />
              </Form.Item>
              <Form.Item label="输出格式" {...formItemLayout}>
                <Input placeholder="如yyyyMMdd" />
              </Form.Item>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default CCrawlerDefUrlsForm;
