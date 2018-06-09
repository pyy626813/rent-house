<template>
  <div class="headNav fix" :class="{'fixed':fixed}">
    <div class="leftNav">
      <i v-if="showLeft" class="iconfont icon-fanhui" @click="headBack"></i>
    </div>
    <div class="centerTitle ell">
      {{centerTitle}}
    </div>
    <img class="imageSrc" v-if="imageSrc" :src="imageSrc">
    <div class="rightTitle" v-text="rightTitle" :class="rightClass" @click="rightClick">
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  input{
    background-color: rgba(0,0,0,0);
    color: #fff;
    text-align: center;
  }
  .leftNav{
    flex: 0 0 18%;
  }

  .icon-fanhui{
    display: inline-block;
    font-size: 1.3rem;
    height: 2.2rem;
    line-height: 2.2rem;
    color: #FFFFFF;
  }
  .fixed{
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }
  .headNav {
    display: flex;
    background: #00AA98;
    background-size: cover;
    height: 2.2rem;
    padding: 0 .75rem;
    box-sizing: border-box;

  >.centerTitle{
     color: white;
     font-size: .9rem;
     flex: 1;
     text-align: center;
     line-height: 2.2rem;
     height: 2.2rem;
   }
  >.rightTitle{
     flex:  0 0 20%;
     height: 2.2rem;
     font-size: .8rem;
     text-align: right;
     line-height: 2.2rem;
     color: white;
   }
  >.imageSrc{
     float: right;
  	 margin-top: .55rem;
     width: 1.1rem;
     height: 1.1rem;
   }
  }
  .centerTitle input{
    font-size: .85rem;
  }
</style>
<script>

  export default{
    props: {
    	imageSrc:'',
      centerTitle:'',
      rightTitle:'',
      fixed:{
        default:true,
      },
      showLeft:{
    	  type:Boolean,
    	  default:true
      },
      rightClass:null
    },
    data(){
      return {
      }
    },
    methods: {
      headBack(){
        this.$emit('headBack');
      },
      rightClick(){
        this.$emit('rightClick');
      }
    }

  }
</script>
