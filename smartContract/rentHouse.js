'use strict';

var RentContract = function () {


  //房屋数量
  LocalContractStorage.defineProperty(this, "houseNums");
  //用户数量
  LocalContractStorage.defineProperty(this, "userNums");

  //房屋
  LocalContractStorage.defineMapProperty(this, "houses");
  LocalContractStorage.defineMapProperty(this, "houseIndex");

  //用户
  LocalContractStorage.defineMapProperty(this, "users");

  LocalContractStorage.defineProperty(this, "adminAddress");

};

RentContract.prototype = {

  init : function() {

    this.adminAddress = "n1PjUo1btMbhsozGGfZwFBsFj8Bs4mPd7EG";
    this.houseNums = 0;
  },

  //添加房源
  saveHouse : function (house) {

    var fromUser = Blockchain.transaction.from,
        hash = Blockchain.transaction.hash,
      ts = Blockchain.transaction.timestamp;

    hash = house.hash ? house.hash : hash;

    var flag = this.houses.get(hash);

    if(house){
      house.fromUser = fromUser;
      house.hash = hash;
      house.ts = ts;
    }

    //插入
    if(!flag){
      this.houseIndex.set(this.houseNums, hash)
      this.houseNums += 1
    }

    this.houses.set(hash, house);

    return this.houseNums;
  },

  delHouse : function (hash) {

    this.houses.del(hash);
  },

  getHouse : function (hash) {
    return this.houses.get(hash);
  },

  getHouses : function (limit, offset) {

    var result = {
      total: 0,
      houses: []
    }
    var total = this.houseNums
    if (!total) {
      return result
    }
    result.total = total
    if (offset == -1) {
      offset = total - 1
    }

    for (var i = offset; i > offset - limit; i--) {
      var hash = this.houseIndex.get(i)
      var house = this.houses.get(hash)

      if(house){
        result.houses.push(house)
      }else {
        total--;
      }
    }
    return result;
  },

  saveUser(userInfo){

    var fromUser = Blockchain.transaction.from;

    userInfo.fromUser = fromUser;

    var flag = this.users.get(fromUser);

    if(!flag){
      this.userNums ++;
    }

    this.users.set(fromUser, userInfo);

    return this.userNums;
  },

  getUser(){

    var fromUser = Blockchain.transaction.from;

    var userInfo = this.users.get(fromUser);

    return userInfo;
  },

  getAccount(){
    var fromUser = Blockchain.transaction.from;
    var userInfo = this.users.get(fromUser) || {};
    userInfo.fromUser = fromUser
    return userInfo;
  },

  stats: function () {
    var result = {
      houseNums: this.houseNums,
      userNums: this.userNums
    }
    return result
  },

  withdraw: function (address, value) {

    var fromUser = Blockchain.transaction.from
    if (fromUser != this.adminAddress) {
      throw new Error("403")
    }

    var amount = new BigNumber(value * 1000000000000000000)
    var result = Blockchain.transfer(address, amount)
    return result
  }

}

module.exports = RentContract;
