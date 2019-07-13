import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Tree } from 'antd';

import CTreeNodeTitle from './CTreeNodeTitle';

const { TreeNode, DirectoryTree } = Tree;

function CTree(props) {
  const { items, onSelect, addOnClick, removeOnClick, onDrag } = props;
  function handleOnSelect(key) {
    onSelect(key);
  }

  function handleAddOnClick() {
    addOnClick();
  }

  function handleRemoveOnClick(key) {
    removeOnClick(key);
  }

  function handleOnDrag(info) {
    onDrag(info);
  }

  function renderTreeNodes(data) {
    return data.map(item => {
      return (
        <TreeNode
          title={<CTreeNodeTitle node={item} onSelect={handleOnSelect} onRemove={handleRemoveOnClick} />}
          key={item.key}
          icon={<Icon type="profile" />}
        />
      );
    });
  }

  return (
    <div className="c-tree">
      <div className="title">
        <span>采集项目</span>
        <Icon type="plus-square" style={{ fontSize: '20px' }} onClick={handleAddOnClick} />
      </div>
      <span className="line" />
      <DirectoryTree defaultExpandAll draggable onDrop={handleOnDrag}>
        {renderTreeNodes(items)}
      </DirectoryTree>
    </div>
  );
}

CTree.propTypes = {
  items: PropTypes.array,
  addOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
};

CTree.defaultProps = {
  items: [],
};

export default CTree;
