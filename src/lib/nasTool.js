import nebulas from "nebulas";
import nebpayCls from "nebpay.js";
import Vue from 'vue';

//nas合约配置
var nasConfig = {
  name: "主网",
  contractAddress: "n1psFap63qHc4QHbAK1ip2zrL8BTJ9DgcHq",
  host: "https://mainnet.nebulas.io",
};

//设置查询服务器地址
var neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest(nasConfig.host));
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
          localStorage.setItem('myAddress', cur.myAddress || '');
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
  static get(conf, success) {
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
        args: JSON.stringify(conf.args)
      }
    }).then(resp => {
      success(resp);
      /*if (resp.execute_err && resp.execute_err != 'insufficient balance') {
        app.$refs.app.toast(resp.execute_err, 2000)
        throw new Error(resp.execute_err)
      }
      var result = JSON.parse(resp.result)
      return result*/
    }).catch(res => {
      this.hideLoading('服务异常');
    });
  }

  static pay(config, callback = () => {
  }) {
    var cur = this;
    var serialNumber; //交易序列号
    var intervalQuery; //定时查询交易结果

    //点击按钮发起交易, 这里为调用智能合约的例子
    var to = nasConfig.contractAddress;   //Dapp的合约地址
    var value = config.value || 0;
    var callFunction = config.func; //调用的函数名称
    var callArgs = config.args ? JSON.stringify(config.args) : '';  //参数格式为参数数组的JSON字符串, 比如'["arg"]','["arg1","arg2]'
    var options = {
      /*goods: {        //商品描述
        name: "example"
      },*/
      listener(v) {
        if (typeof v == 'string') {
          cur.hideLoading('已取消交易');
          callback({code: -2});
        } else if (v.txhash) {
          cur.showloading('查询交易状态');
        }
      }
      //callback: NebPay.config.mainnetUrl //在主网查询(默认值)
    };

    this.showloading('支付中....');
    //发送交易(发起智能合约调用)
    serialNumber = nebPay.call(to, value, callFunction, callArgs, options);

    //设置定时查询交易结果
    intervalQuery = setInterval(funcIntervalQuery, 10000); //建议查询频率10-15s,因为星云链出块时间为15s,并且查询服务器限制每分钟最多查询10次。

    //查询交易结果. queryPayInfo返回的是一个Promise对象.
    function funcIntervalQuery() {
      //queryPayInfo的options参数用来指定查询交易的服务器地址,(如果是主网可以忽略,因为默认服务器是在主网查询)
      nebPay.queryPayInfo(serialNumber, options)   //search transaction result from server (result upload to server by app)
        .then(function (resp) {
          console.log("tx result: " + resp)   //resp is a JSON string
          var respObject = JSON.parse(resp)
          //code==0交易发送成功, status==1交易已被打包上链
          if (respObject.code === 0) {
            var status = respObject.data.status;
            if (status == '2') {
              cur.showloading('查询交易状态');
              return;
            } else if (status == '1') {
              cur.hideLoading('交易成功...');
              clearInterval(intervalQuery);
              //当前用户钱包地址
              cur.myAddress = respObject.data.from;
              callback({code: 0, data: respObject.data.execute_result || null});
            } else {
              clearInterval(intervalQuery)
              cur.hideLoading('交易失败...');
              callback({code: -1});
            }
          }
        }).catch(function (err) {
        console.log(err);
      });
    }
  }

  static showloading(msg) {
    Vue.$vux.loading.show({
      text: msg || '加载中....'
    });
  }

  static hideLoading(msg) {
    Vue.$vux.loading.hide();
    if (msg) {
      Vue.$vux.toast.text(msg);
    }
  }
}

export default NasTool;

