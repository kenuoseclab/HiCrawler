import React from 'react';
import * as PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { Form, Input, Button, Row, message, Icon } from 'antd';

import logo from '../../../static/img/logo.png';
import { ROUTE_DASHBOARD, API_LOGIN } from '../../../util/constants';
import Storage from '../../../util/storage';
import { post } from '../../../util/fetch';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const result = await post(API_LOGIN, values);
          Storage.setToken(result.token);
          Storage.setUser(result.user);
          this.props.history.push(ROUTE_DASHBOARD);
        } catch (error) {
          message.error(error.message);
        }
      } else {
        // console.log(err);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('name') && getFieldError('name');
    const passwordError = isFieldTouched('pass') && getFieldError('pass');

    const { formatMessage } = this.props.intl;

    return (
      <div className="login">
        <Row>
          <div className="form">
            <div className="logo">
              <img src={logo} alt="" />
              <span>壁虎・采集器</span>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: formatMessage({ id: 'login.label.name.check' }) }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder={formatMessage({ id: 'login.label.name' })}
                    onChange={this.onChange}
                  />
                )}
              </FormItem>
              <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator('pass', {
                  rules: [{ required: true, message: formatMessage({ id: 'login.label.password.check' }) }],
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder={formatMessage({ id: 'login.label.password' })}
                    onChange={this.onChange}
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  htmlType="submit"
                  className={hasErrors(getFieldsError()) ? 'button-disabled' : 'button-enable'}
                  disabled={hasErrors(getFieldsError())}
                >
                  <FormattedMessage id="login.button.name" />
                </Button>
              </FormItem>
            </Form>
          </div>
        </Row>
        <Row className="footer">
          <p>Copyright © 2019 HiDream Corporation. All Rights Reserved.</p>
        </Row>
      </div>
    );
  }
}

SLogin.defaultProps = {};

SLogin.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    isFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form.create()(injectIntl(SLogin));
