import axios from "axios";

const { baseURL } = window;


const service = {
  root: () => {
    return axios({
      baseURL,
      method: 'get',
      url: '/'
    })
  },
  video: {
    list: () => {
      return axios({
        baseURL,
        method: 'get',
        url: '/video/list'
      })
    },
    upload: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return axios({
        baseURL,
        method: 'post',
        url: '/video/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    getInfo: (videoId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/video/getInfo',
        params: {
          videoId
        }
      })
    },
    updateInfo: (videoId, title, description) => {
      return axios({
        baseURL,
        method: 'post',
        url: '/video/updateInfo',
        data: {
          videoId,
          title,
          description
        }
      })
    }
  },
  task: {
    list: () => {
      return axios({
        baseURL,
        method: 'get',
        url: '/task/list'
      })
    },
    runStatistic: (videoId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/task/runStatistic',
        params: {
          videoId
        }
      })
    },
    runPlateDetection: (videoId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/task/runPlateDetection',
        params: {
          videoId
        }
      })
    },
    runFaceDetection: (videoId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/task/runFaceDetection',
        params: {
          videoId
        }
      })
    },
    log: (taskId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/task/log',
        params: {
          taskId
        }
      })
    }
  },
  plate: {
    search: (videoId, plate) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/plate/search',
        params: {
          videoId,
          plate
        }
      })
    }
  },
  face: {
    searchAll: (videoId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/face/searchAll',
        params: {
          videoId
        }
      })
    },
    search: (file, videoId) => {
      const formData = new FormData();
      formData.append('file', file);
      return axios({
        baseURL,
        method: 'post',
        url: '/face/search',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          videoId
        }
      })
    },
  }
}

export default service;
