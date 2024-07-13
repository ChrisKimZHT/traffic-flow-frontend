import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <div className='nav-bar'>
      <Link to="/" className='title'>
        流量分析系统
      </Link>
    </div >
  );
}

export default NavBar;