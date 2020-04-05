import React from 'react';
import * as PropTypes from 'prop-types';
import { Menu, Dropdown, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

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
    <Tooltip placement="top" title={name}>
      <span className="c-tree-node">
        <span className="t-title" onClick={() => handleTitleOnSelect(key)}>
          {name}
        </span>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            <MoreOutlined />
          </a>
        </Dropdown>
      </span>
    </Tooltip>
  );
}

CTreeNodeTitle.defaultProps = {};

CTreeNodeTitle.propTypes = {
  node: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CTreeNodeTitle;
