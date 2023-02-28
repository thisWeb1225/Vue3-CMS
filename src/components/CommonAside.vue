<template>
  <el-aside :width="!$store.state.isCollapse ? 
  'auto' : '200px'">
    <el-menu 
      class="el-menu-vertical-demo" 
      background-color="#1D1D3F" 
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h2 v-if="$store.state.isCollapse">後台管理</h2>
      <h2 v-else>後台</h2>
      <el-menu-item 
        v-for="item in noChildren()" 
        :index="item.path" 
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu 
        v-for="item in hasChildren()"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item 
            v-for="subItem in item.children"
            :index="subItem.path" 
            :key="subItem.path"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

// mock data
const list = [
  {
    path: '/user',
    name: 'user',
    label: '用戶管理',
    icon: 'user',
    url: 'UserManage/UserManage',
  },
  {
    path: '/other',
    label: '其它',
    icon: 'location',
    children: [
      {
        path: '/page1',
        name: 'page1',
        label: '頁面1',
        icon: 'setting',
        url: 'Other/PageOne',
      },
      {
        path: '/page2',
        name: 'page2',
        label: '頁面2',
        icon: 'setting',
        url: 'Other/PageTwo',
      }
    ]
  },
]

// 需要將 vuex 的資料儲存到 localStorage 以達到數據持久化
// 並用 addMenu 去抓 localStorage 的資料
store.commit('addMenu', router)

// real data
const asyncList = store.state.menu;

const noChildren = () => {
  return asyncList.filter(item => !item.children);
}
const hasChildren = () => {
  return asyncList.filter(item => item.children);
}


const clickMenu = (item) => {
  // 控制路由
  router.push({name:item.name})
  
  // 控制麵包屑 menu
  store.commit('selectMenu', item)
}

</script>

<style scoped>
.icons {
  min-width: 18px;
  height: 18px;
  margin-right: 4px;
}

.el-menu {
  border-right: none;
}

.el-menu h2 {
  margin: 0;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  padding-block: 24px;
}
</style>