import React from 'react';
import * as PropTypes from 'prop-types';
import { Tree } from 'antd';
import { ProfileOutlined, PlusSquareOutlined } from '@ant-design/icons';

import { forEach } from '../../../util/helper';

import CTreeNodeTitle from './CTreeNodeTitle';

const { DirectoryTree } = Tree;

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

  const treeData = [];
  forEach(items, item => {
    treeData.push({
      title: <CTreeNodeTitle node={item} onSelect={handleOnSelect} onRemove={handleRemoveOnClick} />,
      key: item.key,
      icon: <ProfileOutlined onClick={() => handleOnSelect(item.key)} />,
    });
  });

  return (
    <div className="c-tree">
      <div className="title">
        <span>采集项目{items.length > 0 ? `(${items.length})` : ''}</span>
        <PlusSquareOutlined style={{ fontSize: '18px', float: 'right' }} onClick={handleAddOnClick} />
      </div>
      <span className="line" />
      <DirectoryTree defaultExpandAll draggable onDrop={handleOnDrag} treeData={treeData} />
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
