import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Form, Input, Radio, Select, Icon } from 'antd';

import CFormItemFactory from '../../system/components/CFormItemFactory';
import { COLLECTOR_TYPE, PROCESSORS_TYPE, FILTERS_TYPE } from '../../../util/constants';
import { generateUUID } from '../../../util/helper';
import drag from '../../../static/img/drag.png';

const RadioGroup = Radio.Group;
const { Option } = Select;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: '12px 4px',
  background: isDragging ? '#e3e3e3' : '#f2f2f2',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  borderColor: isDraggingOver ? 'lightblue' : 'lightgrey',
});

class CCrawlerDefCollectorsForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleCollectorInfoChange = this.handleCollectorInfoChange.bind(this);
    this.handleCollectorTypeChange = this.handleCollectorTypeChange.bind(this);
    this.handleCollectorTypeDetailChange = this.handleCollectorTypeDetailChange.bind(this);
    this.handleCollectorTypeFunctionDetailChange = this.handleCollectorTypeFunctionDetailChange.bind(this);

    // process
    this.handleAddProcess = this.handleAddProcess.bind(this);
    this.handleProcessChange = this.handleProcessChange.bind(this);
    this.handleRemoveProcessClick = this.handleRemoveProcessClick.bind(this);
    this.handleProcessOnDragEnd = this.handleProcessOnDragEnd.bind(this);

    // filter
    this.handleFilterMatchModeChange = this.handleFilterMatchModeChange.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
    this.handleFilterOnDragEnd = this.handleFilterOnDragEnd.bind(this);
  }

  handleCollectorInfoChange(field, v) {
    const { data } = this.props;
    this.props.onChange(data.key, field, v);
  }

  handleCollectorTypeChange(field, v) {
    const { data } = this.props;
    this.props.onChange(data.key, field, v);
  }

  handleCollectorTypeDetailChange(field, v) {
    const { data } = this.props;
    const typeObj = data.typeInfo || {};
    typeObj[field] = v;
    if (field === 'function') {
      typeObj.functionInfo = {};
    }
    this.props.onChange(data.key, 'typeInfo', typeObj);
  }

  handleCollectorTypeFunctionDetailChange(field, v) {
    const { data } = this.props;

    const typeObj = data.typeInfo || {};
    typeObj.functionInfo = typeObj.functionInfo || {};
    typeObj.functionInfo[field] = v;

    this.props.onChange(data.key, 'typeInfo', typeObj);
  }

  handleFilterMatchModeChange(field, v) {
    const { data } = this.props;

    const filterObj = data.filter || {};
    filterObj[field] = v;

    this.props.onChange(data.key, 'filter', filterObj);
  }

  handleAddFilter(v, option) {
    const { data } = this.props;

    const filterObj = data.filter || {};
    filterObj.predicates = filterObj.predicates || [];
    const obj = {
      key: generateUUID(),
      type: v,
      name: option.props.children,
    };
    filterObj.predicates.push(obj);
    this.props.onChange(data.key, 'filter', filterObj);
  }

  handleFilterChange(field, v, predicate) {
    const { data } = this.props;

    const filterObj = data.filter || {};
    _.each(filterObj.predicates, p => {
      const temp = p;
      if (p.key === predicate.key) {
        temp[field] = v;
      }
    });

    this.props.onChange(data.key, 'filter', filterObj);
  }

  handleRemoveFilterClick(key) {
    const { data } = this.props;
    const filterObj = data.filter || {};
    filterObj.predicates = filterObj.predicates || [];
    filterObj.predicates = _.filter(filterObj.predicates, p => p.key !== key);
    this.props.onChange(data.key, 'filter', filterObj);
  }

  handleAddProcess(v, option) {
    const { data } = this.props;

    const processObj = data.processors || [];
    const obj = {
      key: generateUUID(),
      type: v,
      name: option.props.children,
    };
    processObj.push(obj);
    this.props.onChange(data.key, 'processors', processObj);
  }

  handleProcessChange(field, v, process) {
    const { data } = this.props;

    const processObj = data.processors || [];
    _.each(processObj, p => {
      const temp = p;
      if (p.key === process.key) {
        temp[field] = v;
      }
    });

    this.props.onChange(data.key, 'processors', processObj);
  }

  handleRemoveProcessClick(key) {
    const { data } = this.props;
    let processObj = data.processors || [];
    processObj = _.filter(processObj, p => p.key !== key);
    this.props.onChange(data.key, 'processors', processObj);
  }

  handleProcessOnDragEnd(result) {
    const { data } = this.props;

    const processObj = data.processors || [];
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(processObj, result.source.index, result.destination.index);

    this.props.onChange(data.key, 'processors', items);
  }

  handleFilterOnDragEnd(result) {
    const { data } = this.props;

    const filterObj = data.filter || {};
    filterObj.predicates = filterObj.predicates || [];

    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(filterObj.predicates, result.source.index, result.destination.index);

    filterObj.predicates = items;

    this.props.onChange(data.key, 'filter', filterObj);
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const { data } = this.props;
    const filter = data.filter || {};
    const processors = data.processors || [];

    const typeData = _.find(COLLECTOR_TYPE, { key: data.type });
    const isExistForm = typeData && typeData.items && typeData.items.length > 0;
    let typeForm;
    if (isExistForm) {
      typeForm = CFormItemFactory(typeData.items, data.typeInfo, this.handleCollectorTypeDetailChange);
    }

    let functionForm;
    if (data.type === 'FunctionReturnValueCollector') {
      const { typeInfo } = this.props.data;
      const functionKey = typeInfo && typeInfo.function;
      const functionItems = _.find(typeData.items[0].data, { value: functionKey });
      if (functionItems && functionItems.items && functionItems.items.length > 0) {
        functionForm = CFormItemFactory(
          functionItems.items,
          data.typeInfo.functionInfo,
          this.handleCollectorTypeFunctionDetailChange
        );
      }
    }

    return (
      <Form {...formItemLayout} className="task-edit-collector">
        <Form.Item label="采集器名" required>
          <Input value={data.name || ''} onChange={e => this.handleCollectorInfoChange('name', e.target.value)} />
        </Form.Item>
        <Form.Item label="分页采集模式">
          <RadioGroup
            value={data.pageCollectMode}
            onChange={e => this.handleCollectorInfoChange('pageCollectMode', e.target.value)}
          >
            <Radio value="FIRST_PAGE">首页</Radio>
            <Radio value="LAST_PAGE">尾页</Radio>
            <Radio value="EVERY_PAGE">每一页</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item label="分页采集结果连接符">
          <Input
            value={data.pageCollectResultDelimiter || ''}
            onChange={e => this.handleCollectorInfoChange('pageCollectResultDelimiter', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="采集器的类型" required>
          <Select value={data.type} onChange={v => this.handleCollectorTypeChange('type', v)}>
            {COLLECTOR_TYPE.map(c => (
              <Option key={c.key} value={c.key}>
                {c.name}
              </Option>
            ))}
          </Select>
          {isExistForm && (
            <div className="c-sub-form">
              {typeForm}
              {functionForm}
            </div>
          )}
        </Form.Item>
        <Form.Item label="后处理器类型">
          <Select onChange={this.handleAddProcess}>
            {PROCESSORS_TYPE.map(p => (
              <Option key={p.key} value={p.key}>
                {p.name}
              </Option>
            ))}
          </Select>
          <DragDropContext onDragEnd={this.handleProcessOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {processors &&
                    processors.map((p, index) => {
                      const processItems = _.find(PROCESSORS_TYPE, { key: p.type });
                      const isExistProcessForm = processItems && processItems.items && processItems.items.length > 0;
                      const processForm =
                        isExistProcessForm && CFormItemFactory(processItems.items, p, this.handleProcessChange);
                      return (
                        <Draggable key={p.key} draggableId={p.key} index={index}>
                          {(provider, s) => (
                            <div
                              className="form"
                              ref={provider.innerRef}
                              {...provider.draggableProps}
                              {...provider.dragHandleProps}
                              style={getItemStyle(s.isDragging, provider.draggableProps.style)}
                            >
                              <div className="icon">
                                <span>
                                  <img src={drag} alt="drag" />
                                </span>
                              </div>
                              <div className="c-sub-form">
                                <Form.Item label="类型名">
                                  <div className="ant-form-text">{p.name}</div>
                                </Form.Item>
                                {isExistProcessForm && processForm}
                              </div>
                              <Icon type="close-circle" onClick={() => this.handleRemoveProcessClick(p.key)} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Form.Item>
        <Form.Item label="过滤器类型">
          <Select onChange={this.handleAddFilter}>
            {FILTERS_TYPE.map(f => (
              <Option key={f.key} value={f.key}>
                {f.name}
              </Option>
            ))}
          </Select>
          <RadioGroup
            value={filter.matchMode}
            onChange={e => this.handleFilterMatchModeChange('matchMode', e.target.value)}
          >
            <Radio value="ANY">任意匹配</Radio>
            <Radio value="ALL">全部匹配</Radio>
          </RadioGroup>
          <DragDropContext onDragEnd={this.handleFilterOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {filter.predicates &&
                    filter.predicates.map((p, index) => {
                      const filterItems = _.find(FILTERS_TYPE, { key: p.type });
                      const isExistFilterForm = filterItems && filterItems.items && filterItems.items.length > 0;
                      const filterForm =
                        isExistFilterForm && CFormItemFactory(filterItems.items, p, this.handleFilterChange);
                      return (
                        <Draggable key={p.key} draggableId={p.key} index={index}>
                          {(provider, s) => (
                            <div
                              className="form"
                              ref={provider.innerRef}
                              {...provider.draggableProps}
                              {...provider.dragHandleProps}
                              style={getItemStyle(s.isDragging, provider.draggableProps.style)}
                            >
                              <div className="icon">
                                <span>
                                  <img src={drag} alt="drag" />
                                </span>
                              </div>
                              <div className="c-sub-form">
                                <Form.Item label="类型名">
                                  <div className="ant-form-text">{p.name}</div>
                                </Form.Item>
                                {isExistFilterForm && filterForm}
                              </div>
                              <Icon type="close-circle" onClick={() => this.handleRemoveFilterClick(p.key)} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Form.Item>
      </Form>
    );
  }
}

CCrawlerDefCollectorsForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

CCrawlerDefCollectorsForm.defaultProps = {
  data: {},
};

export default CCrawlerDefCollectorsForm;
