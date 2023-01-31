import Mock from 'mockjs';
import homeApi from './mockData/home';

Mock.mock('/home/api/tableData', homeApi.getTableData);
Mock.mock('/home/api/countData', homeApi.getCountData);
Mock.mock('/home/api/chartData', homeApi.getChartData);
