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
              蘋果: Math.floor(1000 + Math.random() * 2000),
              小米: Math.floor(1000 + Math.random() * 2000),
              華為: Math.floor(1000 + Math.random() * 2000),
              oppo: Math.floor(1000 + Math.random() * 2000),
              vivo: Math.floor(1000 + Math.random() * 2000),
              samsung: Math.floor(1000 + Math.random() * 2000),
            },
            {
              蘋果: Math.floor(1000 + Math.random() * 2000),
              小米: Math.floor(1000 + Math.random() * 2000),
              華為: Math.floor(1000 + Math.random() * 2000),
              oppo: Math.floor(1000 + Math.random() * 2000),
              vivo: Math.floor(1000 + Math.random() * 2000),
              samsung: Math.floor(1000 + Math.random() * 2000),
            },
            {
              蘋果: Math.floor(1000 + Math.random() * 2000),
              小米: Math.floor(1000 + Math.random() * 2000),
              華為: Math.floor(1000 + Math.random() * 2000),
              oppo: Math.floor(1000 + Math.random() * 2000),
              vivo: Math.floor(1000 + Math.random() * 2000),
              samsung: Math.floor(1000 + Math.random() * 2000),
            },
            {
              蘋果: Math.floor(1000 + Math.random() * 2000),
              小米: Math.floor(1000 + Math.random() * 2000),
              華為: Math.floor(1000 + Math.random() * 2000),
              oppo: Math.floor(1000 + Math.random() * 2000),
              vivo: Math.floor(1000 + Math.random() * 2000),
              samsung: Math.floor(1000 + Math.random() * 2000),
            },
            {
              蘋果: Math.floor(1000 + Math.random() * 2000),
              小米: Math.floor(1000 + Math.random() * 2000),
              華為: Math.floor(1000 + Math.random() * 2000),
              oppo: Math.floor(1000 + Math.random() * 2000),
              vivo: Math.floor(1000 + Math.random() * 2000),
              samsung: Math.floor(1000 + Math.random() * 2000),
            },
            {
              蘋果: Math.floor(1000 + Math.random() * 2000),
              小米: Math.floor(1000 + Math.random() * 2000),
              華為: Math.floor(1000 + Math.random() * 2000),
              oppo: Math.floor(1000 + Math.random() * 2000),
              vivo: Math.floor(1000 + Math.random() * 2000),
              samsung: Math.floor(1000 + Math.random() * 2000),
            },
          ],
        },
        videoData: [
          {
            name: '蘋果',
            value: 2120,
          },
          {
            name: '小米',
            value: 2120,
          },
          {
            name: '華為',
            value: 2120,
          },
          {
            name: 'oppo',
            value: 2120,
          },
          {
            name: 'vivo',
            value: 2120,
          },
          {
            name: 'samsung',
            value: 2120,
          },
        ],
        userData: [
          {
            date: '周一',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
          {
            date: '周二',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
          {
            date: '周三',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
          {
            date: '周四',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
          {
            date: '周五',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
          {
            date: '周六',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
          {
            date: '周日',
            new: Math.floor(Math.random() * 20),
            active: Math.floor(Math.random() * 200 + 50),
          },
        ],
      },
    };
  },
};
