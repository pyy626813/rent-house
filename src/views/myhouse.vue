<style rel="stylesheet/scss" lang="scss" scoped>
  .myhouse {
    padding-bottom: 4rem;
    .add {
      position: fixed;
      bottom: 3.6rem;
      right: 2rem;
      font-size: 3rem;
      .iconfont {
        font-size: 2rem;
        color: #00AA98;
      }
    }
    .list-items {
      position: relative;
    }
    .rented {
      width: 5rem;
      height: 5rem;
      position: absolute;
      z-index: 50;
      right: 4rem;
      top: 1rem;
      background: url("../assets/images/rented.png") no-repeat;
      background-size: 5rem 4.5rem;
      opacity: 0.5;
    }

    .btn-myhouse {
      position: absolute;
      top: 35%;
      left: 40%;
      button {
        background-color: #00AA98;
      }
    }

    .noHouses {
      font-size: 20px;
      text-align: center;
      padding-top: 20%;
      color: #00AA98;
    }
  }
</style>
<template>
  <div class="myhouse">
    <div class="btn-myhouse" v-if="!myAddress">
      <x-button type="primary" @click.native="getMyAddress">查看我的房源</x-button>
    </div>
    <div v-else-if="!houses || houses.length == 0" class="noHouses">
      暂无房源数据，点击右下角按钮新增一条吧！
    </div>
    <div v-else>
      <div class="list-items" v-for="house in houses" @click="toDetail(house.hash)">
        <dl class="clear">
          <dt>
            <img alt="thumbnail" data-role="img" data-offset-space=""
                 src="../assets/images/no-house.png">
          </dt>
          <dd>
            <div class="house-name name-icon icon-jing">
              {{house.title}}
            </div>
            <!-- 商铺列表页改版 2017 6月 只有fang 6 和 fang 7 有效 price_month_formate'],$data['price_month_type_formate -->
            <div class="house-info"><span class="house-area">{{typeName(house.type)}}</span><span class="house-area">{{house.roomSize}}</span>
              <!--<span class="house-area">朝南北</span>-->
            </div>
            <div class="house-addr" v-if="house.address && house.address.length > 0">
              <span class="house-area">{{getAddressNames(house.address)}}</span>
              <!--<span class="house-pulishtime">2小时前</span>-->
            </div>
            <div class="house-addr">
              <span class="house-area">发布时间：{{getTimeStr(house.deployTime)}}</span>
            </div>
            <div class="house-condition">
            </div>
            <div class="house-price">
              {{house.money}}<span>nas/月</span>
            </div>
          </dd>
        </dl>
        <div class="rented" v-if="house.rented">
        </div>
      </div>
    </div>

    <div class="add">
      <i class="iconfont icon-add" @click="addHouse"></i>
    </div>
  </div>
</template>
<style src="../assets/css/list_house.css" scoped></style>
<script>
  import {XButton, ChinaAddressV4Data} from 'vux'
  import house from '../lib/house.js';

  export default {
    components: {XButton},
    data() {
      return {
        myAddress: null,
        addressTimer: null,
        houses: []
      }
    },
    beforeRouteLeave(to, from, next) {
      clearTimeout(this.addressTimer);
      next()
    },
    mounted() {
      this.initAddress();
    },
    methods: {
      initAddress() {
        this.myAddress = this.$nasTool.myAddress;
        this.addressTimer = setTimeout(() => {
          this.initAddress();
        }, 1000);
      },
      addHouse() {
        this.$router.push({
          name: 'addHouse'
        })
      },
      initMyHouse() {
        var rs = [];

        this.$vux.loading.show({
          text: '加载中....'
        });
        house.getHouses((data) => {
          this.$vux.loading.hide()
          if (data && data.houses) {
            data.houses.forEach(h => {
              if (h.fromUser == this.myAddress) {
                rs.push(h);
              }
            })
          }
        });
        this.houses = rs;
      },
      getMyAddress() {
        this.$nasTool.pay({
          func: 'getAccount',
          //args: [],
        }, (res) => {
          if (res.code == '0') {
            this.myAddress = this.$nasTool.myAddress;
          }
        })
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
            if(name){
              addressNames.push(name);
            }
          });
        }
        return addressNames.join(' ');
      },
      getTimeStr(str){
        return str?moment(str).format('YYYY-MM-DD hh:mm'):'未知'
      },
      toDetail(houseId){
        this.$router.push({
          name:'detail',
          query:{
            id:houseId
          }
        })
      }
    },
    computed: {
      rentHouseTypes() {
        return this.$store.state.rentHouseTypes;
      },
    },
    watch: {
      myAddress(newVal, oldVal) {
        console.log('我的地址变化了', oldVal, '-', newVal)
        this.initMyHouse();
      }
    }
  }
</script>
