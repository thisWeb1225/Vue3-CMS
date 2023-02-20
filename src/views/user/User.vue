<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      height="600px"
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
</script>

<style scoped>.el-pagination {
  margin-top: 24px
}</style>