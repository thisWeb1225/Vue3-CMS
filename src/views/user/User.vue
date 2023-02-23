<template>
  <div class="user__header">
    <el-button
      type="primary"
            @click="handleAdd"
          >+ 新增</el-button>
          <el-form
            :inline="true"
            :model="searchForm"
            class="search"
          >
            <el-form-item label="搜尋：">
              <el-input
                v-model="searchForm.keyword"
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
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                        @click="handleEdit(scope.row)"
                      >編輯</el-button>
                      <el-button
                        link
                        type="danger"
                        size="small"
                                  @click="handleDelete(scope.row)"
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
                          :title="isEditUser ? '編輯用戶' : '新增用戶'"
                          width="45%"
                          :before-close="handleClose"
                        >
                          <el-form
                            :inline="true"
                            :model="userForm"
                            ref="userFormRef"
                          >
                            <el-row>
                              <el-col :span="12">
                                <el-form-item
                                  label="姓名"
                                  prop="name"
                                  :rules="[{ required: true, message: '請輸入姓名' }]"
                                >
                                  <el-input
                                    v-model="userForm.name"
                                    placeholder="請輸入姓名"
                                  />
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item
                                  label="年齡"
                                  prop="age"
                                  :rules="[
                                    { required: true, message: '請輸入年齡' },
                                    { type: 'number', message: '年齡請輸入數字' },
                                  ]"
                                >
                                  <el-input
                                    v-model.number="userForm.age"
                                    placeholder="請輸入年齡"
                                  />
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="12">
                                <el-form-item
                                  label="性別"
                                  prop="genderLabel"
                                >
                                  <el-select
                                    v-model="userForm.gender"
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
                                <el-form-item
                                  label="出生日期"
                                  prop="birth"
                                  :rules="[{ required: true, message: '請輸入出生日期' }]"
                                >
                                  <el-date-picker
                                    v-model="userForm.birth"
                                    type="date"
                                    placeholder="請選擇出生日期"
                                    style="width: 100%"
                                  />
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-form-item
                                label="地址"
                                prop="addr"
                                :rules="[{ required: true, message: '請輸入地址' }]"
                              >
                                <el-input
                                  v-model="userForm.addr"
                                  placeholder="請輸入地址"
                                />
                              </el-form-item>
                            </el-row>
                            <el-row class="dialog__btnSection">
                              <el-button @click="handleDialogCancle">取消</el-button>
                              <el-button
                                type="primary"
                                @click="handleSubmit"
                              >確認</el-button>
                      </el-row>
                    </el-form>
                  </el-dialog>
                </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref, reactive } from 'vue';

const { proxy } = getCurrentInstance();

const list = ref([]);
const tableLabel = reactive([
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年紀',
  },
  {
    prop: 'genderLabel',
    label: '性別',
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: 200,
  },
  {
    prop: 'addr',
    label: '地址',
    width: 400,
  },
]);

// getUserData's param
const config = reactive({
  total: 0,
  page: 1,
  name: '',
});
// getUserData for table
const getUserData = async (config) => {
  let res = await proxy.$api.getUserData(config);

  config.total = res.count;
  list.value = res.list.map((item) => {
    item.genderLabel = item.gender === 0 ? '男' : '女';
    return item;
  });
};

onMounted(() => {
  getUserData(config);
});

// handle user table's page
const changePage = (page) => {
  config.page = page;
  getUserData(config);
};

// handle search function
const searchForm = reactive({
  keyword: '',
});
const handleSearch = () => {
  config.name = searchForm.keyword;
  getUserData(config);
};

/**
 * handle dialog
 */

// show the dialog for adding user data
const dialogVisible = ref(false);
const handleClose = (done) => {
  ElMessageBox.confirm('確定關閉嗎')
    .then(() => {
      proxy.$refs.userFormRef.resetFields();
      proxy.$refs.userFormRef.clearValidate();
      done();
    })
    .catch(() => {
      // catch error
    });
};

// cancle dialog
const handleDialogCancle = () => {
  proxy.$refs.userFormRef.clearValidate();
  dialogVisible.value = false;
};

/**
 * add or edit user data
 */
const userForm = reactive({
  name: '', // user's name
  age: '',
  gender: '',
  birth: '',
  addr: '',
});

// helper function
const timeFormat = (birth) => {
  let time = new Date(birth);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  function add(m) {
    return m < 10 ? '0' + m : m;
  }
  return `${year}-${add(month)}-${add(date)}`;
};

// when click the submit button
const handleSubmit = () => {
  proxy.$refs.userFormRef.validate(async (valid) => {
    if (valid) {
      if (!isEditUser.value) {
        // add user
        userForm.birth = timeFormat(userForm.birth);
        let res = await proxy.$api.addUser(userForm);
        if (res) {
          proxy.$refs.userFormRef.resetFields();
          proxy.$refs.userFormRef.clearValidate();
          dialogVisible.value = false;
          getUserData(config);
        }
      } else {
        // edit user
        console.log(userForm)
        userForm.birth = timeFormat(userForm.birth);
        let res = await proxy.$api.updateUser(userForm)
        if (res) {
          proxy.$refs.userFormRef.resetFields();
          proxy.$refs.userFormRef.clearValidate();
          dialogVisible.value = false;
          getUserData(config);
        }
      }
    }
  });
};

/**
 * Edit user
 */
// Determine if it is a new user
const isEditUser = ref(false);

// click edit user button
const handleEdit = (row) => {
  dialogVisible.value = true;
  isEditUser.value = true;
  row.gender === 0 ? (row.gender = '男') : (row.gender = '女');
  // shallow copy
  proxy.$nextTick(() => {
    Object.assign(userForm, row);
  });
};

// click add user button
const handleAdd = () => {
  dialogVisible.value = true;
  isEditUser.value = false;
};

/**
 * Delete user
 */
const handleDelete = (row) => {
  ElMessageBox.confirm('確定刪除嗎')
    .then(async () => {
      await proxy.$api.deleteUser({
        id: row.id
      })
      ElMessage({
        showClose: true,
        message: '刪除成功',
        type: 'success',
      })

      getUserData(config)
    })
    .catch((e) => {
      ElMessage({
        showClose: true,
        message: e,
      })
    });
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
  margin-top: 24px;
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
