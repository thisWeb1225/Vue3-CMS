import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';

// vuex
import store from './store';

// element+
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(store).mount('#app');
