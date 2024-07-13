import axios from "axios";

const { baseURL } = window;


const service = {
  root: () => {
    return axios({
      baseURL,
      method: 'get',
      url: '/'
    })
  }
}

export default service;
