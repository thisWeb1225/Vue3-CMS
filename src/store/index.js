import { createStore } from 'vuex';

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
  },
});
