import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Steps } from 'antd';

import CCrawlerDefBasic from '../components/CCrawlerDefBasic';
import CCrawlerDefUrls from '../components/CCrawlerDefUrls';
import CCrawlerDefPagingResolver from '../components/CCrawlerDefPagingResolver';
import CCrawlerDefCollectorsForm from '../components/CCrawlerDefCollectors';

const { Step } = Steps;

function STaskDefEdit(props) {
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: '基本属性',
      content: <CCrawlerDefBasic {...props} />,
      current: 0,
    },
    {
      title: '网址',
      content: <CCrawlerDefUrls {...props} />,
      current: 1,
    },
    {
      title: '分页解析器',
      content: <CCrawlerDefPagingResolver {...props} />,
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
