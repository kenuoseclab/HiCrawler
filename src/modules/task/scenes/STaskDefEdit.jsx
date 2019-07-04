import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Steps } from 'antd';

import CCrawlerDefBasic from '../components/CCrawlerDefBasic';
import CCrawlerDefUrls from '../components/CCrawlerDefUrls';
import CCrawlerDefPagingResolver from '../components/CCrawlerDefPagingResolver';
import CCrawlerDefCollectorsForm from '../components/CCrawlerDefCollectors';

const { Step } = Steps;

class STaskDefEdit extends React.Component {
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
    const steps = [
      {
        title: '基本属性',
        content: <CCrawlerDefBasic {...this.props} />,
        current: 0,
      },
      {
        title: '请求URL',
        content: <CCrawlerDefUrls {...this.props} />,
        current: 1,
      },
      {
        title: '分页解析器',
        content: <CCrawlerDefPagingResolver {...this.props} />,
        current: 2,
      },
      {
        title: '采集器集合',
        content: <CCrawlerDefCollectorsForm {...this.props} />,
        current: 3,
      },
    ];
    return (
      <div className="steps-def">
        <Steps current={current} size="small">
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
      </div>
    );
  }
}

STaskDefEdit.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnChange: PropTypes.func.isRequired,
};

STaskDefEdit.defaultProps = {};

export default STaskDefEdit;
