import Mock from 'mockjs';

export default {
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: '蘋果',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: '小米',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: '華為',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: 'vivo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: 'samsung',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
        ],
      },
    };
  },

  getCountData: () => {
    return {
      code: 200,
      data: {
        countData: [
          {
            name: '今日支付訂單',
            value: 210,
            icon: 'SuccessFilled',
            color: '#2ec7c9',
          },
          {
            name: '今日收藏訂單',
            value: 572,
            icon: 'StarFilled',
            color: '#2ec7c9',
          },
          {
            name: '今日未支付訂單',
            value: 48,
            icon: 'GoodsFilled',
            color: '#2ec7c9',
          },
          {
            name: '本月支付訂單',
            value: 2192,
            icon: 'SuccessFilled',
            color: '#2ec7c9',
          },
          {
            name: '本月收藏訂單',
            value: 3021,
            icon: 'StarFilled',
            color: '#2ec7c9',
          },
          {
            name: '本月未支付訂單',
            value: 623,
            icon: 'GoodsFilled',
            color: '#2ec7c9',
          },
        ],
      },
    };
  },

  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: [
            '20230126',
            '20230127',
            '20230128',
            '20230129',
            '20230130',
            '20230131',
          ],
          data: [
            {
              蘋果: Mock.Random.integer(1000, 3000),
              小米: Mock.Random.integer(1000, 3000),
              華為: Mock.Random.integer(1000, 3000),
              oppo: Mock.Random.integer(1000, 3000),
              vivo: Mock.Random.integer(1000, 3000),
              samsung: Mock.Random.integer(1000, 3000),
            },
            {
              蘋果: Mock.Random.integer(1000, 3000),
              小米: Mock.Random.integer(1000, 3000),
              華為: Mock.Random.integer(1000, 3000),
              oppo: Mock.Random.integer(1000, 3000),
              vivo: Mock.Random.integer(1000, 3000),
              samsung: Mock.Random.integer(1000, 3000),
            },
            {
              蘋果: Mock.Random.integer(1000, 3000),
              小米: Mock.Random.integer(1000, 3000),
              華為: Mock.Random.integer(1000, 3000),
              oppo: Mock.Random.integer(1000, 3000),
              vivo: Mock.Random.integer(1000, 3000),
              samsung: Mock.Random.integer(1000, 3000),
            },
            {
              蘋果: Mock.Random.integer(1000, 3000),
              小米: Mock.Random.integer(1000, 3000),
              華為: Mock.Random.integer(1000, 3000),
              oppo: Mock.Random.integer(1000, 3000),
              vivo: Mock.Random.integer(1000, 3000),
              samsung: Mock.Random.integer(1000, 3000),
            },
            {
              蘋果: Mock.Random.integer(1000, 3000),
              小米: Mock.Random.integer(1000, 3000),
              華為: Mock.Random.integer(1000, 3000),
              oppo: Mock.Random.integer(1000, 3000),
              vivo: Mock.Random.integer(1000, 3000),
              samsung: Mock.Random.integer(1000, 3000),
            },
            {
              蘋果: Mock.Random.integer(1000, 3000),
              小米: Mock.Random.integer(1000, 3000),
              華為: Mock.Random.integer(1000, 3000),
              oppo: Mock.Random.integer(1000, 3000),
              vivo: Mock.Random.integer(1000, 3000),
              samsung: Mock.Random.integer(1000, 3000),
            },
          ],
        },
        videoData: [
          {
            name: '蘋果',
            value: Mock.Random.integer(1000, 3000),
          },
          {
            name: '小米',
            value: Mock.Random.integer(1000, 3000),
          },
          {
            name: '華為',
            value: Mock.Random.integer(1000, 3000),
          },
          {
            name: 'oppo',
            value: Mock.Random.integer(1000, 3000),
          },
          {
            name: 'vivo',
            value: Mock.Random.integer(1000, 3000),
          },
          {
            name: 'samsung',
            value: Mock.Random.integer(1000, 3000),
          },
        ],
        userData: [
          {
            date: '周一',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
          {
            date: '周二',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
          {
            date: '周三',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
          {
            date: '周四',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
          {
            date: '周五',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
          {
            date: '周六',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
          {
            date: '周日',
            new: Mock.Random.integer(5, 20),
            active: Mock.Random.integer(50, 200),
          },
        ],
      },
    };
  },
};
