<template>
  <el-form
    :model="loginForm"
    class="login"
  >
    <h3 class="login__title">
      系統登陸
    </h3>
    <el-form-item>
      <el-input
        type="input"
        placeholder="請輸入帳號"
        v-model="loginForm.username"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        type="password"
        placeholder="請輸入密碼"
        v-model="loginForm.password"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="login"
      >登入</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();

const loginForm = reactive({
  username: 'admin',
  password: 'admin',
})

const login = async () => {
  const res = await proxy.$api.getMenu(loginForm);
  store.commit('setMenu', res.menu);
  store.commit('addMenu', router);
  router.push({
    name: 'home'
  })
}

</script>

<style scoped>
.login {
  width: 420px;
  background: #fdffff;
  border: 1px solid #e5e5e5;
  padding: 32px;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login__title {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 32px;
  color: #23232d;
}
</style>