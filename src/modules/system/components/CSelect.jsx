import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

const { Option } = Select;

class CSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: this.props.defaultValue,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(v) {
    this.setState({ defaultValue: v });
    if (this.props.onChange) {
      this.props.onChange(v);
    }
  }

  render() {
    const { options } = this.props;
    const { defaultValue } = this.state;
    return (
      <div className="c-select">
        <Select onChange={this.handleOnChange}>
          {options.map(o => {
            return (
              <Option key={o.id} value={o.value}>
                {o.name}
              </Option>
            );
          })}
        </Select>
        <Input value={defaultValue} onChange={e => this.handleOnChange(e.target.value)} />
      </div>
    );
  }
}

CSelect.defaultProps = {
  options: [],
  defaultValue: '',
  onChange: null,
};

CSelect.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default CSelect;
