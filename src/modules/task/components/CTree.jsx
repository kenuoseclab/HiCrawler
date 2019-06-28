import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tree } from 'antd';

import CTreeNodeTitle from './CTreeNodeTitle';

const { TreeNode, DirectoryTree } = Tree;

class CTree extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOnClick = this.handleAddOnClick.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleRemoveOnClick = this.handleRemoveOnClick.bind(this);

    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDrag = this.handleOnDrag.bind(this);
  }

  handleOnSelect(key) {
    this.props.onSelect(key);
  }

  handleAddOnClick() {
    this.props.addOnClick();
  }

  handleRemoveOnClick(key) {
    this.props.removeOnClick(key);
  }

  handleOnDragStart(info) {
    console.log('start', info);
  }

  handleOnDragEnter(info) {
    console.log('enter', info);
  }

  handleOnDrag(info) {
    console.log('drop', info);
    this.props.onDrag(info);
  }

  renderTreeNodes(data) {
    return data.map(item => {
      return (
        <TreeNode
          title={<CTreeNodeTitle node={item} onSelect={this.handleOnSelect} onRemove={this.handleRemoveOnClick} />}
          key={item.key}
          icon={<Icon type="profile" />}
        />
      );
    });
  }

  render() {
    const { items } = this.props;
    return (
      <div className="c-tree">
        <div className="title">
          <span>采集项目</span>
          <Icon type="plus-square" style={{ fontSize: '20px' }} onClick={this.handleAddOnClick} />
        </div>
        <span className="line" />
        <DirectoryTree
          defaultExpandAll
          draggable
          onDragStart={this.handleOnDragStart}
          onDragEnter={this.handleOnDragEnter}
          onDrop={this.handleOnDrag}
        >
          {this.renderTreeNodes(items)}
        </DirectoryTree>
      </div>
    );
  }
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
