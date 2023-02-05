<template>
  <div>
    user
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()

onMounted(() => {
  const getUserData = async () => {
    let res = await proxy.$api.getUserData()
    console.log(res)
  }
  getUserData()
})
</script>

<style lang="scss" scoped>

</style>