import React, { useState } from 'react';
import * as PropTypes from 'prop-types';

import { Button, message, Upload } from 'antd';

import { get } from '../../../util/fetch';
import { API_TASK_DETAIL } from '../../../util/constants';

function STaskDefImportExport(props) {
  const [fileList, setFileList] = useState([]);

  const handleExportButtonClicked = async event => {
    event.preventDefault();
    const { id } = props.match.params;
    if (id) {
      try {
        const data = await get(`${API_TASK_DETAIL}/${id}`);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = data.basicInfo.name;
        const evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        link.dispatchEvent(evt);
      } catch (e) {
        message.error('下载失败。');
      }
    }
  };

  const handleUploadClick = () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files', file);
      });

      // upload(url, formData, err => {
      //   setFileList([]);
      //   if (err) {
      //     message.error('上传成功。');
      //   } else {
      //     message.success('上传失败。');
      //   }
      // });
    }
  };

  const fileProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: file => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <div className="csv-operation-div">
      <div className="export-title-div">
        <span className="export-title">
          <label>任务导出</label>
        </span>
      </div>
      <div>&nbsp;</div>
      <div className="btn-div">
        <Button type="primary" onClick={handleExportButtonClicked}>
          导出
        </Button>
      </div>
      <div className="import-title-div">
        <span className="import-title">
          <label>任务导入(开发中)</label>
        </span>
      </div>
      <div className="msg-div">
        <label>请上传任务的json文件。</label>
      </div>
      <div className="code-div">
        <span className="code-title-span">任务JSON文件</span>
        <span className="code-span">
          <Upload {...fileProps}>
            <Button className="select-btn" size="small">
              选择
            </Button>
          </Upload>
        </span>
      </div>
      <div className="btn-div-bottom">
        <Button type="primary" disabled={fileList.length === 0} onClick={handleUploadClick}>
          导入
        </Button>
      </div>
    </div>
  );
}

STaskDefImportExport.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

STaskDefImportExport.defaultProps = {};

export default STaskDefImportExport;
