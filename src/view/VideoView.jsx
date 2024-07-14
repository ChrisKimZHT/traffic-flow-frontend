import React, { useState, useEffect } from 'react';
import './VideoView.scss';
import { RedoOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { App, Button, Popconfirm, Table, Tag } from 'antd';
import service from '../service/service';
import parseFileSize from '../util/parseFileSize';
import { Link } from 'react-router-dom';

const VideoView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { message, notification } = App.useApp();

  const statusTag = (status, handleClick) => {
    let tag = null;
    if (status === 0) {
      tag = <Tag className='status-tag' color='red'>未分析</Tag>;
    } else if (status === 1) {
      tag = <Tag className='status-tag' color='blue'>运行中</Tag>;
    } else if (status === 2) {
      tag = <Tag className='status-tag' color='green'>已完成</Tag>;
    }
    return <Popconfirm
      title="确定运行任务?"
      description="任务提交后可前往任务列表查看进度。"
      onConfirm={handleClick}
      okText="确定"
      cancelText="取消"
    >
      {tag}
    </Popconfirm>
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
      key: 'statProcessed',
      render: (record) => statusTag(record.statProcessed, () => runStatistic(record.videoId)),
    },
    {
      title: '人脸分析',
      key: 'faceProcessed',
      render: (record) => statusTag(record.faceProcessed, () => runFaceDetection(record.videoId)),
    },
    {
      title: '车牌分析',
      key: 'plateProcessed',
      render: (record) => statusTag(record.plateProcessed, () => runPlateDetection(record.videoId)),
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => <Link to={`/video/${record.videoId}`}>详情</Link>,
    }
  ];

  const runStatistic = (videoId) => {
    service.task.runStatistic(videoId).then(res => {
      message.success('任务提交成功');
      refreshData();
    }).catch(err => {
      notification.error({
        message: '任务提交失败',
        description: `${err}`
      });
    });
  }

  const runPlateDetection = (videoId) => {
    service.task.runPlateDetection(videoId).then(res => {
      message.success('任务提交成功');
      refreshData();
    }).catch(err => {
      notification.error({
        message: '任务提交失败',
        description: `${err}`
      });
    });
  }

  const runFaceDetection = (videoId) => {
    service.task.runFaceDetection(videoId).then(res => {
      message.success('任务提交成功');
      refreshData();
    }).catch(err => {
      notification.error({
        message: '任务提交失败',
        description: `${err}`
      });
    });
  }

  const refreshData = () => {
    setIsLoading(true);
    service.video.list().then(res => {
      const outputData = res.data.data;
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

  const handleUpload = () => {
    let selectedFile = null;
    document.getElementById('fileInput').addEventListener('change', function () {
      selectedFile = this.files[0];
      service.video.upload(selectedFile).then(res => {
        message.success('上传成功');
        refreshData();
      }).catch(err => {
        notification.error({
          message: '上传失败',
          description: `${err}`
        });
      });
    });
    document.getElementById('fileInput').click();
  }

  useEffect(() => {
    refreshData()
    const interval = setInterval(refreshData, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='video-view'>
      <div className='head-line'>
        <div className='title'><VideoCameraOutlined /> 视频管理</div>
        <div className='operation'>
          <Button type='primary' className='btn' onClick={handleUpload} shape='circle'><UploadOutlined /></Button>
          <Button type='primary' className='btn' onClick={refreshData} shape='circle'><RedoOutlined /></Button>
        </div>
      </div>
      <Table
        className='table'
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        bordered={true}
        pagination={{ position: ["bottomCenter"] }}
      />
      <input type="file" id="fileInput" style={{ display: "none" }} />
    </div>
  );
}

export default VideoView;