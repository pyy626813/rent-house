<style rel="stylesheet/scss" lang="scss" scoped>
  .add-house {
    padding-top: 2.2rem;
  }

  .house-icon {
    padding: 1rem 0 0;
    overflow: hidden
  }

  .house-icon li {
    float: left;
    width: 16.6%;
    height: 2.8rem
  }

  .house-icon li .icon {
    width: 22px;
    height: 22px;
    background: url(../assets/images/house-device.png) no-repeat;
    background-size: auto 55px;
    margin: 0 auto;
    opacity: 0.5;
    color: #b3acac;
  }

  .house-icon li .text {
    text-align: center;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    margin-top: .28rem;
    color: #afaaaa;
  }

  .house-icon .hasdev {
    .icon {
      opacity: 1;
      color: #00AA98;
      background-image: url("../assets/images/house-device-has.png") !important;
    }
    .text {
      color: #00AA98;
    }
  }

  .house-icon li .text.gray {
    color: #dbdbdb;
    text-decoration: line-through
  }

  .house-icon li .gray {
    background-position-y: bottom
  }

  .house-icon li .eq-kuandai {
    background-position-x: 0
  }

  .house-icon li .eq-kongtiao, .house-icon li .eq-zhong_yan_kong_tiao {
    background-position-x: -27px
  }

  .house-icon li .eq-reshuiqi {
    background-position-x: -55px
  }

  .house-icon li .eq-xiyiji {
    background-position-x: -82px
  }

  .house-icon li .eq-bingxiang {
    background-position-x: -112px
  }

  .house-icon li .eq-duliweishengjian {
    background-position-x: -139px
  }

  .house-icon li .eq-ji_zhong_gong_nuan, .house-icon li .eq-nuanqi {
    background-position-x: -170px
  }

  .house-icon li .eq-yangtai {
    background-position-x: -200px
  }

  .house-icon li .eq-yigui {
    background-position-x: -230px
  }

  .house-icon li .eq-dianshiji, .house-icon li .eq-you_xian_dian_shi {
    background-position-x: -259px
  }

  .house-icon li .eq-kezuofan {
    background-position-x: -290px
  }

  .house-icon li .eq-shafa {
    background-position-x: -324px
  }

  .house-icon li .eq-chuang {
    background-position-x: -359px
  }

  .house-icon li .eq-weibolu {
    background-position-x: -394px
  }

  .house-icon li .eq-dian_ti, .house-icon li .eq-keti {
    background-position-x: -481px
  }

  .house-icon li .eq-huoti {
    background-position-x: -453px
  }

  .house-icon li .eq-futi {
    background-position-x: -423px
  }

  .house-icon li .eq-shui {
    background-position-x: -710px
  }

  .house-icon li .eq-tingchewei {
    background-position-x: -567px
  }

  .house-icon li .eq-ranqi {
    background-position-x: -510px
  }

  .house-icon li .eq-wangluo {
    background-position-x: -594px
  }

  .house-icon li .eq-dian {
    background-position-x: -626px
  }

  .house-icon li .eq-dianhua {
    background-position-x: -654px
  }

  .house-icon li .eq-mei_qi {
    background-position-x: -688px
  }

  .house-icon li .eq-shangshui {
    background-position-x: -710px
  }

  .house-icon li .eq-xiashui {
    background-position-x: -732px
  }

  .house-icon li .eq-guanmei {
    background-position-x: -754px
  }

  .house-icon li .eq-paiyan {
    background-position-x: -776px
  }

  .house-icon li .eq-paiwu {
    background-position-x: -798px
  }

  .house-icon li .eq-380v {
    background-position-x: -820px
  }

  .house-icon li .eq-keminghuo {
    background-position-x: -688px
  }

  .house-icon li .eq-waibaiqu {
    background-position-x: -842px
  }
</style>
<style rel="stylesheet/scss">
  .weui-switch:checked {
    border-color: #00AA98 !important;
    background-color: #00AA98 !important;
  }

  .weui-btn_primary {
    background-color: #00AA98 !important;
  }
