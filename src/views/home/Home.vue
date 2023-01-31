<template>
  <el-row class="home" :gutter="20">
    <el-col :span="10" style="margin-top: 8px">
      <el-card shadow="hover">
        <div class="user">
          <div class="user__info">
            <img class="user__avatar" src="../../assets/images/user.jpg" alt="user" />
            <p class="user__name">Admin</p>
            <p class="user__role">職位：<span>管理者</span></p>
          </div>
          <div class="user-loginInfo">
            <p>上次登陸時間：<span>2023/1/30</span></p>
            <p>上次登陸地點：<span>台灣</span></p>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top:16px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, i) in tableLabel"
            :key="i"
            :prop="i"
            :label="val"
          />
          
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="14" style="margin-top: 8px">
      <div class="order">
        <el-card
        v-for="item in countData"
        :key="item.name"
        >
          <div class="order__card">
            <component class="icons order__icons" :is="item.icon"></component>
            <div class="order__detail">       
              <p class="order__detail-num">{{ item.name }}</p> 
              <p class="order__detail-text">數量：{{ item.value }}</p>
            </div>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin-top: 16px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref, reactive, getCurrentInstance } from 'vue';
import * as echarts from 'echarts'

const {proxy} = getCurrentInstance();

let tableData = ref([]);
let tableLabel = {
  name: '商品',
  todayBuy: '今日購買',
  monthBuy: '本月購買',
  totalBuy: '總購買'
}

let countData = ref([]);
let countLabel = {}

const getTableList = async () => {
  let res = await proxy.$api.getTableData()
  tableData.value = res.tableData
}

const getCountList = async () => {
  let res = await proxy.$api.getCountData()
  countData.value = res.countData;
}

// Echart 設定
let xOptions = reactive({
  title: {
    text: "訂單折線圖"
  },
  textStyle: {
    color: '#333',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#17b3a3',
      },
    },
    axisLabel: {
      interval: 0,
      color: '#333'
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#17b3a3',
      },
    },
  },
  
  series: []
})
let pieOptions = reactive({
  tooltip: {
    trigger: 'item',
  },
  color: ['#2ec7c9', '#b6a2de', '5ab1ef'],
  series: [],
})
let orderData = reactive({
  xData: [],
  series: [],
})
let userData = reactive({
  xData: [],
  series: [],
})
let videoData =reactive({
  series: [],
})

const getChartData = async () => {
  let result = await proxy.$api.getChartData()
  console.log(result)
  // countData.value = res.countData;
  let res = result.orderData;
  let userRes = result.userData;
  let videoData = result.videoData;

  orderData.xData = res.date;
  const keyArray = Object.keys(res.data[0]);
  const series = [];
  keyArray.forEach((key) => {
    series.push({
      name: key,
      data: res.data.map(item => item[key]),
      type: 'line'
    })
  })
  orderData.series = series;
  xOptions.xAxis.data = orderData.xData;
  xOptions.series = orderData.series;
  // 渲染
  let hEcharts = echarts.init(proxy.$refs['echart'])
  hEcharts.setOption(xOptions);
}
;

onMounted(() => {
  getTableList();
  getCountList();
  getChartData();
})


</script>

<style scoped>
.icons {
  width: 24px
}
.el-card {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: .4rem;
}
.order {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  grid-auto-flow: column;
}
.order__card {
  display: flex;
  gap: 16px;
  white-space: nowrap;
}

.order__detail {
  font-size: 0.8rem;
}
.user {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.user__info {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 16px;
  font-size: 0.9rem;
  
}
.user__avatar {
  width: 48px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  align-self: center;
}

.user__name {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  line-height: 1rem;
}
.user__role {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.user-loginInfo {
  font-size: 0.75rem;
  margin-top: 16px;
  color: #888;
}
</style>