import React from 'react';
import { Button, Icon, Input } from 'antd';

const ButtonGroup = Button.Group;
const { TextArea } = Input;

class CCrawlerRun extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="area">
          <span className="area-title">执行</span>
          <table className="area-table" border="1">
            <tbody>
              <tr>
                <th>执行</th>
                <td>
                  <ButtonGroup>
                    <Button>
                      <Icon type="play-circle" theme="twoTone" />
                    </Button>
                    <Button>
                      <Icon type="pause-circle" theme="twoTone" />
                    </Button>
                    <Button>
                      <Icon type="close-circle" theme="twoTone" />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
              <tr>
                <th>执行结果</th>
                <td>
                  <TextArea autosize={{ minRows: 20, maxRows: 60 }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="area-operation">
          <Button type="primary">保存</Button>
        </div>
      </div>
    );
  }
}

export default CCrawlerRun;
