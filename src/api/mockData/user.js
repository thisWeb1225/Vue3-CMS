import Mock from 'mockjs';

function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return;
  }

  /**
   * 將雙引號替換為反斜線和雙引號的序列，以使JSON字串具有有效的引號格式。
   * 將&符號替換為逗號和雙引號的序列，以將query string轉換為JSON字串中的一組鍵值對。
   * 將等號替換為冒號，以將鍵和值分隔開
   */

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
    const { name, page = 1, limit = 20 } = param2Obj(config.url);

    // search name
    const nameFilterList = List.filter((user) => {
      if (user.name.indexOf(name) === -1) return false;
      else return true;
    });

    const pageList = nameFilterList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );

    return {
      code: 200,
      data: {
        list: pageList,
        count: List.length,
        totalPage: List.length / pageList.lengthv,
      },
    };
  },

  /**
   * @typedef {Object} Config
   * @property {String} url - the mock api's url
   * @property {String} type - post | get
   * @property {Object} body - the data of post，is a JSON
   *
   * @param {Config} config
   * @return {{code: number, data: {message: string}}}
   */

  addUser: (config) => {
    const { name, addr, age, birth, gender } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    console.log(config);
    List.unshift({
      id: Mock.Random.guid(),
      name,
      addr,
      age,
      birth,
      gender,
    });

    return {
      code: 200,
      data: {
        message: '添加成功',
      },
    };
  },

  updateUser: (config) => {
    const { id, name, addr, age, birth, gender } = JSON.parse(config.body);

    const genderNum = parseInt(gender);
    console.log(gender, genderNum);
    List.some((user) => {
      if (user.id === id) {
        user.name = name;
        user.addr = addr;
        user.age = age;
        user.birth = birth;
        user.gender = genderNum;
      }
    });

    return {
      code: 200,
      data: {
        message: '修改成功',
      },
    };
  },

  deleteUser: (config) => {
    const { id } = param2Obj(config.url);
    if (!id) {
      return {
        code: 200,
        messgae: '參數不正確',
      };
    } else {
      List = List.filter((user) => user.id !== id);
      return {
        code: 200,
        message: '刪除成功',
      };
    }
  },
};
