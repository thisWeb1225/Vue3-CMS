# Vue 3 後台管理系統 練習

Vue3 + Vite + Vue Router + Vuex + Element plus + mock.js + axios + EChart
---

下面是練習時做的筆記，僅供參考。

## 利用 mock.js 來模擬後端數據 
[mock.js 文檔地址](https://github.com/nuysoft/Mock/wiki)  
mockjs 目錄在 ./src/api/mockData/ 裡面，  
./src/api/mockData/home.js export 一個物件，裡面有一個函數會回傳 code 和 data，  
並在 ./src/api/mock.js 裡  
利用 `Mock.mock(url, template)` 來模擬後端接口地址和數據  
也可以利用 fastmock 這個網站去模擬線上接口

除此之外也有二次封裝 axios 來模擬實際開發情形

## 為甚麼要二次封裝 axios？
若有多個後端接口，就必須要重複寫 axios，每個接口又都要處理成功和失敗的情況，  
所以我們利用二次封裝 axios 來做請求前和請求後的統一處理。  
  
除此之外，也可以利用二次封裝來檢測現在的環境，若是線上環境就禁用 mock 數據。  
這樣後端可能若有多個接口，有可以根據單個接口是否完成來決定是否要用 mock 數據。因此二次封裝 axios 是很重要的

封裝的目錄在 ./src/api/request.js  

## 怎麼二次封裝 axios？
封裝的目錄在 ./src/api/request.js  
歡迎搭配程式碼參考  

首先要創建 axios 實例  
之後利用實例提供的攔截器(interceptors) 來針對 request 和 response  來處理  
request 是請求前，我們可以自定義 header 和 處理 token 認證
response 是請求後，可以根據請求後的狀況去做處理，例如 code 不對的時回傳後端寫好的錯誤訊息

接著就可以寫封裝的核心函數 request(options)  
先判斷 options.method 是甚麼，並默認 get  
若是 get 就讓 params = data

然後判斷是否為 mock

接著對環境做判斷，若是線上環境就禁止 mockApi

## 在用戶管理的頁面是如何將 200 名用戶資料拆分好幾頁呢？
在 ./src/api/mockData/user.js 中有一個 `param2Obh` 函數
```js
function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return;
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
```
他會接收一個 url 參數，並使用 `decodeURIComponent` 來解碼URL的query string  
當我們在網址中傳遞一些參數時，例如 http://example.com/?name=John&age=30，這些參數會被稱為query string，以 ? 開頭，各個參數用 & 分隔，而每個參數由鍵和值組成，由等號 = 分隔。  
```js
const url = new URL('http://example.com/?name=John%20Doe&age=30');
const search = url.split('?')[1];
const decodedSearch = decodeURIComponent(search);
console.log(decodedSearch);

// 輸出
// name=John Doe&age=30
```
處理完 URL 的解析函數後，我們在 `getUserList()` 函數會接收到前端傳回來的參數 config  
這個參數的值是 /user/getUser?total=200&page=3 的形式  
所以利用 `param2Obj` 來去處理 config 參數  

至於為什麼會是這個形式，是因為我們在 ./src/api/request.js 中有封裝好 axios


## 如何在 Vue3 中使用自己掛載到全局的變量
在 入口文件 main.js 中
```js
import api from './api/api';
app.config.globalProperties.$api = api;
```
這個 api 是引入自己寫的對整個項目的 api 管理，也就是下面的 getTableData
```js
// ./src/api/api.js

import request from './request';

export default {
  // home 組件，左側表格數據獲取
  getTableData: (params) => {
    return request({
      url: '',
      method: 'get',
      data: params,
      isMock: true,
    });
  },
};

```

接著在要使用的文件中獲得當前的 Vue 實例
```js
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

// 使用 $api
proxy.$api.getTableData()
```

## 權限管理
需要根據用戶登陸角色不同，返回左側的菜單欄也不同  
達到不同權限可以有不同操作  

1. 第一步需要新增登陸頁面 Login.vue
2. 登陸以後，返回左側菜單欄，`./src/api/mockData/permission.js` 裡模擬後端，並在 `./src/api/api.js` 設置全局的 api，最後一樣在 `./src/api/mock.js` 攔截 api
3. 儲存資料到 Vuex, aside 組件顯示出來

## 遇到的 CSS 問題
1. 用 grid 需要決定排序的方向，預設順序是由左至右，在由上至下，  
若要改成先由上至下，再由左至右，可以修改 `grid-auto-flow: column`