import nebulas from "nebulas";
import nebpayCls from "nebpay.js";
import Vue from 'vue';

//nas合约配置
var nasConfig = {
  name: "主网",
  contractAddress: "n215LKqQW3SqtwYvhkHJ5RJMVKXdN62Pfdv",
  host: "https://mainnet.nebulas.io",
  payhost: "https://pay.nebulas.io/api/mainnet/pay"
};

var HttpRequest = nebulas.HttpRequest,
  Neb = nebulas.Neb,
  Account = nebulas.Account,
  Transaction = nebulas.Transaction,
  Unit = nebulas.Unit,
  Utils = nebulas.Utils;

var neb = new Neb();
//设置服务器地址
neb.setRequest(new HttpRequest(nasConfig.host));
var nebApi = neb.api;
var nebPay = new nebpayCls();

class NasTool {
  static init() {
    this.initAddress();
    nebApi.getNebState().then((resp) => {
      this.chain_id = resp.chain_id;
      /*app.$hub.nebState = resp
      app.$hub.nebState.chain_id = resp.chain_id*/
      console.log(resp)
    }).catch((error) => {
      alert("连接星云服务器失败！");
    });
  };

  //初始化钱包地址
  static initAddress() {
    var cur = this;
    if (this.isPc()) {
      window.addEventListener('message', function (e) {
        var d = e.data || {};
        if (d.type == 'webpackOk') {
          return;
        }
        if (d.data) {
          cur.myAddress = d.data.account || null;
          localStorage.setItem('myAddress', cur.myAddress);
        }
      });
      window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
      }, "*");
    } else {
      var myAddress = localStorage.getItem('myAddress');
      cur.myAddress = myAddress || null;
    }
  }

  //是否在pc端
  static isPc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  //在nas合约上查询信息
  static nasGet(conf, success) {
    console.log(1)
    nebApi.call({
      chainID: this.chain_id,
      from: conf.from || nasConfig.contractAddress,
      to: nasConfig.contractAddress,
      value: conf.value || 0,
      // nonce: nonce,
      gasPrice: conf.gasPrice || 1000000,
      gasLimit: conf.gasLimit || 2000000,
      contract: {
        function: conf.func,
        args: JSON.stringify(args)
      }
    }).then(resp => {
      console.log(2)
      console.log(resp);
      /*if (resp.execute_err && resp.execute_err != 'insufficient balance') {
        app.$refs.app.toast(resp.execute_err, 2000)
        throw new Error(resp.execute_err)
      }
      var result = JSON.parse(resp.result)
      return result*/
    });
    console.log(3)
  }

  //数据上链nas合约
  static nasPay(config) {
    var options = config.options,
      toAddress = config.address || nasConfig.contractAddress,
      serialNumber = "",
      _this = this;
    if (!options) {
      options = {
        callback: nasConfig.payhost,
        listener: function (value) {
          console.log("listener:", value, serialNumber)
          if (typeof value == 'string') {
            // _this.$notify({
            //     title: '错误',
            //     message: '用户取消了交易！',
            //     duration: 3000,
            //     type: 'error'
            // });
            console.log("用户取消了交易！")
            return
          }
          config.serialNumber = serialNumber
          config.txhash = value.txhash;

          // config.transStateNotify = _this.$notify({
          //     title: '正在获取交易状态',
          //     message: '如你不想等待状态查询，可点击关闭按钮。稍后刷新页面查看最新信息！',
          //     duration: 0,
          //     type: 'warning'
          // });
          console.log("正在获取交易状态……")

          _this.checkTransaction(config)
        }
      }
    }

    serialNumber = nebPay.call(
      toAddress,
      config.value || 0,
      config.func,
      JSON.stringify(config.data),
      options
    );
    // mylog("生成的serialNumber：", serialNumber)
  }

  static checkTransaction(config) {
    // var config = {
    //     serialNumber:serialNumber,
    //     successMsg:"更新信息成功",
    //     successFunc:this.xxxxx,
    //     context: this
    // }
    var serialNumber = config.serialNumber,
      context = config.context,
      minInterval = 6,
      intervalTime = config.intervalTime || minInterval,
      timeOut = config.timeOut || 60; //60秒后超时
    if (intervalTime < minInterval) { //API限制每分钟最多查询6次
      intervalTime = minInterval
    }
    var timeOutId = 0
    var timerId = setInterval(function () {
      // mylog("查询：", serialNumber)
      nebApi.getTransactionReceipt({
        hash: config.txhash
      }).then(function (receipt) {
        console.log(receipt)
        // status Transaction status, 0 failed, 1 success, 2 pending.
        // mylog("receipt:",receipt)

        if (receipt.status === 1) {
          clearInterval(timerId)
          // config.transStateNotify.close()
          //app.$refs.app.toast_state = false

          if (timeOutId) {
            clearTimeout(timeOutId)
          }

          if (config.successMsg) {
            // context.$message.success(config.successMsg)
            // context.$notify({
            //     title: '操作成功',
            //     message: config.successMsg,
            //     type: 'success'
            // });

            console.log(config.successMsg || "操作成功")
            //app.$refs.app.toast(config.successMsg || "操作成功", 2000)
          }
          if (config.successFunc) {
            setTimeout(function () {
              config.successFunc(receipt)
            }, 500)
          }
        } else if (receipt.status === 0) {
          console.log("合约调用失败！" + receipt.execute_result)
          //app.$refs.app.toast("合约调用失败！" + receipt.execute_result, 2000)
          clearInterval(timerId)
          if (timeOutId) {
            clearTimeout(timeOutId)
          }
        }
      }).catch(function (err) {
        // context.$message.error("查询交易结果发生了错误！" + err)
        console.log("查询交易结果发生了错误！" + err)
        //app.$refs.app.toast("查询交易结果发生了错误！" + err, 2000)
      });
    }, intervalTime * 1000)
    timeOutId = setTimeout(function () {
      // config.transStateNotify.close()
      //app.$refs.app.toast_state = false
      if (timerId) {
        // context.$message.error("查询超时！请稍后刷新页面查看最新内容！")
        console.log("查询超时！请稍后刷新页面查看最新内容！")
        //app.$refs.app.toast("查询超时！请稍后刷新页面查看最新内容！", 2000)
        clearInterval(timerId)
      }
    }, timeOut * 1000)
  }

  static addHouse(data, success) {

    //return;
    /*if(!this.myAddress){
      alert('请登录钱包');
      return;
    }*/
    this.nasPay({
      //address:this.myAddress,
      data: data
    });
  }

  static loading(show){
    Vue.$vux.loading.show({
      text: 'Loading'
    });
  }

  static getHouses() {

  }

  static checkAddress() {

  }
}

export default NasTool;

