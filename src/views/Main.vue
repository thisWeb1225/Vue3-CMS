<template>
  <div class="common-layout">
    <el-container>
      <CommonAside></CommonAside>
      <el-container class="r-content">
        <CommonHeader></CommonHeader>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
</script>

<style>
.r-content {
  flex-direction: column;
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