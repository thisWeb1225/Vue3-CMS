import { createStore } from 'vuex';
import jsCookie from 'js-cookie';

export default createStore({
  state: {
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首頁',
        icon: 'home',
      },
    ],
    menu: [],
    token: '',
  },
  mutations: {
    updateIsCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
    },

    selectMenu(state, val) {
      // 判斷
      if (val.name === 'home') {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let addTab = state.tabsList.findIndex((item) => item.name === val.name);
        addTab === -1 ? state.tabsList.push(val) : '';
      }
    },

    closeTab(state, val) {
      let removeTag = state.tabsList.findIndex(
        (item) => item.name === val.name
      );
      state.tabsList.splice(removeTag, 1);
    },

    setMenu(state, val) {
      state.menu = val;
      // 刷新頁面後，Vuex 的資料會遺失，所以存到瀏覽器中
      localStorage.setItem('menu', JSON.stringify(val));
    },

    addMenu(state, router) {
      if (!localStorage.getItem('menu')) {
        return;
      }

      const menu = JSON.parse(localStorage.getItem('menu'));

      state.menu = menu;

      // 實現動態 router
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            let url = `../views/${item.url}.vue`;
            item.component = () => import(url);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menuArray.push(item);
        }
      });

      menuArray.forEach((item) => {
        router.addRoute('index', item);
      });
    },

    // 登出時清空 menu
    cleanMenu(state) {
      state.menu = [];
      localStorage.removeItem('menu');
    },

    setToken(state, val) {
      state.token = val;
      jsCookie.set('token', val);
    },

    clearToken(state) {
      state.token = '';
      jsCookie.remove('token');
    },

    getToken(state) {
      state.token = state.token || jsCookie.get('token');
    },
  },
});
