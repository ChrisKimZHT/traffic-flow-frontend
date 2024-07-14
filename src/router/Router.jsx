import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import VideoView from '../view/VideoView';
import VideoDetailView from '../view/VideoDetailView';
import TaskView from '../view/TaskView';
import StatView from '../view/StatView';
import TaskDetailView from '../view/TaskDetailView';
import PlateView from '../view/PlateView';
import FaceView from '../view/FaceView';


const Router = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/video' />} />
      <Route path='/video' element={<VideoView />} />
      <Route path='/video/:videoId' element={<VideoDetailView />} />
      <Route path='/stat' element={<StatView />} />
      <Route path='/face' element={<FaceView />} />
      <Route path='/plate' element={<PlateView />} />
      <Route path='/task' element={<TaskView />} />
      <Route path='/task/:taskId' element={<TaskDetailView />} />
    </Routes>
  );
}

export default Router;