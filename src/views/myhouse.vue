<style rel="stylesheet/scss" lang="scss" scoped>
  .myhouse{
    .add{
      position: absolute;
      bottom: 3.6rem;
      right: 2rem;
      font-size: 3rem;
      .iconfont {
        font-size: 2rem;
        color: #00AA98;
      }
    }
  }
</style>
<template>
  <div class="myhouse">
    <div class="list-items" @click="toDetail(1)">
      <dl class="clear">
        <dt>
          <img alt="thumbnail" data-role="img" data-offset-space=""
               src="../assets/images/no-house.png">
        </dt>
        <dd>
          <div class="house-name name-icon icon-jing">
            精装全配，拎包入住，交通方便，房型正气，成熟小区，彩光通透，
          </div>
          <!-- 商铺列表页改版 2017 6月 只有fang 6 和 fang 7 有效 price_month_formate'],$data['price_month_type_formate -->
          <div class="house-info"><span class="house-area">2室2厅</span><span class="house-area">98㎡</span><span class="house-area">朝南北</span>
          </div>
          <!-- 商铺列表页改版 2017 6月 end-->
          <div class="house-addr">
            <span class="house-area">九亭-九亭家园</span>
            <!--                  <span class="house-pulishtime">2小时前</span>
              -->
          </div>
          <div class="house-condition">
          </div>
          <!-- 商铺改版 非商铺价格展示-->
          <div class="house-price">
            3600<span>元/月</span>
          </div>
        </dd>
      </dl>
    </div>
    <div class="list-items" @click="toDetail(1)">
      <dl class="clear">
        <dt>
          <img alt="thumbnail" data-role="img" data-offset-space=""
               src="../assets/images/no-house.png">
        </dt>
        <dd>
          <div class="house-name name-icon icon-jing">
            精装全配，拎包入住，交通方便，房型正气，成熟小区，彩光通透，
          </div>
          <!-- 商铺列表页改版 2017 6月 只有fang 6 和 fang 7 有效 price_month_formate'],$data['price_month_type_formate -->
          <div class="house-info"><span class="house-area">2室2厅</span><span class="house-area">98㎡</span><span class="house-area">朝南北</span>
          </div>
          <!-- 商铺列表页改版 2017 6月 end-->
          <div class="house-addr">
            <span class="house-area">九亭-九亭家园</span>
            <!--                  <span class="house-pulishtime">2小时前</span>
              -->
          </div>
          <div class="house-condition">
          </div>
          <!-- 商铺改版 非商铺价格展示-->
          <div class="house-price">
            3600<span>元/月</span>
          </div>
        </dd>
      </dl>
    </div>
    <div class="list-items" @click="toDetail(1)">
      <dl class="clear">
        <dt>
          <img alt="thumbnail" data-role="img" data-offset-space=""
               src="../assets/images/no-house.png">
        </dt>
        <dd>
          <div class="house-name name-icon icon-jing">
            精装全配，拎包入住，交通方便，房型正气，成熟小区，彩光通透，
          </div>
          <!-- 商铺列表页改版 2017 6月 只有fang 6 和 fang 7 有效 price_month_formate'],$data['price_month_type_formate -->
          <div class="house-info"><span class="house-area">2室2厅</span><span class="house-area">98㎡</span><span class="house-area">朝南北</span>
          </div>
          <!-- 商铺列表页改版 2017 6月 end-->
          <div class="house-addr">
            <span class="house-area">九亭-九亭家园</span>
            <!--                  <span class="house-pulishtime">2小时前</span>
              -->
          </div>
          <div class="house-condition">
          </div>
          <!-- 商铺改版 非商铺价格展示-->
          <div class="house-price">
            3600<span>元/月</span>
          </div>
        </dd>
      </dl>
    </div>

    <div class="add">
      <i class="iconfont icon-add" @click="addHouse"></i>
    </div>
  </div>
</template>
<style src="../assets/css/list_house.css" scoped></style>
<script>
  export default {
    methods:{
      addHouse(){
        this.$router.push({
          name:'addHouse'
        })
      }
    }
  }
</script>
