<template>
  <div class="tags">
    <el-tag
      class="tags__item"
      v-for="(tag, index) in tabsList"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
    {{ tag.label }}
  </el-tag>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const tabsList = store.state.tabsList;

const changeMenu = (tag) => {
  router.push({name: tag.name})
}

const handleClose = (tag, currentIndex) => {
  let totalIndex = tabsList.length - 1;
  store.commit('closeTab', tag)

  if (tag.name !== route.name) {
    return;
  }

  // 刪掉最後一個，自動跳到前一個
  if (currentIndex === totalIndex) {
    router.push({
      name: tabsList[currentIndex - 1].name
    })
  } 
  // 刪掉當前的，跳到下一個
  else {
    router.push({
      name: tabsList[currentIndex].name
    })
  }

}

</script>

<style scoped>
.tags {
  padding: 20px;
}
.tags__item {
  padding: 12px;
  cursor: pointer;
  margin-right: 12px;
}
</style>