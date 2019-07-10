import React from 'react';
import * as PropTypes from 'prop-types';
import { Form, Input, Radio, Button, Row, Col, Icon } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { generateUUID, forEach, filter, find } from '../../../util/helper';
import drag from '../../../static/img/drag.png';
import { URL_TEMPLATE_TYPE } from '../../../util/constants';
import CFormItemFactory from '../../system/components/CFormItemFactory';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

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

class CCrawlerDefUrls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: this.props.data.urls || {},
    };

    this.handleUrlsChange = this.handleUrlsChange.bind(this);

    this.handleAddUrlTemplateClick = this.handleAddUrlTemplateClick.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);

    this.handleRemoveUrlTemplateClick = this.handleRemoveUrlTemplateClick.bind(this);
    this.handleTemplateParamDragEnd = this.handleTemplateParamDragEnd.bind(this);
    this.handleParamOnChange = this.handleParamOnChange.bind(this);
    this.handleAddParamClick = this.handleAddParamClick.bind(this);
    this.handleRemoveParamClick = this.handleRemoveParamClick.bind(this);

    this.handleParamTypeChange = this.handleParamTypeChange.bind(this);
  }

  commonUrlsChange(urls) {
    this.setState({ urls });
    const { data } = this.props;
    data.urls = urls;
    this.props.itemOnChange({ detail: data });
  }

  handleUrlsChange(field, v) {
    const { urls } = this.state;
    urls[field] = v;
    if (urls.type === 'PlainUrlSet') {
      urls.templatedUrls = [];
    } else {
      urls.urlItems = [];
      urls.url = '';
    }
    this.commonUrlsChange(urls);
  }

  handleAddUrlTemplateClick() {
    const { urls } = this.state;
    urls.templatedUrls = urls.templatedUrls || [];
    urls.templatedUrls.push({
      key: generateUUID(),
      template: 'http://test/{参数1}',
      params: [
        {
          key: generateUUID(),
          name: '参数1',
          type: 'SequenceUrlParam',
          start: 1,
          end: 10,
          step: 1,
        },
      ],
    });

    this.commonUrlsChange(urls);
  }

  handleTemplateChange(templateKey, v) {
    const { urls } = this.state;
    const temp = find(urls.templatedUrls, { key: templateKey });
    if (temp) {
      temp.template = v;
    }

    this.commonUrlsChange(urls);
  }

  handleRemoveUrlTemplateClick(key) {
    const { urls } = this.state;
    urls.templatedUrls = filter(urls.templatedUrls, p => p.key !== key);
    this.commonUrlsChange(urls);
  }

  handleTemplateParamDragEnd(result, templateKey) {
    const { urls } = this.state;
    const temp = find(urls.templatedUrls, { key: templateKey }) || {};
    const paramsObj = temp.params || [];
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    temp.params = reorder(paramsObj, result.source.index, result.destination.index);

    this.commonUrlsChange(urls);
  }

  handleParamOnChange(field, v, param) {
    const { urls } = this.state;
    urls.templatedUrls = urls.templatedUrls || [];
    const temp = find(urls.templatedUrls, { key: param.templateKey });
    if (temp) {
      forEach(temp.params, p => {
        if (p.key === param.key) {
          if (field === 'dateForm') {
            // eslint-disable-next-line no-param-reassign
            p = param;
          } else {
            // eslint-disable-next-line no-param-reassign
            p[field] = v;
          }
        }
      });
    }

    this.commonUrlsChange(urls);
  }

  handleAddParamClick(tKey) {
    const { urls } = this.state;
    urls.templatedUrls = urls.templatedUrls || [];
    const temp = find(urls.templatedUrls, { key: tKey });
    if (temp) {
      temp.params = temp.params || [];
      temp.params.push({
        key: generateUUID(),
        type: 'SequenceUrlParam',
        step: 1,
      });
    }

    this.commonUrlsChange(urls);
  }

  handleRemoveParamClick(templateKey, paramKey) {
    const { urls } = this.state;
    urls.templatedUrls = urls.templatedUrls || [];
    const temp = find(urls.templatedUrls, { key: templateKey });
    if (temp) {
      temp.params = filter(temp.params, p => p.key !== paramKey);
    }

    this.commonUrlsChange(urls);
  }

  handleParamTypeChange(tKey, pKey, e) {
    const { urls } = this.state;
    urls.templatedUrls = urls.templatedUrls || [];
    const temp = find(urls.templatedUrls, { key: tKey });
    if (temp) {
      const param = find(temp.params, { key: pKey });
      if (param) {
        param.type = e.target.value;
        param.dateType = 'relative';
        param.startDateOffsetOperation = 'plus';
        param.startDateOffset = 1;
        param.endDateOffsetOperation = 'plus';
        param.endDateOffset = 1;
      }
    }

    this.commonUrlsChange(urls);
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

    const { urls } = this.state;

    const desc = '请将参数以 {参数名} 的形式插入到网址中';

    return (
      <Form {...formItemLayout} className="task-edit">
        <Form.Item label="类型">
          <RadioGroup value={urls.type} onChange={e => this.handleUrlsChange('type', e.target.value)}>
            <Radio value="PlainUrlSet">简单网址</Radio>
            <Radio value="TemperatedUrlSet">动态网址</Radio>
          </RadioGroup>
        </Form.Item>
        {urls.type === 'PlainUrlSet' && (
          <Form.Item label="网址" extra="单条或多条网址（一行一个，以http://或https://开头）">
            <TextArea
              autosize={{ minRows: 6 }}
              value={urls.url}
              placeholder="http://test/page/1&#10;http://test/page/2&#10;..."
              onChange={e => this.handleUrlsChange('url', e.target.value)}
            />
          </Form.Item>
        )}
        {urls.type === 'TemperatedUrlSet' && (
          <div>
            <Form.Item label="模板">
              <Button onClick={this.handleAddUrlTemplateClick}>追加</Button>
              {urls.templatedUrls &&
                urls.templatedUrls.map(t => {
                  const params = t.params || [];
                  return (
                    <div style={{ border: '1px solid #e8e8e8', padding: '2px 10px' }} key={t.key}>
                      <div>
                        <Row>
                          <Col span={19}>
                            <Input
                              value={t.template}
                              onChange={e => this.handleTemplateChange(t.key, e.target.value)}
                            />
                          </Col>
                          <Col span={5}>
                            <Button title="添加参数" onClick={() => this.handleAddParamClick(t.key)}>
                              +
                            </Button>
                            <Button title="删除模板" onClick={() => this.handleRemoveUrlTemplateClick(t.key)}>
                              x
                            </Button>
                          </Col>
                        </Row>
                        <div className="desc">{desc}</div>
                      </div>
                      <DragDropContext onDragEnd={r => this.handleTemplateParamDragEnd(r, t.key)}>
                        <Droppable droppableId="droppable">
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={getListStyle(snapshot.isDraggingOver)}
                            >
                              {params.map((p, index) => {
                                // eslint-disable-next-line no-param-reassign
                                p.templateKey = t.key;
                                const urlTemplates = find(URL_TEMPLATE_TYPE, { key: p.type }) || {};
                                const isExistUrlForm = urlTemplates.items && urlTemplates.items.length > 0;
                                const urlTemplateForm =
                                  isExistUrlForm && CFormItemFactory(urlTemplates.items, p, this.handleParamOnChange);
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
                                          <Form.Item label="类型">
                                            <RadioGroup
                                              value={p.type}
                                              onChange={e => this.handleParamTypeChange(t.key, p.key, e)}
                                            >
                                              <Radio value="SequenceUrlParam">序列</Radio>
                                              <Radio value="EnumUrlParam">枚举</Radio>
                                              <Radio value="DateUrlParam">日期</Radio>
                                            </RadioGroup>
                                          </Form.Item>
                                          {isExistUrlForm && urlTemplateForm}
                                        </div>
                                        <div className="icon-delete">
                                          <Icon
                                            className="icon-delete"
                                            type="close-circle"
                                            onClick={() => this.handleRemoveParamClick(t.key, p.key)}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  );
                })}
            </Form.Item>
          </div>
        )}
      </Form>
    );
  }
}

CCrawlerDefUrls.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CCrawlerDefUrls.defaultProps = {};

export default CCrawlerDefUrls;
