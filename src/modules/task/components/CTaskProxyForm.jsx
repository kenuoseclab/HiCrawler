import React from 'react';
import * as PropTypes from 'prop-types';
import { Checkbox, Form, Input } from 'antd';

class CTaskProxyForm extends React.Component {
  constructor(props) {
    super(props);
    const proxy = this.props.data || {};
    this.state = {
      proxy,
      disabled: !(proxy.userName && proxy.password),
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
  }

  handleInputOnChange(field, v) {
    const { proxy } = this.state;
    proxy[field] = v;
    this.props.onChange(proxy);
    this.setState(proxy);
  }

  handleCheckboxOnChange(e) {
    const { proxy } = this.state;
    if (!e.target.checked) {
      proxy.userName = '';
      proxy.password = '';
    }
    this.props.onChange(proxy);
    this.setState({ disabled: !e.target.checked, proxy });
  }

  render() {
    const { proxy, disabled } = this.state;
    return (
      <div className="proxy-form">
        <div className="server">
          <Input
            className="address"
            placeholder="服务器"
            value={proxy.host}
            onChange={e => this.handleInputOnChange('host', e.target.value)}
          />
          <span>:</span>
          <Input
            className="port"
            placeholder="端口"
            value={proxy.port}
            onChange={e => this.handleInputOnChange('port', e.target.value)}
          />
        </div>
        <div className="user-check">
          <Checkbox onChange={this.handleCheckboxOnChange} checked={!disabled}>
            代理服务器需要密码
          </Checkbox>
        </div>
        {!disabled && (
          <div className="user-password">
            <Form.Item label="用户名">
              <Input
                className="user"
                placeholder="用户名"
                disabled={disabled}
                value={proxy.userName}
                onChange={e => this.handleInputOnChange('userName', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="密码　">
              <Input
                className="pass"
                type="password"
                placeholder="密码"
                disabled={disabled}
                value={proxy.password}
                onChange={e => this.handleInputOnChange('password', e.target.value)}
              />
            </Form.Item>
          </div>
        )}
      </div>
    );
  }
}

CTaskProxyForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

CTaskProxyForm.defaultProps = {};

export default CTaskProxyForm;
