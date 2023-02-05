import Mock from 'mockjs';

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

let List = [];
const COUNT = 200;
for (let i = 0; i < COUNT; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      age: Mock.Random.integer(18, 60),
      birth: Mock.Random.date(),
      gender: Mock.Random.integer(0, 1),
    })
  );
}

export default {
  /**
   * 獲取列表
   * 要帶參數 name, page, limit; name 可以不填, page,limit 有默認值
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  // getUserList: (config) => {
  //   const { name, page = 1, limit = 20 } = param2Obj(config.url);
  //   const mockList = List.filter((user) => {
  //     if (
  //       name &&
  //       user.name.indexOf(name) === -1 &&
  //       user.addr.indexOf(name === -1)
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   const pageList = mockList.filter(
  //     (item, index) => index < limit * page && index >= limit * (page - 1)
  //   );

  //   return {
  //     code: 200,
  //     data: {
  //       list: pageList,
  //       count: mockList.length,
  //     },
  //   };
  // },

  getUserList: (config) => {
    return {
      code: 200,
      data: {
        list: List,
      },
    };
  },
};
