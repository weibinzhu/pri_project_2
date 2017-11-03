<template lang="html">
  <section class="home">
    <div class="top_search">
      <router-link to="/city" tag="span" class="map_btn"><img src="/static/images/map.png" alt=""></router-link>
      <search></search>
      <!--<span class="search_logo"><img src="../../../static/images/search_logo.png"></span>-->
    </div>
    <!-- 城市选择组件渲染位置 -->
    <router-view></router-view>
    <!-- 轮播图 -->
    <div class="banner" v-swiper:mySwiper="swiperOption">
      <ul class="swiper-wrapper">
        <li class="swiper-slide" v-for="(banner, index) in homeData.slideList">
          <img :src="banner.adv_img">
        </li>
      </ul>
      <span class="swiper-pagination swiper-pagination-white"></span>
    </div>
    <div class="home_news">
      <img src="/static/images/home_news.png"/> <span></span><p>{{news_text}}</p>
    </div>
    <!-- 按钮导航 -->
    <nav class="home_nav">
      <ul class="flex">
        <li class="f1" v-for="(navItem, index) in navs">
          <router-link tag="span" :to="navItem.link"><img :src="navItem.navImg"></router-link>
           <p>{{ navItem.text }}</p>
        </li>
      </ul>
    </nav>
    <!-- 商品列表 -->
    <section class="shop_content">
      <!-- <h2>爆款商品</h2> -->
      <div class="shop_head flex"><img src='/static/images/home_title.png'>AI康新医疗服务</div>
      <ul class="shop_list">
        <li v-for="(shop, index) in homeData.shopList">
          <router-link tag="span" class="shop_photos" :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}">
            <img :src="shop.shopImg">
          </router-link>
          <div class="shop_text_wrapper">
            <div>{{ shop.shopText }}</div>
            <div class="shop_text_price">￥{{ shop.shopPrice }}</div>
          </div>
          <!--<div class="shop_text_wrapper">-->
            <!--<span class="shop_text">{{ shop.shopText }}</span>-->
            <!--<h4>￥{{ shop.shopPrice }}</h4>-->
          <!--</div>-->
          <!-- <h5>销量 {{ shop.shopVolume }}</h5> -->
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Search from '@/components/home/search'
import Ajax from '@/module/ajax'

// 我这里只是想局部引入swiper插件
require('swiper/dist/css/swiper.css')
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
  Vue.use(VueAwesomeSwiper)
}
// mount with component(can't work in Nuxt.js/SSR)
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

