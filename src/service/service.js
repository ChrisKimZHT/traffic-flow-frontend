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
    }
  },
  task: {
    runStatistic: (videoId) => {
      return axios({
        baseURL,
        method: 'get',
        url: '/task/runStatistic',
        params: {
          videoId
        }
      })
    }
  }
}

export default service;
