<template>
  <div class="common-layout">
    <el-container>
      <CommonAside></CommonAside>
      <el-container class="layout__r">
        <CommonHeader></CommonHeader>
        <CommonTab></CommonTab>
        <el-main class="layout__r-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTab from '../components/CommonTab.vue';
</script>

<style>
.layout__r {
  flex-direction: column;
}

.layout__r-main {
  padding-block: 0;
}

.common-layout {
  height: 100%;
  background-color: #EEEEEE;
}

.common-layout .el-container {
  height: 100%;
}

.common-layout .el-container .el-aside .el-menu {
  height: 100%;
}

</style>