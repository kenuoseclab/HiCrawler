import React from 'react';
import * as PropTypes from 'prop-types';
import { QuestionCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Form, Select, Tooltip } from 'antd';

import CFormItemFactory from '../../system/components/CFormItemFactory';
import {
  PAGING_PROCESSORS_TYPE,
  PAGING_RESOLVER_TYPE,
  COLLECTOR_TYPE,
  FORM_ITEM_LAYOUT,
} from '../../../util/constants';
import { generateUUID, forEach, filter, find } from '../../../util/helper';
import drag from '../../../static/img/drag.png';

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

class CTaskDefPagingResolver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagingResolver: this.props.data.pagingResolver || {},
    };

    this.handlePagingTypeChange = this.handlePagingTypeChange.bind(this);
    this.handlePagingTypeDetailChange = this.handlePagingTypeDetailChange.bind(this);
    this.handlePagingTypeCollectorDetailChange = this.handlePagingTypeCollectorDetailChange.bind(this);

    // process
    this.handleAddProcess = this.handleAddProcess.bind(this);
    this.handleProcessChange = this.handleProcessChange.bind(this);
    this.handleRemoveProcessClick = this.handleRemoveProcessClick.bind(this);
    this.handleProcessOnDragEnd = this.handleProcessOnDragEnd.bind(this);
  }

  commonProcess(processors) {
    const { pagingResolver } = this.state;
    pagingResolver.processors = processors;
    this.setState({ pagingResolver });

    const { data } = this.props;
    data.pagingResolver = pagingResolver;
    this.props.itemOnChange(data);
  }

  handlePagingTypeChange(field, v) {
    const { pagingResolver } = this.state;
    pagingResolver[field] = v;
    pagingResolver.typeInfo = {};

    if (v === 'NextPageButtonPagingResolver') {
      pagingResolver.typeInfo = {
        buttonLabel: '下一页',
        urlAttributeName: 'href',
      };
    }

    if (v === 'NextPageNumberPagingResolver') {
      pagingResolver.typeInfo = {
        cssSelector: 'a',
        urlAttributeName: 'href',
      };
    }

    this.setState({ pagingResolver });

    const { data } = this.props;
    data.pagingResolver = pagingResolver;
    this.props.itemOnChange(data);
  }

  handlePagingTypeDetailChange(field, v) {
    const { pagingResolver } = this.state;
    const typeObj = pagingResolver.typeInfo || {};
    typeObj[field] = v;

    if (field === 'collector') {
      typeObj.collectorInfo = {};
    }

    pagingResolver.typeInfo = typeObj;
    this.setState({ pagingResolver });

    const { data } = this.props;
    data.pagingResolver = pagingResolver;
    this.props.itemOnChange(data);
  }

  handlePagingTypeCollectorDetailChange(field, v) {
    const { pagingResolver } = this.state;
    const typeObj = pagingResolver.typeInfo || {};

    typeObj.collectorInfo = typeObj.collectorInfo || {};
    typeObj.collectorInfo[field] = v;

    pagingResolver.typeInfo = typeObj;
    this.setState({ pagingResolver });

    const { data } = this.props;
    data.pagingResolver = pagingResolver;
    this.props.itemOnChange(data);
  }

  handleAddProcess(v, option) {
    const { pagingResolver } = this.state;

    const processObj = pagingResolver.processors || [];
    const obj = {
      key: generateUUID(),
      type: v,
      name: option.props.children,
    };
    processObj.push(obj);
    this.commonProcess(processObj);
  }

  handleProcessChange(field, v, process) {
    const { pagingResolver } = this.state;

    const processObj = pagingResolver.processors || [];
    forEach(processObj, p => {
      const temp = p;
      if (p.key === process.key) {
        temp[field] = v;
      }
    });
    this.commonProcess(processObj);
  }

  handleRemoveProcessClick(key) {
    const { pagingResolver } = this.state;
    const processObj = filter(pagingResolver.processors, p => p.key !== key);
    this.commonProcess(processObj);
  }

  handleProcessOnDragEnd(result) {
    const { pagingResolver } = this.state;

    const processObj = pagingResolver.processors || [];
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(processObj, result.source.index, result.destination.index);

    this.commonProcess(items);
  }

  render() {
    const { pagingResolver } = this.state;
    const processors = pagingResolver.processors || [];

    const typeData = find(PAGING_RESOLVER_TYPE, { key: pagingResolver.type });
    const isExistForm = typeData && typeData.items && typeData.items.length > 0;
    let typeForm;
    if (isExistForm) {
      typeForm = CFormItemFactory(typeData.items, pagingResolver.typeInfo, this.handlePagingTypeDetailChange);
    }

    let collectorForm;
    if (pagingResolver.type === 'CollectorPagingResolver') {
      const { typeInfo } = pagingResolver;
      const collectorKey = typeInfo && typeInfo.collector;
      const collectorItems = find(COLLECTOR_TYPE, { key: collectorKey });
      if (collectorItems && collectorItems.items && collectorItems.items.length > 0) {
        collectorForm = CFormItemFactory(
          collectorItems.items,
          pagingResolver.typeInfo.collectorInfo,
          this.handlePagingTypeCollectorDetailChange
        );
      }
    }

    return (
      <Form {...FORM_ITEM_LAYOUT} className="task-edit">
        <Form.Item label="分页解析器">
          <Select value={pagingResolver.type} onChange={v => this.handlePagingTypeChange('type', v)}>
            {PAGING_RESOLVER_TYPE.map(p => (
              <Option key={p.key} value={p.key}>
                {p.name}
              </Option>
            ))}
          </Select>
          {pagingResolver.type && (
            <div className="desc">{find(PAGING_RESOLVER_TYPE, { key: pagingResolver.type }).desc}</div>
          )}
          {isExistForm && (
            <div className="c-sub-form">
              {typeForm}
              {collectorForm}
            </div>
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              后处理器&nbsp;
              <Tooltip title="对上面提取的网址进行指定的处理。可以指定多个处理器。">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Select onChange={this.handleAddProcess} value="">
            {PAGING_PROCESSORS_TYPE.map(p => (
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
                      const processItems = find(PAGING_PROCESSORS_TYPE, { key: p.type });
                      const isExistProcessForm = processItems && processItems.items && processItems.items.length > 0;
                      // eslint-disable-next-line max-len
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
                                  {processItems.desc && (
                                    <span className="type-desc">
                                      <div dangerouslySetInnerHTML={{ __html: processItems.desc }} />
                                    </span>
                                  )}
                                </Form.Item>
                                {isExistProcessForm && processForm}
                              </div>
                              <CloseCircleOutlined onClick={() => this.handleRemoveProcessClick(p.key)} />
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

CTaskDefPagingResolver.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CTaskDefPagingResolver.defaultProps = {};

export default CTaskDefPagingResolver;
