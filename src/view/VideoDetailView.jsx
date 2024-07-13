import { CheckCircleTwoTone, InfoCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoDetailView.scss';
import { App, Button, Col, Input, Row } from 'antd';
import parseFileSize from '../util/parseFileSize';
import dayjs from 'dayjs';
import service from '../service/service';

const VideoDetailView = () => {
  const { videoId } = useParams();
  const [videoInfo, setVideoInfo] = useState({});
  const { message, notification } = App.useApp();

  const refreshData = () => {
    service.video.getInfo(videoId).then(res => {
      setVideoInfo(res.data.data);
    }).catch(err => {
      notification.error({
        message: '获取视频信息失败',
        description: err.message
      });
    });
  }

  // eslint-disable-next-line
  useEffect(() => refreshData(), []);

  return (
    <div className='video-detail-view'>
      <Row className='row'>
        <Col span={18} className='col-left'>
          <div className='title'><VideoCameraOutlined /> 预览</div>
          <video className='video' controls preload='auto'>
            <source src={`${window.baseURL}video/getVideo?videoId=${videoId}`} type='video/mp4' />
          </video>
        </Col>
        <Col span={6} className='col-right'>
          <div className='title'><InfoCircleOutlined /> 信息</div>
          <Input className='info' addonBefore="编号" value={videoInfo?.videoId} disabled />
          <Input className='info' addonBefore="标题" value={videoInfo?.title} />
          <Input className='info' addonBefore="描述" value={videoInfo?.description} />
          <Input className='info' addonBefore="文件名称" value={videoInfo?.fileName} disabled />
          <Input className='info' addonBefore="文件大小" value={parseFileSize(videoInfo?.fileSize)} disabled />
          <Input className='info' addonBefore="上传时间" value={dayjs.unix(videoInfo?.uploadTime).format('YYYY-MM-DD HH:mm:ss')} disabled />
          <Button className='confirm-btn' type='primary'>
            <CheckCircleTwoTone /> 确认
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default VideoDetailView;