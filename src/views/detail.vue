<style rel="stylesheet/scss" lang="scss" scoped>
  .house-broker {
    .iconfont {
      color: #00AA98;
      font-size: .9rem;
    }
  }

  .house-header {
    .back {
      height: 2rem;
      line-height: 2rem;
      color: #00AA98;
      font-size: .8rem;
    }
    padding-top: 2.8rem;
  }

  .concat-me {
    line-height: 22px !important;
    font-size: .6rem !important;;
    color: #693a2f !important;
  }

  .rented {
    width: 5rem;
    height: 5rem;
    position: absolute;
    z-index: 200;
    right: 2rem;
    top: 2rem;
    background: url("../assets/images/rented.png") no-repeat;
    background-size: 5rem 4.5rem;
    opacity: 0.7;
  }
</style>
<template>
  <div>
    <my-head centerTitle="房源明细" @headBack="backList"></my-head>
    <div class="house-header cont-padding">
      <!--<div class="back" @click="backList"><i class="iconfont icon-fanhui"></i>返回</div>-->
      <div class="house-header-left">
        <h2>{{house.title}}</h2>
        <div class="tips-info clear">
          <div class="fl-l publish-time">
            发布时间：{{getTimeStr(house.deployTime)}}
          </div>
          <!--<div class="has-viewed">浏览4次</div>-->
        </div>
      </div>
      <div class="house-header-right" style="display: none;">
        <!--收藏贴子-->
        <a class="keep-item js-savePost" data-do-text="收藏" data-undo-text="已收藏">
          <div class="kicon"></div>
          <span data-role="text">收藏</span>
        </a>
      </div>
    </div>
    <div class="blank"></div>
    <div class="house-mian-info">
      <div class="cont-padding">
        <div class="house-price">
          <span class="price-value">{{house.money || 0}}</span>
          <span class="price-unit">nas/月</span><span class="price-type">(押一付一)</span>
          <a rel="nofollow" class="price-stages fl-r" href="">{{typeName(house.type)}}</a>
        </div>
        <div class="house-type">
          <span v-if="house.floor">{{house.floor}}</span>
          <span v-if="house.roomSize">{{house.roomSize}}㎡</span>
          <span v-if="house.decation">{{house.decation}}</span>
          <span>{{house.elevator?'有':'无'}}电梯</span>
        </div>
        <div class="house-info">
          {{getAddressNames(house.address)}}&nbsp;{{house.roomNo}}
        </div>
        <div class="line"></div>
      </div>
      <!--房屋配备-->
      <ul class="house-icon">
        <li v-for="device in devices" v-if="hasDevice(device.key)">
          <div class="icon" :class="device.icon"></div>
          <div class="text">{{device.name}}</div>
        </li>
      </ul>
      <!--房屋详情-->
      <div class="cont-padding">
        <div class="line"></div>
        <!--class="comm-area"-->
        <div class="comm-area js-moreBox">
          <div class="house-desc js-moreCont">
            <span class="portion">{{house.descr}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="house-against-v cont-padding clear">
      <span>无效、虚假、诈骗信息?</span>
      <a rel="nofollow" class="fl-r btn" @click="jubao">
        立即举报
        <i class="iconfont icon-xiangyou"></i>
      </a>
    </div>

    <div class="house-broker broker-float active">
      <div class="broker fl-l">
        <!--<div style="float: left">
          <span>刘志翔<em></em></span>
          <a data-role="link" href="" class="broker-link">TA的房源<i class="detail-icon next-icon"></i></a>
        </div>-->
        <div class="call-phone">
          <i class="iconfont icon-lianxi" style="float: left"></i><a v-bind:href="'tel:'+house.concatPhone"
                                                                     class="concat-me" @click="concatMe">联系房主</a>
        </div>
      </div>
      <a rel="nofollow" data-role="link" class="words fl-l" @click="rentNow" v-if="!rented">
        <i class="iconfont icon-zhifufangshi"></i><span>立即租房</span>
      </a>
      <a rel="nofollow" data-role="link" class="words fl-l" @click="rentNow" v-else>
        <span>已出租</span>
      </a>
      <div class="clear"></div>
    </div>

    <div class="rented" v-if="rented">
    </div>
  </div>
</template>
<style src="../assets/css/index.css" scoped></style>
<script>
  import MyHead from '../components/head';
  import house from '../lib/house.js';

  import {ChinaAddressV4Data} from 'vux'

  export default {
    components: {MyHead},
    data() {
      return {
        house: {},
        rented:0
      };
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        var id = this.$route.query.id;
        if (id) {
          this.$vux.loading.show({
            text: '加载中'
          });
          house.getHouse(id, (rs) => {
            this.house = rs || {};
            this.rented = this.house.rented || 0;
            this.$vux.loading.hide({
              text: '加载中'
            });
          });
        } else {
          this.$vux.alert.show({
            text: '数据不存在',
            onHide() {
              this.$router.push({
                name: 'search'
              })
            }
          });
        }
      },
      getTimeStr(str) {
        return str ? moment(str).format('YYYY-MM-DD hh:mm') : '未知'
      },
      backList() {
        this.$router.go(-1);
      },
      typeName(type) {
        var name = null;
        this.rentHouseTypes.forEach(rh => {
          if (rh.key == type) {
            name = rh.value;
            return false;
          }
        });
        return name;
      },
      getAddressNames(address) {
        var addressNames = [];
        if (address && address.length > 0) {
          var map = {};
          var length = address.length;
          address.forEach(ad => {
            map[ad] = true;
          });
          var nameMap = {};
          ChinaAddressV4Data.forEach(cv => {
            if (length == 0) {
              return false;
            }
            if (map[cv.value]) {
              nameMap[cv.value] = cv.name;
              delete map[cv.value];
              length--;//防止过多循环
            }
          });

          address.forEach(ad => {
            var name = nameMap[ad];
            if (name) {
              addressNames.push(name);
            }
          });
        }
        return addressNames.join(' ');
      },
      jubao() {
        this.$vux.toast.text('暂未实现');
      },
      hasDevice(key) {
        var devices = this.house.devices || [];
        var flag = false;
        devices.forEach(d => {
          if (d == key) {
            flag = true;
            return false;
          }
        });
        return flag;
      },
      concatMe() {
        if (!this.house.concatPhone) {
          this.$vux.toast.text('房东没有留下联系信息!');
        }
      },
      rentNow() {
        if (this.rented) {
          return;
        }
        this.house.rented = 1;
        house.addHouse(this.house, res => {
          if(res.code == 0){
            this.rented = 1;
          }
        }, this.house.money)
      }
    },
    computed: {
      rentHouseTypes() {
        return this.$store.state.rentHouseTypes;
      },
      devices() {
        return this.$store.state.devices;
      }
    },
  }
</script>
