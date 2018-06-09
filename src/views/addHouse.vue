<style rel="stylesheet/scss" lang="scss" scoped>
  .add-house{
    padding-top: 2.2rem;
  }
</style>
<template>
  <div class="add-house">
    <my-head centerTitle="新增房源" rightTitle="完成" @headBack="back" @rightClick="addHouse"></my-head>
    <!--<div class="back" @click="backList"><i class="iconfont icon-fanhui"></i>返回</div>-->
    <group>
      <x-input title="标题" v-model="title"></x-input>
    </group>
    <group>
      <x-input title="标题" v-model="money"></x-input>
      <cell title="房租(月)" is-link></cell>
    </group>
  </div>
</template>
<script>
  import {Group, XInput,Cell} from 'vux'
  import MyHead from '../components/head';

  export default {
    components: {MyHead,Group, XInput,Cell},
    data(){
      return {
        title:null,//标题
        money:null,//房租
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      addHouse(){

      }
    }
  }
</script>
