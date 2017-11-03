<template lang="html">
  <section class="shopcar">
    <!-- 顶部 -->
    <div class="top flex">
      <span class="f1" v-if="!allSelect" @click="selecteAll(true)">全选</span>
      <span class="f1" v-if="allSelect" @click="selecteAll(false)">取消全选</span>
      <span class="f1"><h2>购物车({{ shopNum }})</h2></span>
      <span class="f1" v-if="!removeShow" @click="removeShop(true)">编辑</span>
      <span class="f1" v-if="removeShow" @click="removeShop(false)">完成</span>
    </div>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 商品购物列表 -->
    <section class="shop_content">
      <ul class="shop_all" v-for="(shopCar, index) in shopCars">
 			<!-- 商品头部 -->
 	      <span class="all_header">
 	         <em class="header_checkbix" :class="{'checkbix_light': shopCar.storeHover}" @click="storeALL(shopCar)"></em>
 	         <p>{{ shopCar.shopName }}</p>
 	      </span>
 			<!-- 商品列表 -->
        <li class="shop_box" v-for="(shopList, index) in shopCar.children">
          <em class="checkbix" :class="{'checkbix_light': shopList.selected}" @click="single(shopCar, index)"></em>
          <span class="shop_photos"><img :src="shopList.shopImg"></span>
          <span class="shop_text">{{ shopList.shopText }}</span>
          <p>￥{{ shopList.unitPrice }}</p>
          <div class="add">
            <span class="reduce" @click="numberEhange(shopList,false)" v-if="false">-</span>
            <p>× {{ shopList.shopQuantity }}</p>
            <span class="increase" @click="numberEhange(shopList,true)" v-if="false">+</span>
          </div>
        </li>
 	    </ul>
    </section>
    <!-- 支付页 -->
    <payment v-if="payShow"></payment>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <!-- 总状态 -->
    <footer class="flex">
      <span class="f2">合计：<b>￥{{ total }}</b></span>
      <transition name="showBtn" mode="out-in">
        <span class="f1 bottom_right" v-if="!removeShow" @click="gotoPay">结算</span>
      </transition>
      <transition name="showBtn" mode="out-in">
        <span class="f1 bottom_right" v-if="removeShow" @click="deleteShop">删除</span>
      </transition>
    </footer>
  </section>
</template>

