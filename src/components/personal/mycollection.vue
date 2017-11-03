<template lang="html">
  <div class="mycoll">
    <header>
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 导航 -->
    <nav class="my_nav flex">
      <li class="f1" v-for="(myNav,index) in myNavs" :class="[{li_hover: isHover === myNav}]" @click="navSwitch(myNav,index)">{{ myNav }}</li>
    </nav>
    <!-- 商品 -->
    <ul class="c_shop" v-if="cShow === 0">
      <li v-for="(cShop,index) in cShops">
        <span class="shop_photos"><img :src="cShop.cImg"></span>
        <span class="shop_text">
          <p>{{ cShop.cText }}</p>
        </span>
        <h4>销量：{{ cShop.cPrice }}</h4>
        <h3>￥{{ cShop.cVolume }}</h3>
      </li>
    </ul>
    <!-- 医疗机构 -->
    <ul v-if="cShow === 1">
      <p>暂无数据..</p>
    </ul>
    <!-- 医生 -->
    <ul v-if="cShow === 2">
      <p>暂无数据..</p>
    </ul>
    <!-- 文章 -->
    <ul v-if="cShow === 3">
      <p>暂无数据..</p>
    </ul>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  data () {
    return {
      title: '我的收藏',
      myNavs: ['商品','医疗机构','医生','文章'],
      isHover: '商品',
      cShow: 0,
      cShops: [
        {
          cImg: '/static/images/plat2.png',
          cText: '[开眼角]开内/外眼角  打造魅力电眼，为双眼充足光亮',
          cPrice: '365',
          cVolume: '215'
        },
        {
          cImg: '/static/images/plat2.png',
          cText: '[开眼角]开内/外眼角  打造魅力电眼，为双眼充足光亮',
          cPrice: '365',
          cVolume: '215'
        },
        {
          cImg: '/static/images/plat2.png',
          cText: '[开眼角]开内/外眼角  打造魅力电眼，为双眼充足光亮',
          cPrice: '365',
          cVolume: '215'
        }
      ]
    }
  },
  components: { Goback },
  methods: {
    navSwitch (myNav,index) {
      this.isHover = myNav.toString()
      this.cShow = index
    }
  }
}
</script>

<style lang="css" scoped>
  .mycoll{ width: 100%; }
  .mycoll ul{ width: 100%; background-color: #fff; }
  .my_nav{ width: 100%; height: 0.88rem; margin-bottom: 0.2rem; background: #fff}
  .my_nav li{ text-align: center; line-height: 0.88rem; transition: 0s all; }
  .li_hover{ border-bottom: solid 0.04rem #8c8df6; color: #8c8df6; }
  /*商品*/
  .c_shop li{ padding: 0.2rem; border-bottom: solid 1px #f4f4f4; overflow: hidden; border-bottom: 1px #f4f4f4 solid}
  .shop_photos{ width: 1.72rem; height: 1.72rem; float: left; margin-right: 0.2rem; }
  .shop_text{ height: 1.28rem; }
  .c_shop li h3{ color: #f61a79; float: left; font-size: 0.36rem; line-height: 0.5rem; font-weight: 600}
  .c_shop li h4{ float: right; line-height: 0.5rem; color: rgba(0, 0, 0, 0.5); font-size: 0.28rem; }
  /*医疗机构*/

  /*医生*/

  /*文章*/


</style>
