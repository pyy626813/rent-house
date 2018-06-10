import nasTool from './nasTool';

class House {
  //添加房源
  static addHouse(data, success,value = 0) {
    nasTool.pay({
      func: 'saveHouse',
      value:value,
      args: [data],
    }, success);
  }

  static getHouse(houseId,success){
    nasTool.get({
      func: 'getHouse',
      args: [houseId]
    }, rs => {
      success(rs.result ? JSON.parse(rs.result) : null);
    });
  }

  //获取所有房源
  static getHouses(success) {
    nasTool.get({
      func: 'getHouses',
      args: [100, -1]
    }, rs => {
      success(rs.result ? JSON.parse(rs.result) : null);
    });
  }
}

export default House;
