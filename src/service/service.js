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
