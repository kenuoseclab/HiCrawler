import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input, Menu, Dropdown } from 'antd';

class CTreeNodeTitle extends React.Component {
  constructor(props) {
    super(props);
    const { node } = this.props;
    this.state = {
      title: node.name,
      _id: node._id,
      isEditMode: _.includes(node._id, '-'),
    };

    this.handleTitleInputOnChange = this.handleTitleInputOnChange.bind(this);
    this.handleTitleInputOnEnter = this.handleTitleInputOnEnter.bind(this);
    this.handleTitleRightOnClick = this.handleTitleRightOnClick.bind(this);
  }

  handleTitleInputOnChange(e) {
    this.setState({ title: e.target.value });
  }

  handleTitleInputOnEnter(e) {
    const { _id } = this.state;
    this.setState({ isEditMode: false });
    this.props.onPressEnter({ _id, name: e.target.value });
  }

  handleTitleRightOnClick(e) {
    const { node } = this.props;
    if (e.key === 'rename') {
      this.setState({ isEditMode: true });
    }

    if (e.key === 'remove') {
      this.props.onRemove(node._id);
    }
  }

  render() {
    const { title, isEditMode } = this.state;

    const menu = (
      <Menu onClick={this.handleTitleRightOnClick}>
        <Menu.Item key="rename">重命名</Menu.Item>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    return (
      <span>
        {isEditMode ? (
          <Input
            autoFocus
            value={title}
            size="small"
            style={{ width: '70%' }}
            onChange={this.handleTitleInputOnChange}
            onPressEnter={this.handleTitleInputOnEnter}
            onBlur={this.handleTitleInputOnEnter}
          />
        ) : (
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <span>{title}</span>
          </Dropdown>
        )}
      </span>
    );
  }
}

CTreeNodeTitle.defaultProps = {};

CTreeNodeTitle.propTypes = {
  node: PropTypes.object.isRequired,
  onPressEnter: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CTreeNodeTitle;
