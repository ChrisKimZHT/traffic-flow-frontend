import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { App, Button, Tag } from 'antd';
import { FileTextOutlined, RedoOutlined } from '@ant-design/icons';
import './TaskDetailView.scss';
import service from '../service/service';
import dayjs from 'dayjs';

const TaskDetailView = () => {
  const { taskId } = useParams();
  const [data, setData] = useState({});
  const { message, notification } = App.useApp();
  const logButtom = useRef(null);

  const refreshData = () => {
    service.task.log(taskId).then(res => {
      setData(res.data.data);
    }).catch(err => {
      notification.error({
        message: '获取数据失败',
        description: `${err}`
      });
    });
    logButtom.current.scrollIntoView();
  }

  useEffect(() => {
    refreshData()
    // const interval = setInterval(refreshData, 500);
    // return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const statusTag = (status) => {
    if (status === 0) {
      return <Tag className='status-tag' color='grey'>正在排队</Tag>
    } else if (status === 1) {
      return <Tag className='status-tag' color='blue'>正在运行</Tag>
    } else if (status === 2) {
      return <Tag className='status-tag' color='green'>运行成功</Tag>
    } else if (status === 3) {
      return <Tag className='status-tag' color='red'>运行失败</Tag>
    }
  }

  return (
    <div className='task-detail-view'>
      <div className='head-line'>
        <div className='title'><FileTextOutlined /> 运行日志</div>
        <div className='operation'>
          <Button type='primary' className='btn' onClick={refreshData} shape='circle'><RedoOutlined /></Button>
        </div>
      </div>
      <div className='status'>
        <span style={{ display: data.status === 1 ? "" : "none" }}>
          <span>已运行：</span>
          <span><Tag>{dayjs().diff(dayjs.unix(data.startTime), 'second')} sec</Tag></span>
        </span>
        <span>状态：</span>
        <span>{statusTag(data.status)}</span>
      </div>
      <div className='log' >
        {data.log}
        <div className='log-buttom' ref={logButtom}></div>
      </div>
    </div>
  );
}

export default TaskDetailView;