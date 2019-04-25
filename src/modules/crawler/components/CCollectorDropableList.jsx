import React, { Component } from 'react';
import { Icon } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  display: 'flow-root',
  // change background colour if dragging
  background: isDragging ? '#e3e3e3' : '#f2f2f2',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  borderColor: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
});

class CCollectorDropableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div className="collectors-items">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="collectors-items-add">
            <span>
              <Icon type="plus-circle" theme="outlined" style={{ color: '#ccc' }} />
              <label style={{ paddingLeft: '8px' }}>追加采集項目</label>
            </span>
            <div className="dropableLine" />
          </div>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(p, s) => (
                      <div
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        style={getItemStyle(s.isDragging, p.draggableProps.style)}
                      >
                        <span className="left">{item.content}</span>
                        <Icon
                          className="right"
                          type="close-circle"
                          style={{ color: '#ccc', fontSize: '16px', paddingLeft: '12px' }}
                        />
                        <Icon className="right" type="bars" style={{ color: '#ccc', fontSize: '16px' }} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default CCollectorDropableList;
