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
  }
}

export default service;
