import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select } from 'antd';

const { Option } = Select;

function CSelect(props) {
  const { options } = props;
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);

  function handleOnChange(v) {
    setDefaultValue(v);
    if (props.onChange) {
      props.onChange(v);
    }
  }

  return (
    <div className="c-select">
      <Select onChange={handleOnChange}>
        {options.map(o => {
          return (
            <Option key={o.id} value={o.value}>
              {o.name}
            </Option>
          );
        })}
      </Select>
      <Input value={defaultValue} onChange={e => handleOnChange(e.target.value)} />
    </div>
  );
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