export default {
  name: 'home',
  data () {
    return {
      navs: [
        {
          navImg: '/static/images/home_jingping.png',
          link: '/hclass/精品商城',
          text: '精品商城'
        },
        {
          navImg: '/static/images/home_daili.png',
          link: '/agent',
          text: '合作加盟'
        },
        {
          navImg: '/static/images/home_yansheng.png',
          link: '/hclass/养生旅游',
          text: '养生旅游'
        },
        {
          navImg: '/static/images/home_zhibo.png',
          link: '/plat',
          text: '幸福学院'
        },
        {
          navImg: '/static/images/home_gongyi.png',
          link: '/comm',
          text: '社会公益'
        },
        {
          navImg: '/static/images/home_jinrong.png',
          link: '/hclass/金融中心',
          text: '金融中心'
        },
      ],
      news_text:'你的世界为什么那么小？因为你的眼睛不够大！',
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        loop: true,
        autoplay : 3000,
        autoplayDisableOnInteraction : false,
        onSlideChangeEnd: swiper => {   // 滑动结束后的事件
          // console.log('onSlideChangeEnd', swiper.realIndex)
        }
      }
    }
  },
  components: { Search },
  methods: {
    shopData () {
      // 商品列表请求
      var shopSuccess = (data) => {
        this.homeData.shopList = data
      }
      var shopError = (error) => {
        console.log(error)
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/hotpack', 'POST', shopSuccess, shopError)
    },
    bannerData () {
      var getsuccess = (data) => {
        this.homeData.slideList = data
      }
      var getError = (error) => {
        console.log(error)
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/Index/index', 'POST', getsuccess, getError)
    },
    userState () {
      if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
        console.log('用户还没登录')
        localStorage.setItem('state', '0')
        // 判断用户登录的情况
        var getSuccess = (data) => {
          console.log(data)
          localStorage.setItem('state', data)
        }
        var getError = (error) => {
          console.log(error)
        }
        // Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/index/is_login', 'POST', getSuccess, getError)
      }
    }
  },
  computed: {
    homeData () {
      return this.$store.state.homeData
    }
  },
  mounted () {
    this.shopData()
    this.bannerData()
    // this.userState()
    // setTimeout(() => {
    //   this.slideList = [
    //     {adv_img: '/static/images/banner.png'},
    //     {adv_img: '/static/images/banner.png'},
    //     {adv_img: '/static/images/banner.png'},
    //     {adv_img: '/static/images/banner.png'}
    //   ]
    // }, 100)
    // console.log(
    //   'This is current swiper instance object', this.mySwiper,
    //   'It will slideTo banners 3')
    // this.mySwiper.slideTo(3)
  }
}
</script>
<style lang="css" scoped>
  .home{ width: 100%; min-height: 13rem; }
  .top_search{display: flex; align-items: center;  width: 100%; height: 0.88rem;background-image: url("/static/images/search_bg.png"); background-size: cover; /*background-color: rgba(0,0,0,0.3);*/ padding: 0.09rem 0; position: fixed; top: 0; left: 0; z-index: 2; }
  .map_btn{ width: 0.44rem; height: 0.52rem; margin-left: 0.2rem; /*position: absolute; left: 0.22rem; top: 0.18rem; */}
  .search_logo{ width: 0.42rem; height: 0.56rem; position: absolute; right: 1.2rem;top: 0.18rem;}
  .banner{ width: 100%; height: 4.94rem; overflow: hidden; position: relative; z-index: 1; }
  .banner li{ background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat; }
  .home_news {box-sizing:border-box; display:flex; flex-direction:row; align-items:center;width: 100%; height: 0.90rem; overflow:hidden; font-size: 0.24rem; padding: 0.3rem 0 0.3rem 0.3rem;background-color: #fff }
  .home_news img{height:0.3rem; width:1.16rem; margin-right: 0.1rem; }
  .home_news p{width: 6rem; overflow: hidden;height: 0.38rem; line-height: 0.38rem;}
  .home_news span{ width:0.32rem; height:0.3rem;margin-right: 0.1rem; background-image: url("/static/images/hot.png"); background-size: 0.3rem 0.3rem; background-repeat: no-repeat}
  .home_nav{ width: 100%; overflow: hidden; background-color: #fff; }
  .home_nav ul{ width: 100%; padding-top:0.4rem; }
  .home_nav li{ min-width: 30%; margin-bottom: 0.2rem; -webkit-flex: 1 1 30%;}
  .home_nav p{ text-align: center; color: #7c7c7c; font-size: 0.28rem; }
  .home_nav span{ width: 0.82rem; height: 0.82rem; margin: 0 auto 0.2rem; }
  .shop_content{ width: 100%; }
  /*.shop_content h2{ line-height: 0.9rem; font-size: 0.36rem; font-weight: 500; padding-left: 1rem; background-image: url(/static/images/h2.png); background-repeat: no-repeat; background-size: 0.58rem 0.5rem; background-position: 0.2rem center; }*/
  .shop_head{height: 0.8rem; align-items: center;font-size: 0.32rem; color: #2ac19c; background-color: #f9f9f9; border-top-right-radius: 0.1rem; border-top-left-radius: 0.1rem}
  .shop_head img{width: 0.32rem; height: 0.32rem; margin-left: 0.3rem; margin-right: 0.1rem}
  .shop_list{ width: 100%; overflow: hidden; padding-bottom: 1rem; background-color: #fff;}
  .shop_list li{position: relative; width: 6.9rem; overflow: hidden; background-color: #fff; margin-bottom: 0.3rem; margin-left: auto; margin-right: auto; padding-bottom: 0.1rem; box-shadow: 0px 10px 38px 3px rgba(231,231,231,1);border-radius: 0.08rem}
  .shop_photos{ width: 100%; height: 3.6rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 2.7rem 1.93rem; background-position: center center; background-repeat: no-repeat; }
  .shop_text_wrapper{box-sizing:border-box; width: 100%; height: 1.6rem;display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 0.3rem; font-size: 0.32rem; font-weight: normal;}
  .shop_text_wrapper .shop_text_price{color:#ff4444}
  /*.shop_text_wrapper {display: flex;flex-direction: column; align-items: center;justify-content: center; position: absolute;margin-left:1.6rem; bottom: 0.6rem; z-index: 2; min-width: 4.12rem; padding: 0.1rem;text-align:center; background-color: rgba(255,255,255,0.5)}*/
  /*.shop_text{max-width: 4.12rem; max-height: 0.46rem ;overflow: hidden;font-size: 0.36rem;font-weight: normal;}*/
  /*.shop_text_wrapper h4{font-size: 0.28rem; font-weight: normal;}*/
  /*.shop_text{ width: 96%; height: 0.88rem; padding: 0 2%; line-height: 0.44rem; font-size: 0.28rem; margin-bottom: 0.2rem; overflow: hidden; }*/
  /*.shop_list h4{ float: left; line-height: 0.5rem; font-size: 0.32rem; color: #7c7c7c; margin-left: 0.1rem; }*/
  /*.shop_list h5{ float: right; line-height: 0.5rem; font-size: 0.32rem; color: #7c7c7c; margin-right: 0.1rem; font-weight: 400; }*/

</style>
