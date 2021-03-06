import axios from "axios";
import Vue from "vue";
axios.defaults.baseURL = "http://127.0.0.1:3000";
const source = axios.CancelToken.source();
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // 成功请求到数据
    return response;
  },
  (error) => {
    // 响应错误处理
    return Promise.reject(error);
  }
);
export default {
  get: function(path = "", data = {}) {
    return new Promise(function(resolve, reject) {
      axios
        .get(path, {
          params: data,
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  post: function(path = "", data = {}) {
    return new Promise(function(resolve, reject) {
      axios
        .post(path, data)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  delete: function(path = "", data = {}) {
    return new Promise(function(resolve, reject) {
      axios
        .delete(path, { data: data })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  put: function(path = "", data = {}) {
    return new Promise(function(resolve, reject) {
      axios
        .put(path, data)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  all: function(list: any[]) {
    return new Promise(function(resolve, reject) {
      axios
        .all(list)
        .then(
          axios.spread(function(...result) {
            // 两个请求现在都执行完成
            resolve(result);
          })
        )
        .catch(function(error) {
          reject(error);
        });
    });
  },
};
