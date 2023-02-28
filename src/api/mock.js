import Mock from 'mockjs';
import homeApi from './mockData/home';
import userApi from './mockData/user';
import permissionApi from './mockData/permission';

Mock.mock('/home/api/tableData', homeApi.getTableData);
Mock.mock('/home/api/countData', homeApi.getCountData);
Mock.mock('/home/api/chartData', homeApi.getChartData);

// CRUD 使用者資料
Mock.mock(/user\/getUser/, 'get', userApi.getUserList);
Mock.mock(/user\/add/, 'post', userApi.addUser);
Mock.mock(/user\/edit/, 'post', userApi.updateUser);
Mock.mock(/user\/delete/, 'get', userApi.deleteUser);

// 登入 api
Mock.mock('/permission/getMenu', 'post', permissionApi.getMenu);