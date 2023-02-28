import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';

// vuex
import store from './store';

// element+
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// Mock.js
import './api/mock';

// 引入整個項目的 api 管理
import api from './api/api';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$api = api;

// 每次刷新頁面都要獲得 menu
store.commit('addMenu', router);

const checkRouter = (path) => {
  let hasCheck = router
    .getRoutes()
    .filter((route) => route.path === path).length;
  if (hasCheck) {
    return true;
  } else {
    return false;
  }
};

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.token;
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else if (!checkRouter(to.path)) {
    next({ name: 'home' });
  } else {
    next();
  }
});

app.use(router).use(store).mount('#app');