<script>
import Payment from '@/components/shop/payment'
import Pbox from '@/components/prompt'
import Loading from '@/components/loading'
import Ajax from '@/module/ajax'
export default {
  name: 'shopcar',
  data () {
    return {
      allSelect: false,         // 全选状态
      removeShow: false,        // 删除键状态
      shopNum: 0,               // 购物车显示数字
      shopCars: [
        {
          shopName: '广州门诊美容医院',
          storeHover: false,
          children: [
            {
              shopImg: '/static/images/shoplist.png',
              shopText: '【广州门诊美容医院】不开刀开眼角 告别小眼睛 双眸明亮有神 更有魅力',
              unitPrice: '55.50',
              shopQuantity: '1',
              selected: false
            },
            {
              shopImg: '/static/images/shoplist.png',
              shopText: '【广州门诊美容医院】超声刀（全脸部） 美版全脸超声刀深层抗衰 让肌肤年轻5-10岁',
              unitPrice: '39.50',
              shopQuantity: '4',
              selected: false
            }
          ]
        },
        {
          shopName: '深圳健丽医院',
          storeHover: false,
          children: [
            {
              shopImg: '/static/images/shoplist.png',
              shopText: '【深圳健丽】水光针  唤醒水嫩肌肤 深层补水 直达肌底  这个夏天 不缺水 【广州门诊美容医院】自体脂肪填充单部位  自体脂肪填充 变肥为宝一举两得',
              unitPrice: '39.00',
              shopQuantity: '1',
              selected: false
            }
          ]
        }
      ]
    }
  },
  components: { Payment,Pbox,Loading },
  methods: {
    // 购物车显示的商品类数
    shopClass () {
      let titleNum = 0
      this.shopCars.forEach(function(tNum){
        titleNum += tNum.children.length
      })
      this.shopNum = titleNum
    },
    // 单个商品的选择判断
    single (shopCar, index) {
      shopCar.children[index].selected = !shopCar.children[index].selected
      let flag = false
      for (let i = 0; i < shopCar.children.length; i++) {
        if (!shopCar.children[i].selected) {
          flag = true
          break
        }
      }
      if (!flag) {
        shopCar.storeHover = true
      }else {
        shopCar.storeHover = false
      }
    },
    // 店铺下的所有商品全选
    storeALL (shopArray) {
      shopArray.storeHover = !shopArray.storeHover
      let flag = true
      for (let i = 0; i < shopArray.children.length; i++) {
        if (!shopArray.children[i].selected) {
          flag = false
          break
        }
      }
      if (flag) {
        for (let i = 0; i < shopArray.children.length; i++) {
          shopArray.children[i].selected = false
        }
      }else{
        for (let i = 0; i < shopArray.children.length; i++) {
          shopArray.children[i].selected = true
        }
      }
    },
    // 全选
    selecteAll (flag) {
      this.allSelect = !this.allSelect
      if (flag) {
        this.shopCars.forEach(function (shopArr, index) {
          shopArr.storeHover = true
          shopArr.children.forEach(function (shopSelect, index) {
            shopSelect.selected = true
          })
        })
      }else {
        this.shopCars.forEach(function (shopArr, index) {
          shopArr.storeHover = false
          shopArr.children.forEach(function (shopSelect, index) {
            shopSelect.selected = false
          })
        })
      }
    },
    // 增加减少事件
    numberEhange (shopList, type) {
      if (type) {
        shopList.shopQuantity = Number(shopList.shopQuantity) + 1
      }else {
        if (Number(shopList.shopQuantity) === 1) {
          return
        }else {
          shopList.shopQuantity = Number(shopList.shopQuantity) - 1
        }
      }
    },
    // 支付页的出现
    gotoPay () {
      if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
        this.$router.push({ path: '/signin', query: { plan: '1' }})
      }else {
        let totalPrice = 0
        let num = 0
        let select = false
        this.shopCars.forEach(function (allPrice, index) {
          allPrice.children.forEach(function (price, index) {
            if (price.selected) {
              totalPrice += Number(price.unitPrice) * Number(price.shopQuantity)
              num += Number(price.shopQuantity)
              select = true
            }
          })
        })
        if (select) {
          this.$store.commit('paymentFun',{
            shopPrice: totalPrice,
            shopNmber: num,
          })
        }else {
          this.$store.commit('promptText',{ text: '你还没选' })
        }
      }
    },
    // 删除商品
    removeShop (type) {
      this.removeShow = !this.removeShow
      if (type) {

      }else {

      }
    },
    deleteShop () {
      this.$store.commit('promptText',{ text: '后台功能还没完善' })
    }
  },
  mounted () {
    this.shopClass()
  },
  computed: {
    // 计算总价
    total () {
      let totalPrice = 0
      this.shopCars.forEach(function (allPrice, index) {
        allPrice.children.forEach(function (price, index) {
          if (price.selected) {
            totalPrice += Number(price.unitPrice) * Number(price.shopQuantity)
          }
        })
      })
      return totalPrice
    },
    // vuex数据
    loading () {
      return this.$store.state.loading
    },
    pShow () {
      return this.$store.state.pShow
    },
    payShow () {
      return this.$store.state.paymentState.payShow
    }
  }
}
</script>

