import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Steps } from 'antd';

import CTaskDefBasic from '../components/CTaskDefBasic';
import CTaskDefUrls from '../components/CTaskDefUrls';
import CTaskDefPagingResolver from '../components/CTaskDefPagingResolver';
import CCrawlerDefCollectorsForm from '../components/CTaskDefCollectors';

const { Step } = Steps;

function STaskDefEdit(props) {
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: '基本属性',
      content: <CTaskDefBasic {...props} />,
      current: 0,
    },
    {
      title: '网址',
      content: <CTaskDefUrls {...props} />,
      current: 1,
    },
    {
      title: '分页解析器',
      content: <CTaskDefPagingResolver {...props} />,
      current: 2,
    },
    {
      title: '采集器集合',
      content: <CCrawlerDefCollectorsForm {...props} />,
      current: 3,
    },
  ];

  return (
    <div className="steps-def">
      <Steps current={current} size="small" progressDot>
        {steps.map(i => (
          <Step key={i.title} title={i.title} onClick={() => setCurrent(i.current)} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </div>
  );
}

STaskDefEdit.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

STaskDefEdit.defaultProps = {};

export default STaskDefEdit;
