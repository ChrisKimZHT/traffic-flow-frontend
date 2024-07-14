import { RedoOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { App, Table, Button, Row, Col, Input, Space } from 'antd';

const FaceView = () => {
  const { message, notification } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);



  return (
    <div className='face-view'>
      <div className='head-line'>
        <div className='title'><UserOutlined /> 车牌检索</div>
        <div className='operation'>
          <Button type='primary' className='btn' onClick={refreshData} shape='circle'><RedoOutlined /></Button>
        </div>
      </div>
    </div>
  );
}

export default FaceView;