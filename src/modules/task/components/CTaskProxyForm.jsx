import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Checkbox, Form, Input } from 'antd';

function CTaskProxyForm(props) {
  const [proxy, setProxy] = useState(props.data || {});
  const [disabled, setDisabled] = useState(!(proxy.userName && proxy.password));

  function handleInputOnChange(field, v) {
    const tempProxy = { ...proxy, [field]: v };
    setProxy(tempProxy);
    props.onChange(tempProxy);
  }

  function handleCheckboxOnChange(e) {
    const tempProxy = { ...proxy };
    if (!e.target.checked) {
      tempProxy.userName = '';
      tempProxy.password = '';
    }

    setDisabled(!e.target.checked);
    setProxy(tempProxy);
    props.onChange(tempProxy);
  }

  return (
    <div className="proxy-form">
      <div className="server">
        <Input
          className="address"
          placeholder="服务器"
          value={proxy.host}
          onChange={e => handleInputOnChange('host', e.target.value)}
        />
        <span>:</span>
        <Input
          className="port"
          placeholder="端口"
          value={proxy.port}
          onChange={e => handleInputOnChange('port', e.target.value)}
        />
      </div>
      <div className="user-check">
        <Checkbox onChange={handleCheckboxOnChange} checked={!disabled}>
          代理服务器需要密码
        </Checkbox>
      </div>
      {!disabled && (
        <div className="user-password">
          <Form.Item label="用户名">
            <Input
              autoComplete="off"
              className="user"
              placeholder="用户名"
              disabled={disabled}
              value={proxy.userName}
              onChange={e => handleInputOnChange('userName', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="密码　">
            <Input
              autoComplete="off"
              className="pass"
              type="password"
              placeholder="密码"
              disabled={disabled}
              value={proxy.password}
              onChange={e => handleInputOnChange('password', e.target.value)}
            />
          </Form.Item>
        </div>
      )}
    </div>
  );
}

CTaskProxyForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

CTaskProxyForm.defaultProps = {
  data: {},
};

export default CTaskProxyForm;
