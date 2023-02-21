<template>
  <div class="user__header">
    <el-button type="primary">+ 新增</el-button>
    <el-form
      :inline="true"
      :model="formInline"
      class="search"
    >
      <el-form-item label="搜尋：">
        <el-input
          v-model="formInline.keyword"
          placeholder="請輸入使用者的名字"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="handleSearch"
        >搜尋</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%"
      height="600px"
      class="table__main"
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item?.width"
      />

      <el-table-column
        fixed="right"
        label="Operations"
        width="120"
      >
        <template #default>
          <el-button
            link
            type="primary"
            size="small"
          >編輯</el-button>
          <el-button
            link
            type="danger"
            size="small"
          >刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="table__pagination"
    />
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref, reactive } from 'vue';

const { proxy } = getCurrentInstance()

const list = ref([]);
const tableLabel = reactive([
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'age',
    label: '年紀'
  },
  {
    prop: 'genderLabel',
    label: '性別',
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: 200
  },
  {
    prop: 'addr',
    label: '地址',
    width: 400,
  }
])

const config = reactive({
  total: 0,
  page: 1,
  name: ''
})

const getUserData = async (config) => {
  let res = await proxy.$api.getUserData(config);

  config.total = res.count
  list.value = res.list.map(item => {
    item.genderLabel = item.gender === 0 ? '女' : '男';
    return item;
  });
}

onMounted(() => {
  getUserData(config)
})

const changePage = (page) => {
  config.page = page;
  getUserData(config);
}

const formInline = reactive({
  keyword: ''
})

const handleSearch = () => {
  config.name = formInline.keyword;
  getUserData(config)
}
</script>

<style scoped>

.table {
  position: relative;
}

.table__main {
  max-height: 550px;
}

.table__pagination {
  margin-top: 24px
}

.user__header {
  display: flex;
}

.search {
  margin-left: auto;
}


</style>