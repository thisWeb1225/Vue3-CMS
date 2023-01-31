/**
 * 二次封裝 axios
 * 需要先配置環境文件
 */

import axios from 'axios';
import config from '../config';
import { ElMessage } from 'element-plus';

const NETWORK_ERROR = '網路請求異常，請稍後重試。';

// 創建一個 axios 實例
const service = axios.create({
  baseURL: config.baseApi,
});
// 請求之前
service.interceptors.request.use((req) => {
  // 可以自定義 header
  // jwt-token 認證的時候
  return req;
});

// 請求之後
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  // 根據後端協商視情況而定
  // 這裡先自己寫
  if (code === 200) {
    return data;
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

// 封裝的核心函數
function request(options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  // 對 mock 的處理
  // 默認 isMock = true
  let isMock = config.isMock;
  if (typeof options.isMock !== 'undefined') {
    // 有傳 mock 過來就覆蓋默認值
    isMock = options.isMock;
  }

  // 對線上環境做處理
  if (config.env === 'prod') {
    // 若是線上環境，就不給 mock 的機會
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return service(options);
}

export default request;
