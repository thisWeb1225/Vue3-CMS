/**
 * 環境配置文件
 * 一般在企業級項目裡面有三個環境
 * 開發環境
 * 測試環境
 * 線上環境
 **/

// 當前環境
const env = import.meta.env.MODE || 'prod';

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: '/',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: '/home/api',
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: '/home/api',
  },
};

export default {
  env,
  // mock的總開關
  isMock: true,
  ...EnvConfig[env],
};
