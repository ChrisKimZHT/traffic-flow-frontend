import { VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';
import { useParams } from 'react-router-dom';
import './VideoDetailView.scss';

const VideoDetailView = () => {
  const { videoId } = useParams();

  return (
    <div className='video-detail-view'>
      <div className='head-line'>
        <div className='title'><VideoCameraOutlined /> 视频详情</div>
      </div>
      <video className='video' controls preload='auto'>
        <source src={`${window.baseURL}video/getVideo?videoId=${videoId}`} type='video/mp4' />
      </video>
    </div>
  );
}

export default VideoDetailView;