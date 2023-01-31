/**
 * 對整個項目 api 的管理
 */

import request from './request';

export default {
  // home 組件，左側表格數據獲取
  getTableData: (params) => {
    return request({
      url: '/tableData',
      method: 'get',
      data: params,
      isMock: true,
    });
  },

  getCountData: (params) => {
    return request({
      url: '/countData',
      method: 'get',
      data: params,
      isMock: true,
    });
  },

  getChartData: (params) => {
    return request({
      url: '/chartData',
      method: 'get',
      data: params,
      isMock: true,
    });
  },
};
