import axios from "axios";
import store from '../../store/index'
const baseURL = store.state.blog.baseURL;

axios.defaults.withCredentials = true;

function requestConfig(path:string) {
  let instance = axios.create({
    baseURL: 'http://127.0.0.1:3000', // 换成你自己的后台地址
    timeout: 10000,
  });
  return instance({
    url: path,
  });
}
function PageConfig(path:string, parmas:any):any {
  let instance:any = axios.create({
    baseURL: 'http://127.0.0.1:3000', // 换成你自己的后台地址
    timeout: 10000,
  });
  return instance({
    url: path,
    params: parmas,
  });
}
function PublishMessage(path:string, data:any) {
  let instance = axios.create({
    baseURL: baseURL,// 换成你自己后台地址
  });
  return instance({
    url: path,
    method: "post",
    data: data
  });
}

export { requestConfig, PublishMessage, PageConfig };