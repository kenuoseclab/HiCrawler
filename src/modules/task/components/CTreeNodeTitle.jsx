import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Menu, Dropdown } from 'antd';

function CTreeNodeTitle(props) {
  const { name, key } = props.node;

  function handleTitleRightOnClick(e) {
    if (e.key === 'remove') {
      props.onRemove(key);
    }
  }

  function handleTitleOnSelect(titleKey) {
    props.onSelect(titleKey);
  }

  const menu = (
    <Menu onClick={handleTitleRightOnClick}>
      <Menu.Item key="remove">删除</Menu.Item>
    </Menu>
  );

  return (
    <span className="c-tree-node">
      <span onClick={() => handleTitleOnSelect(key)}>{name}</span>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          <Icon type="more" />
        </a>
      </Dropdown>
    </span>
  );
}

CTreeNodeTitle.defaultProps = {};

CTreeNodeTitle.propTypes = {
  node: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CTreeNodeTitle;