</style>
<template>
  <div class="add-house">
    <my-head centerTitle="新增房源" @headBack="back"></my-head>
    <!--<div class="back" @click="backList"><i class="iconfont icon-fanhui"></i>返回</div>-->
    <group>
      <x-input title="标题" v-model="title" :required="true"></x-input>
    </group>
    <group>
      <x-input title="月租费用(nas)" v-model="money" text-align="right" :required="true" type="number"></x-input>
      <popup-radio title="性质" :options="rentHouseTypes" v-model="type"></popup-radio>
      <x-input title="楼层" v-model="floor" placeholder="如:3/6" text-align="right"></x-input>
      <x-switch title="电梯" v-model="elevator" :value-map="[0,1]"></x-switch>
      <x-input title="房间大小(㎡)" v-model="roomSize" text-align="right"></x-input>
      <popup-radio title="装修程度" :options="['精装修','普通装修']" v-model="decation"></popup-radio>
    </group>
    <group>
      <x-address title="地址" v-model="address" :list="addressData" placeholder="请选择地址"
                 :show.sync="showAddress"></x-address>
      <x-input title="门牌号" v-model="roomNo" text-align="right" placeholder="如:308室"></x-input>
      <x-input title="联系号码" v-model="concatPhone" text-align="right"></x-input>
    </group>
    <group>
      <ul class="house-icon">
        <li v-for="device in devices" :class="{hasdev:device.has}" @click="device.has==1?device.has=0:device.has=1">
          <div class="icon" :class="device.icon"></div>
          <div class="text">{{device.name}}</div>
        </li>
      </ul>
    </group>
    <group>
      <x-textarea :max="500" title="说明" v-model="descr"></x-textarea>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="addHouse">确定</x-button>
    </box>
  </div>
</template>
<script>
  import {Group, XInput, Cell, PopupRadio, XSwitch, XTextarea, XButton, Box, XAddress, ChinaAddressV4Data} from 'vux'
  import MyHead from '../components/head';
  import house from '../lib/house.js';

  export default {
    components: {MyHead, Group, XInput, Cell, PopupRadio, XSwitch, XTextarea, XButton, Box, XAddress},
    data() {
      return {
        title: null,//标题
        money: null,//房租
        type: 'A',//A:整租，B:单间
        floor: null,//楼层
        decation: '精装修',//装修程度
        elevator: 1,//是否电梯
        roomSize: null,
        descr: null,
        roomNo: null,
        concatPhone:null,//联系号码
        addressData: ChinaAddressV4Data,
        showAddress: false,
        address: []
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      addHouse() {
        var data = {
          title: this.title,
          money: this.money || 0,
          type: this.type,
          floor: this.floor,
          decation: this.decation,
          elevator: this.elevator,
          roomSize: this.roomSize,
          descr: this.descr,
          address: this.address,
          roomNo:this.roomNo,
          concatPhone:this.concatPhone,
          deployTime:new Date().getTime()
        };

        var devices_array = [];
        this.devices.forEach(dev => {
          if (dev.has) {
            devices_array.push(dev.key);
          }
        });
        data.devices = devices_array;
        var cur = this;
        var errorMsg = null;
        if(!data.title){
          errorMsg = '标题不能为空';
        }else if(data.money < 0){
          errorMsg = '月租费用不能小于0';
        }else if(data.address.length < 0){
          errorMsg = '请选择地址';
          this.showAddress = true;
        }else if(data.devices.length < 0){
          errorMsg = '总不至于什么设备都没有吧!';
        }
        if(errorMsg){
          this.$vux.toast.text(errorMsg);
          return;
        }
        house.addHouse(data, res => {
          if (res.code == 0) {
            this.$vux.toast.show({
              text: '新增成功!',
              onHide() {
                cur.$router.push({
                  name: 'myhouse'
                })
              }
            })
          }
        });
      }
    },
    computed: {
      rentHouseTypes() {
        return this.$store.state.rentHouseTypes;
      },
      devices() {
        return this.$store.state.devices;
      }
    }
  }
</script>
