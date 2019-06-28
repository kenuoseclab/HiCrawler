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
  }

  handleOnSelect(key) {
    this.props.onSelect(key);
  }

  handleAddOnClick() {
    this.props.addOnClick();
  }

  async handleRemoveOnClick(key) {
    this.props.removeOnClick(key);
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
        <DirectoryTree defaultExpandAll>{this.renderTreeNodes(items)}</DirectoryTree>
      </div>
    );
  }
}

CTree.propTypes = {
  items: PropTypes.array,
  addOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

CTree.defaultProps = {
  items: [],
};

export default CTree;
