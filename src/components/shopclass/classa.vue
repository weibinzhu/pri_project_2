<template lang="html">
  <div class="navA">
    <header>
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 按钮 -->
    <nav class="flex">
      <li class="f1" v-for="(nav, index) in navList" :class="{li_hover: isHover === nav}" @click="liSort(nav, index)">{{ nav }}</li>
    </nav>
    <!-- 商品列表 -->
    <section class="shop_content">
      <!-- <ul> -->
      <transition-group name="slider" tag="ul">
        <li class="shop_list flex" v-for="(shop, index) in shopList" :key="shop.shopId">
          <!--<span class="shop_photos f1"><img :src="shop.shopImg"></span>-->
          <!--<router-link tag="span" class="shop_text f2" :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}">-->
            <!--<p>{{ shop.shopText }}</p>-->
            <!--<h4>￥{{ shop.shopPrice }}</h4>-->
            <!--<h5>销量{{ shop.shopVolume }}</h5>-->
          <!--</router-link>-->
          <router-link tag="span" class="shop_photos" :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}">
            <img :src="shop.shopImg">
          </router-link>
          <div class="shop_text_wrapper">
            <div>{{ shop.shopText }}</div>
            <div class="shop_text_price">￥{{ shop.shopPrice }}</div>
          </div>
        </li>
      </transition-group>
      <!-- </ul> -->
    </section>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Pbox from '@/components/prompt'
import Ajax from '@/module/ajax'
export default {
  name: 'navA',
  data () {
    return {
      title: '标题',
      isHover: '',
      navList: ['销量优先','价格高到低','价格低到高'],
      shopList: [
        {
          shopId: '1',
          shopImg: '',
          shopText: '加载中...',
          shopPrice: '0',
          shopVolume: '0'
        }
      ]
    }
  },
  computed:{
    pShow () {
      return this.$store.state.pShow
    },
  },
  components: { Goback, Pbox },
  methods: {
    // 对比方法
    compare (prop) {
      return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 > val2) {  // 大到小
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    // 排序
    liSort (menu, index) {
      this.isHover = menu.toString()
      if (index === 0) {
        this.shopList = this.shopList.sort(this.compare('shopVolume'))
      }
      if (index === 1) {
        this.shopList = this.shopList.sort(this.compare('shopPrice'))
      }
      if (index === 2) {
        this.shopList = this.shopList.sort(this.compare('shopPrice')).reverse()
      }
    },
    // 初始化数据
    getData () {
      let ajaxData = `category_id=${this.$route.params.num}`;
      let getSuccess = (data) => {
        if(data){
          let tempData = []
          for (let item of data){
            if(item.state!=0){
              tempData.push(item)
            }
          }
          this.shopList = tempData
        }else{
          this.$store.commit('promptText',{ text: '暂无数据' })
        }
      }
      let getError = (error) => {
        console.log(error)
      }
      if (this.$route.params.num === '330') {
        this.title = '精准医疗'
      }
      if (this.$route.params.num === '329') {
        this.title = '变美趁早'
      }
      if (this.$route.params.num === '328') {
        this.title = '冻龄抗衰'
      }
      if (this.$route.params.num === '315') {
        this.title = '营养辅助'
      }
      if (this.$route.params.num === '323') {
        this.title = '滋补贡品'
      }
      if (this.$route.params.num === '331') {
        this.title = '有机农产'
      }
      if (this.$route.params.num === '312') {
        this.title = '美妆个护'
      }
      if (this.$route.params.num === '311') {
        this.title = '智能穿戴'
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/getGoodslist', 'post', getSuccess, getError, ajaxData)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="css" scoped>
  .navA{ width: 100%; }
  nav{ width: 100%; height: 0.9rem; background-color: #fff; border-bottom: solid 1px #eee; }
  nav li{ text-align: center; line-height: 0.9rem; position: relative; }
  nav li::before{ position: absolute; content: ""; width: 1px; height: 0.6rem; background-color: #eee; top: 0.15rem; left: 0; }
  nav li:nth-child(1)::before{ width: 0; }
  nav .li_hover{ color: #8c8df6; font-size: 0.36rem; font-weight: 600; }
  /*商品内容*/
  .shop_content{ width: 100%; background-color: #fff}
  .shop_content ul{ width:100%; }
  .shop_content li{ width: 6.9rem; margin: 0.2rem auto; overflow: hidden; background-color: #fff; }
  .shop_photos{ height: 2.36rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 1.91rem 1.37rem; background-position: center center; background-repeat: no-repeat; }
  .shop_text{ padding: 0.2rem; }
  .list_content{ width: 100%; padding-top: 0.2rem; background-color: #fff}
  /*.shop_list{ width: 100%; overflow: hidden; background-color: #fff;}*/
  .shop_list {position: relative; width: 6.9rem; overflow: hidden; background-color: #fff; margin-bottom: 0.3rem; margin-left: auto; margin-right: auto; padding-bottom: 0.1rem; box-shadow: 0px 10px 38px 3px rgba(231,231,231,1);border-radius: 0.08rem}
  .shop_photos{ width: 100%; height: 3.6rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 2.7rem 1.93rem; background-position: center center; background-repeat: no-repeat; }
  .shop_text_wrapper{box-sizing:border-box; width: 100%; height: 1.6rem;display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 0.3rem; font-size: 0.32rem; font-weight: normal;}
  .shop_text_wrapper .shop_text_price{color:#ff4444}
  .shop_text_wrapper div{white-space:nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 4.3rem}
  /*.shop_text p{ display: inline-block; height: 0.77rem; overflow: hidden; margin-bottom: 0.1rem; }*/
  /*.shop_text h4{ line-height: 0.5rem; color: rgba(0,0,0,0.5); font-weight: normal;}*/
  /*.shop_text h5{ line-height: 0.5rem; font-size: 0.28rem; color: rgba(0,0,0,0.5); font-weight: normal;}*/
  /*.slider*/
  .slider-move {
    transition: 1s all;
  }
</style>
