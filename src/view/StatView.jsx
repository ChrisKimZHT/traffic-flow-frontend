import { AreaChartOutlined, RedoOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './StatView.scss';
import { App, Table, Button, Row, Col } from 'antd';
import service from '../service/service';

const StatView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { message, notification } = App.useApp();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

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

  const refreshData = () => {
    setIsLoading(true);
    service.video.list().then(res => {
      let outputData = res.data.data;
      outputData = outputData.filter(item => item.statProcessed === 2);
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

  return (
    <div className='stat-view'>
      <div className='head-line'>
        <div className='title'><AreaChartOutlined /> 流量分析</div>
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
        <Col span={16} className='col-right'>
          <video className='video' controls preload='auto' key={selectedVideoId}>
            <source src={`${window.baseURL}stat/resultVideo?videoId=${selectedVideoId}`} type='video/mp4' />
          </video>
          <Row className='img-row' style={{ display: selectedVideoId === null ? 'none' : '' }}>
            <Col span={12} className='img-col-left'>
              <img className='img' src={`${window.baseURL}stat/resultPlot?videoId=${selectedVideoId}&plotName=count_per_frame.png`} alt='stat' />
            </Col>
            <Col span={12} className='img-col-right'>
              <img className='img' src={`${window.baseURL}stat/resultPlot?videoId=${selectedVideoId}&plotName=count_prefix_sum.png`} alt='stat' />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default StatView;