import { CarryOutOutlined, RedoOutlined } from '@ant-design/icons';
import { App, Table, Button, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import service from '../service/service';
import dayjs from 'dayjs';
import './TaskView.scss';

const TaskView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { message, notification } = App.useApp();

  const statusTag = (status) => {
    if (status === 0) {
      return <Tag className='status-tag' color='grey'>排队中</Tag>
    } else if (status === 1) {
      return <Tag className='status-tag' color='blue'>运行中</Tag>
    } else if (status === 2) {
      return <Tag className='status-tag' color='green'>成功</Tag>
    } else if (status === 3) {
      return <Tag className='status-tag' color='red'>失败</Tag>
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'taskId',
      key: 'taskId',
    },
    {
      title: '视频编号',
      dataIndex: 'videoId',
      key: 'videoId',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (uploadTime) => dayjs.unix(uploadTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => statusTag(status),
    },
  ];

  const refreshData = () => {
    setIsLoading(true);
    service.task.list().then(res => {
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

  // eslint-disable-next-line
  useEffect(() => refreshData(), []);

  return (
    <div className='task-view'>
      <div className='head-line'>
        <div className='title'><CarryOutOutlined /> 任务列表</div>
        <div className='operation'>
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

export default TaskView;