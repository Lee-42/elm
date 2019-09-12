<template>
  <div>
  <!--这里是头部-->  
    <div>
      <v-header :seller="seller"></v-header>
    </div>
  <!--这里是导航栏-->  
    <div class="tab" >
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>           
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
  <!--这里是内容-->  
    <router-view></router-view>

  </div>
</template>

<script>

/*
 *导入header组件
 */
import Header from './components/header/Header.vue'
import Goods from './components/goods/Goods.vue'

const ERR_OK = 0;

export default {
  data() {
    return {
      seller:{}
    }
  },

  created() {
    this.$http.get('api/seller').then( (response) => {
      response = response.body
      // console.log(response.body)
      if(response.errno === ERR_OK){
        this.seller = response.data
        console.log(this.seller)
      }
    });
  },
  components: {
    'v-header':Header,
    'v-goods':Goods,
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">
  .tab {
    display :flex;
    width :100%;
    height :40px;
    line-height :40px;
    border-bottom :1px solid rgba(7,12,27,0.1);

    .tab-item {
      flex :1;
      text-align :center;

      a {
        text-decoration :none;
        display :block;
        font-size :15px;
        color :rgb(77,85,93);
      }
      .active{
        text-decoration :none;
        color:rgb(240,20,20);
      }
    }
  }

</style>
