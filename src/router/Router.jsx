import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoView from '../view/VideoView';
import VideoDetailView from '../view/VideoDetailView';
import TaskView from '../view/TaskView';
import StatView from '../view/StatView';
import TaskDetailView from '../view/TaskDetailView';


const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/video' element={<VideoView />} />
      <Route path='/video/:videoId' element={<VideoDetailView />} />
      <Route path='/stat' element={<StatView />} />
      <Route path='/task' element={<TaskView />} />
      <Route path='/task/:taskId' element={<TaskDetailView />} />
    </Routes>
  );
}

export default Router;