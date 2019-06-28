import React from 'react';
import { Form, Input, Radio } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class CCrawlerDefUrls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: this.props.data.urls || {},
    };

    this.handleUrlsChange = this.handleUrlsChange.bind(this);
  }

  handleUrlsChange(field, v) {
    const { urls } = this.state;
    urls[field] = v;
    this.setState({ urls });
    if (this.props.itemOnChange) {
      const { data } = this.props;
      data.urls = urls;
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

    const { urls } = this.state;

    return (
      <Form {...formItemLayout} className="task-edit">
        <Form.Item label="类型">
          <RadioGroup value={urls.type} onChange={e => this.handleUrlsChange('type', e.target.value)}>
            <Radio value="PlainUrlSet">简单的URL集合</Radio>
            <Radio value="TemperatedUrlSet">基于模板的URL集合</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item label="URL" extra="复数个时用换行区分">
          <TextArea
            autosize={{ minRows: 6 }}
            value={urls.url}
            onChange={e => this.handleUrlsChange('url', e.target.value)}
          />
        </Form.Item>
      </Form>
    );
  }
}

CCrawlerDefUrls.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CCrawlerDefUrls.defaultProps = {};

export default CCrawlerDefUrls;
