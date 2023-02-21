<template>
  <div class="user__header">
    <el-button
      type="primary"
      @click="dialogVisible
        = true"
    >+ 新增</el-button>
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

  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      title="新增用戶"
      width="45%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="formInline"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input
                v-model="formUser.name"
                placeholder="請輸入姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年齡">
              <el-input
                v-model="formUser.name"
                placeholder="請輸入年齡"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性別">
              <el-select
                v-model="formUser.genderLabel"
                placeholder="請選擇性別"
              >
                <el-option
                  label="男"
                  value="0"
                />
                <el-option
                  label="女"
                  value="1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="formUser.birth"
                type="date"
                placeholder="請選擇出生日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="地址">
            <el-input
              v-model="formUser.addr"
              placeholder="請輸入地址"
            />
          </el-form-item>
        </el-row>
        <el-row class="dialog__btnSection">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
          >新增</el-button>
        </el-row>
      </el-form>
    </el-dialog>
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

// getUserData's param
const config = reactive({
  total: 0,
  page: 1,
  name: ''
})
// getUserData for table
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

// handle user table's page
const changePage = (page) => {
  config.page = page;
  getUserData(config);
}

// handle search function
const formInline = reactive({
  keyword: ''
})
const handleSearch = () => {
  config.name = formInline.keyword;
  getUserData(config)
}

// show the dialog for adding user data
const dialogVisible = ref(false)
const handleClose = (done) => {
  ElMessageBox.confirm('確定關閉嗎')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// add user data
const formUser = reactive({
  name: '', // user's name
  age: '',
  genderLabel: '',
  birth: '',
  addr: '',
})
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

.dialog__btnSection {
  justify-content: flex-end;
}
</style>