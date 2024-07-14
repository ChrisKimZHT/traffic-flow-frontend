import { RedoOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { App, Table, Button, Row, Col, Input, Space } from 'antd';
import './FaceView.scss';
import service from '../service/service';

const FaceView = () => {
  const { message, notification } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [faceData, setFaceData] = useState([]);
  const [queryFace, setQueryFace] = useState([]);

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

  const faceColumns = [
    {
      title: '#脸',
      dataIndex: 'face_id',
      key: 'face_id',
    },
    {
      title: '#人',
      dataIndex: 'person_id',
      key: 'person_id',
    },
    {
      title: '#帧',
      dataIndex: 'frame_id',
      key: 'frame_id',
    },
    {
      title: '框',
      dataIndex: 'box',
      key: 'box',
      render: (box) => `(${box[0]}, ${box[1]}, ${box[2]}, ${box[3]})`,
    },
  ]

  const handleSearchAllFace = (videoId) => {
    service.face.searchAll(videoId).then(res => {
      let outputData = res.data.data;
      for (let i = 0; i < outputData.length; i++) {
        outputData[i].key = i;
      }
      setFaceData(outputData);
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
    handleSearchAllFace(videoId);
  }

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
      updateSelectedData(selectedRowKeys);
    },
  }

  const refreshData = () => {
    setIsLoading(true);
    service.video.list().then(res => {
      let outputData = res.data.data;
      outputData = outputData.filter(item => item.faceProcessed === 2);
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
      service.face.search(selectedFile, selectedVideoId).then(res => {
        message.success('搜索成功');
        const result = res.data.data;
        setQueryFace(result);
      }).catch(err => {
        notification.error({
          message: '上传失败',
          description: `${err}`
        });
      });
    });
    document.getElementById('fileInput').click();
  }

  // eslint-disable-next-line
  useEffect(() => { refreshData(); }, []);


  return (
    <div className='face-view'>
      <div className='head-line'>
        <div className='title'><UserOutlined /> 人脸检索</div>
        <div className='operation'>
          <Button type='primary' className='btn' onClick={handleUpload} shape='circle'><UploadOutlined /></Button>
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
              columns={faceColumns}
              dataSource={faceData}
              bordered={true}
              pagination={{ position: ["bottomCenter"], pageSize: 7 }}
            />
          </div>
        </Col>
        <Col span={8} className='col-right'>
          <div className='img-list'>
            {queryFace.map((item, index) => {
              const faceImage = `${window.baseURL}face/getImage?image=${item}`;
              return (
                <div key={index} className='plate-item'>
                  <img className='img' src={faceImage} loading='lazy' />
                </div>
              )
            })}
          </div>
        </Col>
      </Row>
      <input type="file" id="fileInput" style={{ display: "none" }} />
    </div>
  );
}

export default FaceView;