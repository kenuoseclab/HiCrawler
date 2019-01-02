import React from 'react';
import { Button, Tree } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

const { TreeNode } = Tree;

const treeData = [
  {
    title: '电影（20）',
    key: '0-0',
    children: [],
  },
  {
    title: '图片（100）',
    key: '0-1',
    children: [],
  },
  {
    title: '股票（30）',
    key: '0-2',
    children: [],
  },
  {
    title: '新闻（15）',
    key: '0-3',
    children: [],
  },
];

class CSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0-0'],
      autoExpandParent: true,
      selectedKeys: ['0-3'],
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(selectedKeys) {
    this.setState({ selectedKeys });
  }

  renderTreeNodes(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {
    const { expandedKeys, autoExpandParent, selectedKeys } = this.state;
    return (
      <div className="side-menu">
        <div className="side-button">
          <Button type="primary">创建目录</Button>
        </div>
        <Tree
          className="side-tree"
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
          selectedKeys={selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }
}

CSider.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CSider);
