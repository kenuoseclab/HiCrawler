import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { generateUUID } from '../../../util/helper';

import CTree from './CTree';
import CCrawlerDefCollectorsForm from './CCrawlerDefCollectorsForm';

class CCrawlerDefCollectors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectors: this.props.data.collectors || [],
      selectedKey: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleRemoveOnClick = this.handleRemoveOnClick.bind(this);
    this.handleAddOnClick = this.handleAddOnClick.bind(this);
    this.handleFormOnChange = this.handleFormOnChange.bind(this);

    this.handleOnDrag = this.handleOnDrag.bind(this);
  }

  handleOnChange(key) {
    this.setState({ selectedKey: key });
  }

  handleRemoveOnClick(key) {
    let { collectors } = this.state;
    collectors = _.filter(collectors, c => c.key !== key);
    this.setState({ collectors, selectedKey: '' });
    const { data } = this.props;
    data.collectors = collectors;
    this.props.itemOnChange({ detail: data });
  }

  handleFormOnChange(key, field, value) {
    const { collectors } = this.state;
    const c = _.find(collectors, { key });
    c[field] = value;
    if (field === 'type') {
      c.typeInfo = {};
    }
    this.setState({ collectors, selectedKey: key });
    const { data } = this.props;
    data.collectors = collectors;
    this.props.itemOnChange({ detail: data });
  }

  handleAddOnClick() {
    const { collectors } = this.state;
    const key = generateUUID();
    collectors.push({
      key,
      name: '新规项目',
    });

    this.setState({ collectors, selectedKey: key });
    const { data } = this.props;
    data.collectors = collectors;
    this.props.itemOnChange({ detail: data });
  }

  handleOnDrag(info) {
    const dragKey = info.dragNode.props.eventKey;
    const { dropPosition } = info;
    const { collectors } = this.state;

    this.loop(collectors, dragKey, (item, index) => {
      const dropEnd = _.clone(collectors[dropPosition]);
      collectors[dropPosition] = item;
      collectors[index] = dropEnd;
      this.setState({ collectors, selectedKey: dragKey });
      const { data } = this.props;
      data.collectors = collectors;
      this.props.itemOnChange({ detail: data });
    });
  }

  loop(data, key, callback) {
    data.forEach((item, index, arr) => {
      if (item.key === key) {
        callback(item, index, arr);
        return;
      }
      if (item.children) {
        this.loop(item.children, key, callback);
      }
    });
  }

  render() {
    const { collectors, selectedKey } = this.state;
    const data = _.find(collectors, { key: selectedKey });
    return (
      <div className="task-collector">
        <div className="items">
          <CTree
            items={collectors}
            addOnClick={this.handleAddOnClick}
            removeOnClick={this.handleRemoveOnClick}
            onSelect={this.handleOnChange}
            onDrag={this.handleOnDrag}
          />
        </div>
        <div className="content">
          {!selectedKey && <div>&nbsp;&nbsp;&nbsp;&nbsp;采集详细</div>}
          {selectedKey && <CCrawlerDefCollectorsForm data={data} onChange={this.handleFormOnChange} />}
        </div>
      </div>
    );
  }
}

CCrawlerDefCollectors.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CCrawlerDefCollectors.defaultProps = {};

export default CCrawlerDefCollectors;
