import React, { useEffect, useState } from 'react';
import './SiderMenu.scss';
import { Menu } from 'antd';
import { VideoCameraOutlined, CarryOutOutlined, CarOutlined, UserOutlined, AreaChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    key: '/',
    label: '状态面板',
    icon: <DashboardOutlined />
  },
  {
    key: '/video',
    label: '视频管理',
    icon: <VideoCameraOutlined />
  },
  {
    key: '/stat',
    label: '流量分析',
    icon: <AreaChartOutlined />
  },
  {
    key: '/face',
    label: '人脸检索',
    icon: <UserOutlined />
  },
  {
    key: '/plate',
    label: '车牌检索',
    icon: <CarOutlined />
  },
  {
    key: '/task',
    label: '任务列表',
    icon: <CarryOutOutlined />
  },
];

const SiderMenu = ({ pathname }) => {
  const [selectedKeys, setSelectedKeys] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let select = '/';
    for (const item of menuItems) {
      if (pathname.startsWith(item.key)) {
        if (item.key.length > select.length) {
          select = item.key;
        }
      }
    }
    setSelectedKeys([select]);
  }, [pathname]);

  return (
    <Menu
      className='sider-menu'
      mode="inline"
      items={menuItems}
      selectedKeys={selectedKeys}
      onSelect={({ key }) => { setSelectedKeys([key]); navigate(key); }}
    />
  );
}

export default SiderMenu;