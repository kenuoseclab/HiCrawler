import React, { useState } from 'react';
import * as PropTypes from 'prop-types';

import { generateUUID, filter, find } from '../../../util/helper';

import CTree from './CTree';
import CTaskDefCollectorsForm from './CTaskDefCollectorsForm';

function CTaskDefCollectors(props) {
  const { data, itemOnChange } = props;
  const [collectors, setCollectors] = useState(data.collectors || []);
  const [selectedKey, setSelectedKey] = useState('');

  function commonUpdateStateAndProps(c, k) {
    setCollectors(c);
    setSelectedKey(k);
    const td = { ...data };
    td.collectors = collectors;
    itemOnChange(td);
  }

  function loop(d, key, callback) {
    d.forEach((item, index, arr) => {
      if (item.key === key) {
        callback(item, index, arr);
        return;
      }
      if (item.children) {
        loop(item.children, key, callback);
      }
    });
  }

  function handleRemoveOnClick(key) {
    let tc = [...collectors];
    tc = filter(tc, c => c.key !== key);
    commonUpdateStateAndProps(tc, '');
  }

  function handleFormOnChange(key, field, value) {
    const tc = [...collectors];
    const c = find(tc, { key });
    c[field] = value;
    if (field === 'type') {
      c.typeInfo = {};
    }
    commonUpdateStateAndProps(tc, key);
  }

  function handleAddOnClick() {
    const key = generateUUID();
    const tc = [...collectors];
    tc.push({
      key,
      name: '新规项目',
    });

    commonUpdateStateAndProps(tc, key);
  }

  function handleOnDrag(info) {
    const dragKey = info.dragNode.props.eventKey;
    const { dropPosition } = info;

    loop(collectors, dragKey, (item, index) => {
      const tc = [...collectors];
      const dropEnd = Object.assign({}, tc[dropPosition]);
      tc[dropPosition] = item;
      tc[index] = dropEnd;
      commonUpdateStateAndProps(tc, dragKey);
    });
  }

  const tempCollectors = find(collectors, { key: selectedKey });
  return (
    <div className="task-collector">
      <div className="items">
        <CTree
          items={collectors}
          addOnClick={handleAddOnClick}
          removeOnClick={handleRemoveOnClick}
          onSelect={setSelectedKey}
          onDrag={handleOnDrag}
        />
      </div>
      <div className="content">
        {!selectedKey && <div>&nbsp;&nbsp;&nbsp;&nbsp;采集详细</div>}
        {selectedKey && <CTaskDefCollectorsForm data={tempCollectors} onChange={handleFormOnChange} />}
      </div>
    </div>
  );
}

CTaskDefCollectors.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

CTaskDefCollectors.defaultProps = {};

export default CTaskDefCollectors;
