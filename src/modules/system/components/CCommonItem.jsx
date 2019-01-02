import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import Helper from '../../../util/helper';

class CCommonItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: this.props.initItem,
      event: 'init',
    };
    this.handleItemEditButtonClick = this.handleItemEditButtonClick.bind(this);
    this.handleItemRemoveButtonClick = this.handleItemRemoveButtonClick.bind(this);
    this.handleItemAddButtonClick = this.handleItemAddButtonClick.bind(this);
    this.handleItemInputChange = this.handleItemInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.event === 'input') {
      return false;
    }
    return true;
  }

  handleItemRemoveButtonClick(index) {
    const addresses = _.cloneDeep(this.state.addresses);
    if (addresses.length === 1) {
      return;
    }
    addresses.splice(index, 1);
    this.setState({ addresses, event: 'remove' });
  }

  handleItemAddButtonClick(index) {
    const addresses = _.cloneDeep(this.state.addresses);
    addresses.splice(index + 1, 0, '');
    this.setState({ addresses, event: 'add' });
  }

  handleItemInputChange(e) {
    const index = e.currentTarget.name;
    const v = e.currentTarget.value;
    const addresses = _.cloneDeep(this.state.addresses);
    addresses[index] = v;
    this.setState({ addresses, event: 'input' });
  }

  handleItemEditButtonClick(e) {
    this.props.onItemEdit(e);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ event: 'submit' });
    // this.props.onSave(this.state.addresses);
  }

  render() {
    const multi = this.props.multiInput;
    let addresses = this.state.addresses;
    if (addresses.length === 0) {
      addresses.push('');
    }
    const formItems = addresses.map((city, index) => {
      return (
        <div key={Helper.generateUUID} className="item">
          {multi && <Input placeholder="" />}
          <Icon type="edit" style={{ color: '#009cff' }} onClick={() => this.handleItemEditButtonClick(index)} />
          <Icon type="plus-circle" style={{ color: '#009cff' }} onClick={() => this.handleItemAddButtonClick(index)} />
          {addresses.length > 1 && (
            <Icon
              type="minus-circle"
              style={{ color: '#696969' }}
              onClick={() => this.handleItemRemoveButtonClick(index)}
            />
          )}
        </div>
      );
    });
    return (
      <div>
        <div className="city-items">{formItems}</div>
      </div>
    );
  }
}

CCommonItem.propTypes = {
  initItem: PropTypes.array,
  multiInput: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onItemEdit: PropTypes.func,
};

CCommonItem.defaultProps = {
  initItem: [''],
  multiInput: false,
  onSave: null,
  onCancel: null,
};

export default CCommonItem;
