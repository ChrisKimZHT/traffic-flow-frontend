import React, { useState, useEffect } from 'react';
import './VideoView.scss';
import { RedoOutlined, VideoCameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { App, Button, Table, Tag } from 'antd';
import service from '../service/service';
import parseFileSize from '../util/parseFileSize';
import { Link } from 'react-router-dom';

const VideoView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { message, notification } = App.useApp();

  const statusTag = (status) => {
    if (status === 0) {
      return <Tag color='red'>未分析</Tag>;
    } else if (status === 1) {
      return <Tag color='blue'>运行中</Tag>;
    } else if (status === 2) {
      return <Tag color='green'>已完成</Tag>;
    }
  }

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
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (fileSize) => parseFileSize(fileSize),
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      render: (uploadTime) => dayjs.unix(uploadTime).format('YYYY-MM-DD HH:mm:ss'),
      width: 160
    },
    {
      title: '流量分析',
      dataIndex: 'statProcessed',
      key: 'statProcessed',
      render: (statProcessed) => statusTag(statProcessed),
    },
    {
      title: '人脸分析',
      dataIndex: 'faceProcessed',
      key: 'faceProcessed',
      render: (faceProcessed) => statusTag(faceProcessed),
    },
    {
      title: '车牌分析',
      dataIndex: 'plateProcessed',
      key: 'plateProcessed',
      render: (plateProcessed) => statusTag(plateProcessed),
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => <Link to={`/video/${record.videoId}`}>详情</Link>,
    }
  ];

  const refreshData = () => {
    setIsLoading(true);
    service.video.list().then(res => {
      const outputData = res.data.data;
      setTableData(outputData);
      setIsLoading(false);
    }).catch(err => {
      notification.error({
        message: '获取数据失败',
        description: `${err}`
      });
    });
  }

  // eslint-disable-next-line
  useEffect(() => refreshData(), []);

  return (
    <div className='video-view'>
      <div className='head-line'>
        <div className='title'><VideoCameraOutlined /> 视频管理</div>
        <Button type='primary' onClick={refreshData} shape='circle'><RedoOutlined /></Button>
      </div>
      <Table
        className='table'
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        bordered={true}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
}

export default VideoView;