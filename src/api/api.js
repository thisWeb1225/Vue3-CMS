/**
 * 對整個項目 api 的管理
 */

import request from './request';

export default {
  // home 組件，左側表格數據獲取
  getTableData: (params) => {
    return request({
      url: '/home/api/tableData',
      method: 'get',
      data: params,
      isMock: true,
    });
  },

  getCountData: (params) => {
    return request({
      url: '/home/api/countData',
      method: 'get',
      data: params,
      isMock: true,
    });
  },

  getChartData: (params) => {
    return request({
      url: '/home/api/chartData',
      method: 'get',
      data: params,
      isMock: true,
    });
  },

  getUserData: (params) => {
    return request({
      url: '/user/getUser',
      method: 'get',
      data: params,
      mock: true,
    });
  },

  addUser: (params) => {
    return request({
      url: '/user/add',
      method: 'post',
      data: params,
      mock: true,
    });
  },
};
