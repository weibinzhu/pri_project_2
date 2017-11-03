<template lang="html">
  <div class="homeclass">
    <!-- 透明头部 -->
    <div class="top">
      <goback></goback>
      <h2>{{ $route.params.text }}</h2>
    </div>
    <!-- 内容 -->
    <!--<div class="banner"><img :src="banner" alt=""></div>-->
    <!-- 导航 -->
    <!--<nav class="nav flex" v-if="navShow">-->
      <!--<li v-for="(menu, index) in menuList" class="f1" :class="{li_hover: isHover === menu}" @click="liSort(menu, index)">{{ menu }}</li>-->
    <!--</nav>-->
    <!-- 商品列表 -->
    <section class="shop_content">
      <!-- <ul class="shop_list"> -->
      <transition-group name="slider" class="shop_list" tag="ul">
        <li v-for="(shop, index) in shopList" :key="shop.shopId">
          <span class="shop_photos"><router-link :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}"><img :src="shop.shopImg"></router-link></span>
          <span class="shop_text">
            <p>{{ shop.shopText }}</p>
            <h3>￥{{ shop.shopPrice }}</h3>
            <h4>销量 {{ shop.shopVolume }}</h4>
          </span>
        </li>
      </transition-group>
      <!-- </ul> -->
    </section>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Ajax from '@/module/ajax'

export default {
  name: 'homeclass',
  data () {
    return {
      navShow: true,
      isHover: '',
      banner: '/static/images/classbanner.png',
      menuList: ['销量优先','价格高到低','价格低到高'],
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
  components: { Goback },
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
    shopData () {
      if (this.$route.params.text === '金融中心') {
        let getSuccess = (data) => {
          let tempData = []
          for (let item of data){
            if(item.state!=0){
              tempData.push(item)
            }
          }
          this.shopList = tempData
        }
        let getError = (error) => {
          console.log(error)
        }
        Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/getGoodslist', 'POST', getSuccess, getError, 'category_id=326')
      }
      if (this.$route.params.text === '精品商城') {
        let getSuccess = (data) => {
          let tempData = []
          for (let item of data){
            if(item.state!=0){
              tempData.push(item)
            }
          }
          this.shopList = tempData
        }
        let getError = (error) => {
          console.log(error)
        }
        Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/Goods/getGoodslist ', 'POST', getSuccess, getError,'category_id=332')
      }
      if (this.$route.params.text === '养生旅游') {
        let getSuccess = (data) => {
          let tempData = []
          for (let item of data){
            if(item.state!=0){
              tempData.push(item)
            }
          }
          this.shopList = tempData
        }
        let getError = (error) => {
          console.log(error)
        }
        Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/getGoodslist', 'POST', getSuccess, getError, 'category_id=325')
      }

    }
  },
  mounted () {
    this.shopData()
    if (this.$route.params.text === '金融中心') {
      this.navShow = !this.navShow
    }
  }
}
</script>

<style lang="css" scoped>
  .homeclass{ width: 100%; }
  .homeclass .goback{ color: #fff; }
  .top{ width: 100%; height: 0.88rem; background-color: rgba(0,0,0,0.3); text-align: center; position: relative; position: fixed; top: 0; left: 0; }
  .top h2{ font-size: 0.36rem; color: #fff; font-weight: 400; line-height: 0.88rem; }
  .banner{ width: 100%; height: 5.2rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat;}
  .nav{ width: 100%; height: 0.9rem; background-color: #fff; }
  .nav li{ text-align: center; line-height: 0.9rem; position: relative; }
  .nav li::before{ position: absolute; content: ""; width: 1px; height: 0.6rem; background-color: #eee; top: 0.15rem; left: 0; }
  .nav li:nth-child(1)::before{ width: 0; }
  .nav .li_hover{ color: #8c8df6; font-size: 0.36rem; font-weight: 600; }
  .shop_content{ width: 100%; }
  .shop_list{ width: 100%; overflow: hidden; }
  .shop_list li{width: 100%; overflow: hidden; margin-bottom: 0.2rem; background: #fff; border-bottom: solid 1px #f4f4f4; }
  .shop_photos{ width: 100%; height: 3.75rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat;}
  .shop_text{ padding: 0.2rem; overflow: hidden; }
  .shop_text p{ font-size: 0.28rem; margin-bottom: 0.1rem; }
  .shop_text h3{ color: #f23030; float: right; font-size: 0.28rem; color: rgba(0,0,0,0.5); line-height: 0.5rem; font-weight: 400; }
  .shop_text h4{ font-size: 0.28rem; line-height: 0.5rem; color: rgba(0,0,0,0.5); font-weight: 400; }

</style>
