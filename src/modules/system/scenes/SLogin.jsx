import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { Form, Input, Button, Row } from 'antd';

import logo from '../../../static/img/logo.png';
import { ROUTE_HOME } from '../../../util/constants';
import storage from '../../../util/storage';

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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        storage.setToken('token');
        storage.setUser(values);
        this.props.history.replace(ROUTE_HOME);
      } else {
        console.log(err);
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
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: formatMessage({ id: 'login.label.name.check' }) }],
                })(<Input placeholder={formatMessage({ id: 'login.label.name' })} onChange={this.onChange} />)}
              </FormItem>
              <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator('pass', {
                  rules: [{ required: true, message: formatMessage({ id: 'login.label.password.check' }) }],
                })(
                  <Input
                    type="password"
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
          <p>Copyright © 2018 HiDream Corporation. All Rights Reserved.</p>
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
