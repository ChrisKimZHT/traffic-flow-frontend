import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoView from '../view/VideoView';
import VideoDetailView from '../view/VideoDetailView';
import TaskView from '../view/TaskView';


const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/video' element={<VideoView />} />
      <Route path='/video/:videoId' element={<VideoDetailView />} />
      <Route path='/task' element={<TaskView />} />
    </Routes>
  );
}

export default Router;