<template>
  <el-header>
    <div class="l-content">
      <!-- icon -->
      <el-button size="small" plain @click="handleCollapse">
        <el-icon :size="15">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="currentMenu.path" v-if="currentMenu">{{ currentMenu.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImage('user')" alt="user" >
         </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>個人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getImage = (user) => {
  return new URL(`../assets/images/${user}.jpg`, import.meta.url).href;
}

const handleCollapse = () => {
  store.commit('updateIsCollapse');
}

let currentMenu = computed(() => {
  return store.state.currentMenu;
})


</script>

<style scoped>
.el-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: #fff;
}
.r-content .user {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.l-content {
  display: flex;
  align-items: center;

}

.el-button {
  margin-right: 16px;
}

</style>