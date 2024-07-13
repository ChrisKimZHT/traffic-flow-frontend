import React, { useState } from 'react';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import NavBar from './components/NavBar';
import Sider from 'antd/es/layout/Sider';
import './App.scss';
import Router from './router/Router';
import SiderMenu from './components/SiderMenu';
import { useLocation } from 'react-router-dom';

const App = () => {
  const pathname = useLocation().pathname;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='app'>
      <Header className='header'>
        <NavBar />
      </Header>
      <Layout hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint='xl'
          className='sider'
          theme='light'
        >
          <SiderMenu pathname={pathname} />
        </Sider>
        <Content className={`content ${collapsed ? "collapsed" : ""}`}>
          <Router />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
