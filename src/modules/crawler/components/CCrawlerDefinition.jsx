import React from 'react';
import { Steps, Button, message, Icon } from 'antd';

import CCrawlerDefBasic from './CCrawlerDefBasic';
import CCrawlerDefUrls from './CCrawlerDefUrls';
import CCrawlerDefPagingResolver from './CCrawlerDefPagingResolver';
import CCrawlerDefCollectors from './CCrawlerDefCollectors';

const { Step } = Steps;

const steps = [
  {
    title: '基本属性',
    content: <CCrawlerDefBasic />,
    current: 0,
  },
  {
    title: '请求URL',
    content: <CCrawlerDefUrls />,
    current: 1,
  },
  {
    title: '分页解析器',
    content: <CCrawlerDefPagingResolver />,
    current: 2,
  },
  {
    title: '采集器集合',
    content: <CCrawlerDefCollectors />,
    current: 3,
  },
];

class CCrawlerDefinition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next(current) {
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="steps-def">
        <Steps current={current} size="small" style={{ width: '80%' }}>
          {steps.map(i => (
            <Step
              key={i.title}
              title={i.title}
              icon={<Icon type="right-circle" />}
              onClick={() => this.next(i.current)}
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        {/*<div className="steps-action">*/}
        {/*<Button type="primary" onClick={() => message.success('完成!')}>*/}
        {/*完成*/}
        {/*</Button>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default CCrawlerDefinition;
