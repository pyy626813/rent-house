<style rel="stylesheet/scss" lang="scss" scoped>
  .house-broker{
    .iconfont{
      color:#00AA98;
      font-size: .9rem;
    }
  }
</style>
<template>
  <div>
    <div class="house-header cont-padding">
      <div class="house-header-left">
        <h2>精装全配，拎包入住，交通方便，房型正气，成熟小区，彩光通透，</h2>
        <div class="tips-info clear">
          <div class="fl-l publish-time">
            2018-06-07
          </div>
          <div class="has-viewed">浏览4次</div>
        </div>
      </div>
      <div class="house-header-right">
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
          <span class="price-value">3600</span>
          <span class="price-unit">元/月</span><span class="price-type">(押一付三)</span>
          <a rel="nofollow" class="price-stages fl-r"  href="">房租分期<i class="detail-icon next-icon"></i></a>
        </div>
        <div class="house-type">

          <span>2室2厅1卫</span>
          <span>98㎡</span>
          <span>低层/共16层</span>
          <span>普通住宅</span>
          <span>精装修</span>
          <span>有电梯</span>
        </div>
        <div class="house-info">
        </div>
        <div class="line"></div>
      </div>
      <!--房屋配备-->
      <ul class="house-icon">
        <li>
          <div class="icon eq-dianshiji "></div>
          <div class="text ">电视</div>
        </li>
        <li>
          <div class="icon eq-kongtiao "></div>
          <div class="text ">空调</div>
        </li>
        <li>
          <div class="icon eq-reshuiqi "></div>
          <div class="text ">热水器</div>
        </li>
        <li>
          <div class="icon eq-xiyiji "></div>
          <div class="text ">洗衣机</div>
        </li>
        <li>
          <div class="icon eq-bingxiang "></div>
          <div class="text ">冰箱</div>
        </li>
        <li>
          <div class="icon eq-chuang "></div>
          <div class="text ">床</div>
        </li>
        <li>
          <div class="icon eq-shafa "></div>
          <div class="text ">沙发</div>
        </li>
        <li>
          <div class="icon eq-yigui "></div>
          <div class="text ">衣柜</div>
        </li>
        <li>
          <div class="icon eq-nuanqi "></div>
          <div class="text ">暖气</div>
        </li>
        <li>
          <div class="icon eq-kuandai "></div>
          <div class="text ">宽带网</div>
        </li>
        <li>
          <div class="icon eq-kezuofan "></div>
          <div class="text ">可做饭</div>
        </li>
        <li>
          <div class="icon eq-yangtai "></div>
          <div class="text ">独立阳台</div>
        </li>
        <li>
          <div class="icon eq-duliweishengjian "></div>
          <div class="text ">独卫</div>
        </li>
      </ul>
      <!--房屋详情-->
      <div class="cont-padding"><div class="line"></div>
        <!--class="comm-area"-->
        <div class="comm-area js-moreBox">
          <div class="house-desc js-moreCont">
                  <span class="portion">
                          *	.............所有房源真实有效，房源每天照片实地亲自拍摄..........	1；房子一直是房东自住的房子，室内加点家具配置齐全，干净清爽，很有家的感觉，	2；朝南户型，采光性很好。	3；房东人很和善，不会斤斤计较，日后的
                  </span>
          </div>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="house-against-v cont-padding clear">
      <span>无效、虚假、诈骗信息?</span>
      <a rel="nofollow" class="fl-r btn" href="">
        立即举报
        <i class="iconfont icon-xiangyou"></i>
      </a>
    </div>

    <div class="house-broker broker-float active">
      <div class="broker fl-l">
        <div style="float: left">
          <span>刘志翔<em></em></span>
          <a data-role="link" href="" class="broker-link">TA的房源<i class="detail-icon next-icon"></i></a>
        </div>
        <div class="call-phone">
          <i class="iconfont icon-lianxi"></i><span>联系TA</span>
        </div>
      </div>
      <a rel="nofollow" data-role="link" class="words fl-l" href="">
        <i class="iconfont icon-zhifufangshi"></i><span>立即租房</span>
      </a>
      <div class="clear"></div>                </div>
  </div>
</template>
<style src="../assets/css/index.css" scoped></style>
<script>
  export default {
    data() {
      return {};
    },
    mounted() {
      var id = this.$route.query.id;
    }
  }
</script>
