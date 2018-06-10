<style rel="stylesheet/scss" lang="scss">
  .house-search {
    padding-bottom: 4rem;
    .vux-no-group-title {
      margin-top: 0px !important;
    }
    .noHouses {
      text-align: center;
      font-size: .8rem;
      color: grey;
      padding-top: 5rem;
    }

    .clear-address{
      position: absolute;
      right: 1.6rem;
      top: .13rem;
      font-size: 1.1rem;
      font-weight: bold;
      width: 2rem;
      text-align: center;
      .iconfont {
        color: #999999;
      }
    }

    .refresh {
      position: fixed;
      bottom: 3.6rem;
      right: 2rem;
      font-size: 3rem;
      .iconfont {
        font-size: 2rem;
        color: #00AA98;
        border: 1px solid #e0dede
      }
    }
  }
</style>
<template>
  <div class="house-search">
    <group>
      <x-address title="" v-model="condtion_address" :list="addressData" placeholder="请选择地址"
                 :show.sync="showAddress" value-text-align="left">
        <!--<i class="iconfont icon-sousuo" slot="title"></i>-->
      </x-address>
    </group>
    <div>
      <div v-if="!houses || houses.length == 0" class="noHouses">
        暂无房源数据！
      </div>
      <div v-else>
        <div class="list-items" v-for="house in houses" @click="toDetail(house.hash)" v-if="filter(house.address)">
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
    </div>

    <div class="clear-address" v-if="condtion_address.length > 0">
      <i class="iconfont icon-qingkong" @click="condtion_address = []"></i>
    </div>
    <div class="refresh">
      <i class="iconfont icon-shuaxin" @click="refreshHouse"></i>
    </div>
  </div>
</template>
<style src="../assets/css/list_house.css" scoped></style>
<script>
  import house from '../lib/house.js';
  import {Group, XAddress, ChinaAddressV4Data} from 'vux'

  export default {
    components: {Group, XAddress},
    data() {
      return {
        name: '',
        addressData: ChinaAddressV4Data,
        showAddress: false,
        condtion_address: [],
        houses: []
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      toDetail(houseId) {
        this.$router.push({
          name: 'detail',
          query: {
            id: houseId
          }
        })
      },
      loadData() {
        var rs = [];
        this.$vux.loading.show({
          text: '加载中....'
        });
        house.getHouses((data) => {
          this.$vux.loading.hide()
          if (data && data.houses) {
            data.houses.forEach(h => {
              if (this.canSee(h)) {
                rs.push(h);
              }
            });
          }
        });
        this.houses = rs;
      },
      canSee(house) {
        if (house.rented) {
          return false;
        }
        return true;
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
      getTimeStr(str) {
        return str ? moment(str).format('YYYY-MM-DD hh:mm') : '未知'
      },
      filter(address) {
        if (this.condtion_address.length == 0) {
          return true;
        }

        var flag = true;
        this.condtion_address.forEach((ar, i) => {
          if (address.length >= i - 1) {
            if (address[i] != ar) {
              flag = false;
              return false;
            }
          }
        });
        return flag;
      },
      refreshHouse(){
        this.loadData();
      }
    },
    computed: {
      rentHouseTypes() {
        return this.$store.state.rentHouseTypes;
      }
    }
  }
</script>
