import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Dropdown } from 'antd';

class CTreeNodeTitle extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleRightOnClick = this.handleTitleRightOnClick.bind(this);
    this.handleTitleOnSelect = this.handleTitleOnSelect.bind(this);
  }

  handleTitleRightOnClick(e) {
    const { node } = this.props;
    if (e.key === 'remove') {
      this.props.onRemove(node.key);
    }
  }

  handleTitleOnSelect(key) {
    this.props.onSelect(key);
  }

  render() {
    const { name, key } = this.props.node;

    const menu = (
      <Menu onClick={this.handleTitleRightOnClick}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    return (
      <span className="c-tree-node">
        <span onClick={() => this.handleTitleOnSelect(key)}>{name}</span>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            <Icon type="more" />
          </a>
        </Dropdown>
      </span>
    );
  }
}

CTreeNodeTitle.defaultProps = {};

CTreeNodeTitle.propTypes = {
  node: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CTreeNodeTitle;
