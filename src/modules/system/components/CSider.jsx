import React from 'react';
import { Button, Tree } from 'antd';
import _ from 'lodash';

import Helper from '../../../util/helper';
import { get, post, put, del } from '../../../util/fetch';
import { API_CATEGORY } from '../../../util/constants';

import CTreeNodeTitle from './CTreeNodeTitle';

const { TreeNode, DirectoryTree } = Tree;

class CSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedKeys: ['0-3'],
    };

    this.handleCreateCategoryButtonOnClick = this.handleCreateCategoryButtonOnClick.bind(this);
    this.handleCategoryOnSelect = this.handleCategoryOnSelect.bind(this);
    this.handleCategoryOnRightClick = this.handleCategoryOnRightClick.bind(this);
    this.handleCategoryNameEditOnEnter = this.handleCategoryNameEditOnEnter.bind(this);
    this.handleCategoryRemoveOnClick = this.handleCategoryRemoveOnClick.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleCategoryOnSelect(selectedKeys) {
    this.setState({ selectedKeys });
  }

  handleCategoryOnRightClick() {}

  handleCreateCategoryButtonOnClick() {
    const { categories } = this.state;
    categories.push({
      _id: Helper.generateUUID(),
      name: '新规目录',
    });
    this.setState({ categories });
  }

  async handleCategoryNameEditOnEnter(node) {
    const { _id, name } = node;
    const isNew = _.includes(_id, '-');
    if (isNew) {
      await post(API_CATEGORY, { name });
    } else {
      await put(`${API_CATEGORY}/${_id}`, { name });
    }
    this.fetchCategories();
  }

  async handleCategoryRemoveOnClick(id) {
    await del(`${API_CATEGORY}/${id}`, {});
    this.fetchCategories();
  }

  async fetchCategories() {
    const categories = await get(API_CATEGORY);
    this.setState({ categories });
  }

  renderTreeNodes(data) {
    return data.map(item => {
      return (
        <TreeNode
          title={
            <CTreeNodeTitle
              node={item}
              onPressEnter={this.handleCategoryNameEditOnEnter}
              onRemove={this.handleCategoryRemoveOnClick}
            />
          }
          key={item._id}
          dataRef={item}
        />
      );
    });
  }

  render() {
    const { selectedKeys, categories } = this.state;
    return (
      <div className="side-menu">
        <div className="side-button">
          <Button type="primary" size="small" onClick={this.handleCreateCategoryButtonOnClick}>
            创建目录
          </Button>
        </div>
        <DirectoryTree
          className="side-tree"
          defaultExpandAll
          onSelect={this.handleCategoryOnSelect}
          onRightClick={this.handleCategoryOnRightClick}
          selectedKeys={selectedKeys}
        >
          {this.renderTreeNodes(categories)}
        </DirectoryTree>
      </div>
    );
  }
}

CSider.propTypes = {};

export default CSider;