<style lang="css" scoped>
  .shopcar{ width: 100%; min-height: 9rem; }
  .top{ width: 100%; height: 0.88rem; background-color: #fff; border-bottom: solid 2px #eee; position: fixed; top: 0; left: 0; z-index: 6; }
  .top span{ font-size: 0.28rem; line-height: 0.88rem; }
  .top span:last-child{ text-align: right; padding-right: 0.2rem; }
  .top span:first-child{ padding-left: 0.2rem; }
  .top h2{ font-size: 0.36rem; font-weight: 400; text-align: center; }
  /*购物车内容*/
  .shop_content{ width: 100%; padding-bottom: 2.02rem;}
  .shop_all{ width: 100%; margin-bottom: 0.2rem;}
  .all_header{ height: 0.88rem; background: #fff; padding: 0 0.2rem; overflow: hidden; margin: 0; border-bottom: 1px solid #f4f4f4; background-image: url(/static/images/more.png); background-size: 0.56rem 0.28rem; background-position: center right; background-repeat: no-repeat;}
  .all_header .checkbix{ float: left; margin-right: 0.2rem; margin-top: 0.15rem;}
  .all_header p{ overflow: hidden; line-height: 0.88rem; padding-left: 0.6rem; background-image: url(/static/images/store.png); background-size: 0.4rem 0.4rem; background-repeat: no-repeat; background-position: 0 0.22rem; }
  /*商品列表*/
  .shop_box{ height: 1.67rem; padding: 0.2rem; padding-bottom: 0.3rem; background: #fbfdfe; border-bottom: 1px solid #f4f4f4; }
  .header_checkbix{ float: left; margin: 0.2rem 0.2rem 0 0; width: 0.46rem; height: 0.46rem; border-radius: 50%; background-image: url(/static/images/checkbix.png); background-size: 100%; background-position: 0 -0.46rem; background-repeat: no-repeat; }
  /*复选框样式*/
  .checkbix{ float: left; margin: 0.47rem 0.2rem 0 0; width: 0.46rem; height: 0.46rem; border-radius: 50%; background-image: url(/static/images/checkbix.png); background-size: 100%; background-position: 0 -0.46rem; background-repeat: no-repeat; }
  .shop_content .checkbix_light{ background-position: 0 0; }
  .shop_content .all_light{ background-position: 0 0; }
  /*商品列表*/
  .shop_photos{ width: 1.67rem; width: 1.67rem; float: left; margin-right: 0.2rem; }
  .shop_text{ height: 0.8rem; line-height: 0.4rem; overflow: hidden; font-size: 0.28rem; margin-bottom: 0.4rem; }
  .shop_box p{ color: #f61a79; font-weight: 600; float: left}
  .add{ float: right; width: 2rem; height: 0.5rem; border-radius: 0.08rem; overflow: hidden; line-height: 0.5rem; text-align: center; }
  .add span{ width: 0.5rem; height: 100%; font-size: 0.36rem;}
  .add p{ width: 0.95rem; height: 100%; font-weight: 400; color: #929091; float: right; }
  .add span:nth-child(1){ float: left; border-right: solid 1px #ccc; }
  .add span:nth-child(3){ float: right; border-left: solid 1px #ccc; }
  /*底部*/
  footer{ position: fixed; bottom: 1rem; width: 100%; height: 1rem; background-color: #fff; }
  footer span:nth-child(1){ line-height: 1rem; font-weight: 600; padding-left: 0.2rem; }
  footer b{ color: #f61a79; font-size: 0.36rem; }
  footer .bottom_right{ background: linear-gradient(to right, #51d8f0 , #429ee4); color: #fff; text-align: center; font-size: 0.32rem; line-height: 1rem; }
  /*按钮过渡动画*/
  .showBtn-enter-active, .showBtn-leave-active{ transition: 0.5s all; }
  .showBtn-enter{
    position: fixed;
    bottom: 1rem;
    right: 0;
    opacity: 0;
    transform: translateX(-1rem)
  }
  .showBtn-leave-to{
    position: fixed;
    bottom: 1rem;
    right: 0;
    opacity: 0;
    transform: translateX(100%)
  }
</style>
