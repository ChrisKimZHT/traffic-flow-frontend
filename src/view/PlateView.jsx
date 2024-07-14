import React, { useEffect, useState } from 'react';
import './PlateView.scss';
import { CarOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { App, Table, Button, Row, Col, Input, Space } from 'antd';
import service from '../service/service';

const PlateView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { message, notification } = App.useApp();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [plateStr, setPlateStr] = useState('');
  const [plateData, setPlateData] = useState([]);
  const [videoName, setVideoName] = useState('');

  const columns = [
    {
      title: '#',
      dataIndex: 'videoId',
      key: 'videoId',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const plateColumns = [
    {
      title: '#帧',
      dataIndex: 'frame_id',
      key: 'frame_id',
    },
    {
      title: '#框',
      dataIndex: 'box_id',
      key: 'box_id',
    },
    {
      title: '时间',
      dataIndex: 'frame_time',
      key: 'frame_time',
      render: (frame_time) => `${frame_time.toFixed(2)}s`,
    },
    {
      title: '车牌',
      dataIndex: 'plate',
      key: 'plate',
    },
  ]

  const refreshData = () => {
    setIsLoading(true);
    service.video.list().then(res => {
      let outputData = res.data.data;
      outputData = outputData.filter(item => item.plateProcessed === 2);
      for (let i = 0; i < outputData.length; i++) {
        outputData[i].key = i;
      }
      setTableData(outputData);
      setIsLoading(false);
    }).catch(err => {
      notification.error({
        message: '获取数据失败',
        description: `${err}`
      });
    });
  }

  const updateSelectedData = (selectedRow) => {
    const videoId = tableData[selectedRow].videoId;
    setSelectedVideoId(videoId);
    handleSearchPlate(videoId);
  }

  // eslint-disable-next-line
  useEffect(() => { refreshData(); }, []);

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
      updateSelectedData(selectedRowKeys);
    },
  }

  const handleSearchPlate = (_videoId = selectedVideoId) => {
    service.plate.search(_videoId, plateStr.length ? plateStr : '*').then(res => {
      const outputData = res.data.result;
      for (let i = 0; i < outputData.length; i++) {
        outputData[i].key = i;
      }
      setPlateData(outputData);
      setVideoName(res.data.video);
    }).catch(err => {
      notification.error({
        message: '获取数据失败',
        description: `${err}`
      });
    });
  }

  return (
    <div className='plate-view'>
      <div className='head-line'>
        <div className='title'><CarOutlined /> 车牌检索</div>
        <div className='operation'>
          <Button type='primary' className='btn' onClick={refreshData} shape='circle'><RedoOutlined /></Button>
        </div>
      </div>
      <Row className='row'>
        <Col span={8} className='col-left'>
          <div className='table-container'>
            <Table
              className='table'
              loading={isLoading}
              columns={columns}
              dataSource={tableData}
              bordered={true}
              rowSelection={rowSelection}
              pagination={{ position: ["bottomCenter"], pageSize: 7 }}
            />
          </div>
        </Col>
        <Col span={8} className='col-mid'>
          <div className='table-container'>
            <Table
              className='table'
              columns={plateColumns}
              dataSource={plateData}
              bordered={true}
              pagination={{ position: ["bottomCenter"], pageSize: 7 }}
            />
          </div>
        </Col>
        <Col span={8} className='col-right'>
          <div className='result-container'>
            <Space.Compact className='plate-input'>
              <Input addonBefore="车牌号" value={plateStr} onChange={(e) => { setPlateStr(e.target.value) }} />
              <Button type='primary' onClick={(e) => handleSearchPlate()} disabled={selectedRowKeys.length === 0}><SearchOutlined /></Button>
            </Space.Compact>
            <div className='img-list'>
              {plateData.map((item, index) => {
                const boxedImageUrl = `${window.baseURL}plate/getImage?video=${videoName}&imageType=boxed&boxId=${item.box_id}`;
                return (
                  <div key={index} className='plate-item'>
                    <img className='img' src={boxedImageUrl} loading='lazy' />
                  </div>
                )
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PlateView;