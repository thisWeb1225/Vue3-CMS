import Mock from 'mockjs';

export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    // 先判斷用戶使否存在
    // 判斷帳號密碼使否對應

    if (username === 'admin' && password == 'admin') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首頁',
              icon: 'house',
              url: 'home/Home',
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'message-box',
              url: 'mall/Index',
            },
            {
              path: '/user',
              name: 'user',
              label: '用戶管理',
              icon: 'user',
              url: 'user/User',
            },
            {
              label: '其它',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '頁面1',
                  icon: 'setting',
                  url: 'page1',
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '頁面2',
                  icon: 'setting',
                  url: 'page2',
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: '獲取成功',
        },
      };
    } else if (username === 'thisWeb' && password === 'thisWeb') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首頁',
              icon: 'house',
              url: 'home/Home',
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'message-box',
              url: 'mall/index',
            },
          ],
          token: Mock.Random.guid(),
          message: '獲取成功',
        },
      };
    } else {
      return {
        code: 200,
        data: {
          message: '密碼錯誤',
        },
      };
    }
  },
};
