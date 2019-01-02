import React from 'react';
import { Steps, Button, message } from 'antd';

import CCrawlerDefBasic from './CCrawlerDefBasic';
import CCrawlerDefUrls from './CCrawlerDefUrls';
import CCrawlerDefPagingResolver from './CCrawlerDefPagingResolver';
import CCrawlerDefCollectors from './CCrawlerDefCollectors';

const { Step } = Steps;

const steps = [
  {
    title: '任务基本属性',
    content: <CCrawlerDefBasic />,
  },
  {
    title: '请求URL集合',
    content: <CCrawlerDefUrls />,
  },
  {
    title: '分页解析器',
    content: <CCrawlerDefPagingResolver />,
  },
  {
    title: '采集器集合',
    content: <CCrawlerDefCollectors />,
  },
];

class CCrawlerDefinition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="steps-def">
        <Steps current={current}>{steps.map(item => <Step key={item.title} title={item.title} />)}</Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('完成!')}>
              完成
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              前一步
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default CCrawlerDefinition;
