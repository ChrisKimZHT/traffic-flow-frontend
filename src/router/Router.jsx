import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoView from '../view/VideoView';


const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/video' element={<VideoView />} />
    </Routes>
  );
}

export default Router;