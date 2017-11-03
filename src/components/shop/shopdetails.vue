<template lang="html">
  <section class="shopContent">
    <div class="shop_top">
      <span class="iconfont icon-jiantou01" @click="$router.go(-1)"></span>
      <span class="iconfont icon-fenxiang" @click="showFun"></span>
      <router-link tag="span" class="iconfont icon-gouwuche" to="/shopcar"></router-link>
    </div>
    <!-- 商品信息图 -->
    <section class="details_content">
      <!-- 轮播图 -->
      <div class="details_banner" v-swiper:mySwiper="swiperOption">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(banner, index) in shopData.shopImg">
            <img :src="banner" alt="">
          </li>
        </ul>
        <span class="swiper-pagination swiper-pagination-white"></span>
      </div>
      <span class="details_text">
        <p>{{ shopData.shopText }}</p>
        <h2>￥{{ shopData.shopPrice }}</h2>
        <h3>销量{{ shopData.shopVolume }}</h3>
      </span>
    </section>
    <!-- 商品套餐 -->
    <section class="shop_package" v-if="shopData.packgoods && shopData.packageList">
      <h2>— 商品套餐 —</h2>
      <ul class="package_list">
        <li class="flex" v-for="(paArr, index) in shopData.packageList">
          <span class="package_photos f1"><img :src="paArr.packagePhotos"></span>
          <span class="package_text f2">
            <p>{{ paArr.packageText }}</p>
            <h5>数量 {{ paArr.packageNumber }}</h5>
          </span>
        </li>
      </ul>
    </section>
    <!-- 商品详情 -->
    <section class="shop_details">
      <h2>— 商品详情 —</h2>
      <img class="details_img" v-for="(dImg, index) in shopData.detailsImg" :src="dImg" alt="">
      <span class="shopdetails_text">
  			<p>{{ shopData.detailsText }}</p>
  		</span>
    </section>
    <!-- 评价区 -->
    <div class="shop_evaluate">
      <h2>— 商品评价 —</h2>
      <span class="comment_user">
				<span class="portrait"><img :src="shopData.userImg" alt=""></span>
				<h3>{{ shopData.userName }}</h3>
				<p>{{ shopData.userDate }}</p>
			</span>
      <ul class="evaluate_photots">
        <li v-for="(evaluateImg, index) in shopData.commentPotos"><img :src="evaluateImg"></li>
      </ul>
      <span class="comment_text">
				<p>{{ shopData.commentText }}</p>
			</span>
      <router-link tag="span" class="more_evaluate" :to="{ name: 'comment', params: { Ctext: shopData.goods_id } }">查看更多评论</router-link>
    </div>
    <!-- 推荐 -->
    <div class="recommend">
      <h2>— 相关推荐 —</h2>
      <ul class="recommend_list">
        <li v-for="(recommend,index) in shopData.recommends" @click="getData(),goTop()">
          <span class="recommend_photos"><img :src="recommend.shopImg" alt=""></span>
          <!-- <span> -->
          <router-link tag="span" class="recommend_text" :to="{ name: 'shopDetails', params: { shop_id: recommend.shopId }}">
            <p>{{ recommend.shopText }}</p>
          </router-link>
          <!-- </span> -->
  				<h3>￥{{ recommend.shopPrice }}</h3>
  				<h4>销量：{{ recommend.shopVolume }}</h4>
        </li>
      </ul>
    </div>
    <!-- 购买 -->
    <transition name="translate">
      <div class="buy_box" v-if="buyShow">
        <p class="price_p">共计：<b>￥ {{ priceNum }}</b></p>
        <span class="add">
          <h3 @click="numberChange(false)" v-if="shopData.packgoods === 0"><img src="/static/images/remove.png"></h3>
          <h3 @click="numberChange(true)" v-if="shopData.packgoods === 0"><img src="/static/images/add.png"></h3>
          <p>数量: {{ shopNmber }}</p>
        </span>
        <div class="addrChoiceWrapper"><input v-model="pickedAddr" :value="addrFull" type="radio" name="addr" id="addr1"/><label for="addr1">{{addrFull}}</label></div>
        <div class="addrChoiceWrapper"><input v-model="pickedAddr" :value="addrFull" type="radio" name="addr" id="addr2"/><label for="addr2">{{addrFull}}</label></div>
        <input class="buy_box_addr" v-model="addrFullToInput" type="text" placeholder="如果没有合适的地址可以手动填写"/>
        <span class="btn_box flex">
          <span class="cancel_btn f1" @click="buyShow = !buyShow">取消</span>
          <span class="buy_btn f1" @click="gotoPay()">去支付</span>
        </span>
      </div>
    </transition>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <!-- 支付 -->
    <payment v-if="payShow"></payment>
    <!-- 分享 -->
    <share v-if="shareShow"></share>
    <!-- 底部 -->
    <footer class="flex">
  		<span class="f1" @click="Intelligence"></span>
  		<span :class="['f1','collection',{collection_hover: shopData.cHover}]" @click="collection"></span>
  		<span class="f2" @click="addCar">加入购物车</span>
  		<span class="f2" @click="gotoBuy">立即购买</span>
  	</footer>
  </section>
</template>

<script>
import Ajax from '@/module/ajax'
import Payment from '@/components/shop/payment'
import Loading from '@/components/loading'
import Pbox from '@/components/prompt'
import Share from '@/components/shop/share'

require('swiper/dist/css/swiper.css')
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
  Vue.use(VueAwesomeSwiper)
}
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

export default {
  name: 'shopContent',
  data () {
    return {
      pickedAddr:'', // 选中的地址
      addrFullToInput:'',
      addrFull:'',// 详细收货地址
      shopNmber: 1,             // 商品数量，默认1
      priceNum: '',             // 显示的价格
      buyShow: false,           // 选择购买数量显示
      shopData: {               // 变动的数据
        goods_id: 1,
        cHover: false,          // 收藏的状态
        packgoods: 1,           // 是否有套餐
        member_account: {       // 账号余额
          balance: "0.00"
        },
        shopImg: ['',''],       // 商品大图
        shopText: '加载中...',   // 描述
        shopPrice: '0',         // 价格
        shopVolume: '0',        // 销量
        packageList: [          // 商品套餐列表
          {
            packagePhotos: '',
            packageText: '加载中...',
            packageNumber: '0'
          }
        ],
        detailsImg: [''],          // 详情图片
        detailsText: '加载中...',  // 详情描述
        userImg: '/static/images/jiangli_icon.png',                      // 评论者头像
        userName: '加载中...',     // 评论者姓名
        userDate: '加载中...',     // 评论日期
        commentPotos: [''],       // 评论图片数组
        commentText: '加载中...',  // 评论文字
        recommends: [             // 推荐的列表数据
          {
            shopId: '1',
            shopImg: '',
            shopText: '加载中...',
            shopPrice: '0',
            shopVolume: '0'
          }
        ]
      },
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
  components: { Payment,Pbox,Loading,Share },

  methods: {
    showFun () {
      this.$store.commit('shareFun')
    },
    // 联系管家
    Intelligence () {
      this.$store.commit('promptText',{ text: '该功能暂没开放' })
    },
    // 收藏
    collection () {
      if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
        this.$router.push({ path: '/signin', query: { plan: '1' }})
      }else {
        this.shopData.cHover = !this.shopData.cHover
      }
    },
    // 加入购物车
    addCar () {
      if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
        this.$router.push({ path: '/signin', query: { plan: '1' }})
      }else {
        // this.$store.commit('promptText',{ text: '该功能暂没完成' })
        let getSuccess = (data) => {
          console.log(data)
          this.$store.commit('promptText',{ text: '添加成功' })
        }
        let getError = (error) => {
          console.log(error)
        }
        let data = {
          uid:localStorage.getItem('userID'),
          cart_detail:{
            shop_id:this.$route.params.shop_id,
            shop_name:this.shopData.shop_name,
            true_id:this.shopData.goods_id,
            goods_name:this.shopData.shopText,
            count:this.shopNmber,
            select_skuid:this.shopData.sku_list[0].sku_id,
            select_skuName:this.shopData.sku_list[0].sku_name,
            price:this.shopData.sku_list[0].price,
            cost_price:this.shopData.sku_list[0].cost_price,
            picture:this.shopData.pic_id,
          }
        }
        this.$http.post('http://www.aikhome.com/index.php/apiv/Goods/addCart',
          data,{
          emulateJSON:true
        }).then(res=>{
          getSuccess(res)
        })
//      select_skuName:${this.shopData.sku_list[0].sku_name},price:${this.shopData.sku_list[0].price},cost_price:${this.shopData.sku_list[0].cost_price},picture:[${this.shopData.shopImg}]}`
//        Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/Goods/addCart', 'post', getSuccess, getError, ajaxData)
      }
    },
    // 立即购买
    gotoBuy () {
      if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
        this.$router.push({ path: '/signin', query: { plan: '1' }})
      }else {
        this.buyShow = !this.buyShow
      }
    },
    // 支付页的出现
    gotoPay () {
      this.$store.commit('paymentFun',{
        shopPrice: this.priceNum,
        shopNmber: this.shopNmber,
        shopId: this.shopData.sku_list[0].sku_id,
        shopList: this.shopData.pack_goods_list,
        shopPack: this.shopData.packgoods,
        shopBalance: this.shopData.member_account.balance,
      })
      // 发送请求，获取订单号
      this.$http.post(`http://www.aikhome.com/index.php/apiv/Order/orderCreate`,{
        uid:localStorage.getItem('userID'),
        use_coupon:0,// 有？
        integral:0,// 有？
        goods_sku_list:'1844:1',// 有？
        leavemessage:'', // 有？
        account_balance:this.shopData.member_account.balance,
        pay_type:1,// 有？
        buyer_invoice:'',// 有？
        pick_up_id:0,// 有？
        order_class:this.shopData.order_class,
        shipping_company_id:7405,// 有？
        packgoods:this.shopData.goods_id,
        pack_goods_list:this.shopData.pack_goods_list
      },{emulateJSON:true}).then(res=>{
        console.log(res)
      })
    },
    // 增加减少商品数量
    numberChange (type) {
      if (type) {
        this.shopNmber += 1
      }else {
        if (this.shopNmber === 1) {
          return
        }else {
          this.shopNmber -= 1
        }
      }
      this.priceNum = Number(this.shopData.shopPrice) * this.shopNmber
    },
    // 初始化获取商品信息
    getData () {
      let ajaxData = 'uid=' + localStorage.getItem('userID') + '&goods_id=' + this.$route.params.shop_id
      // + this.$route.params.id    745
      let getSuccess = (data) => {
        console.log(data)
        this.shopData = data.result // 商品信息现在放在data.result
        this.priceNum = Number(this.shopData.shopPrice) * this.shopNmber
        this.addr = data.$address // 获取地址信息
        let city = this.addr.address_info
        city = city.replace(/&nbsp;/g,'')
        this.addrFull =  `${city}${this.addr.address}`
      }
      let getError = (error) => {
        console.log(error)
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/getGoodsItem', 'post', getSuccess, getError, ajaxData)
    },
    goTop () {
      document.body.scrollTop = '0px'
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    pShow () {
      return this.$store.state.pShow
    },
    payShow () {
      return this.$store.state.paymentState.payShow
    },
    shareShow () {
      return this.$store.state.shareShow
    },
  }
}
</script>

<style lang="css" scoped>
  .shopContent{ width: 100%; }
  .shop_top{ width: 100%; height: 0.74rem; padding-top: 0.14rem; position: fixed; top: 0; left: 0; z-index: 5; background-color: none; }
  .shop_top span{ float: right; width: 0.6rem; height: 0.6rem; font-size: 0.36rem; color: #fff; background: rgba(0,0,0,0.5); border-radius: 50%; text-align: center; line-height: 0.6rem; margin-right: 0.2rem; }
  .shop_top .icon-jiantou01{ float: left; margin-left: 0.2rem; }
  .details_content{ width: 100%; background-color: #fff; margin-bottom: 0.2rem; }
  .details_content span{ padding: 0.2rem; }
  .details_content .details_banner{ width: 100%; height: 7.5rem; overflow: hidden; padding: 0; position: relative; }
  .details_banner li{ background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat; }
  .details_text{ overflow: hidden; }
  .details_text p{ margin-bottom: 0.1rem; }
  .details_text h2{ float: left; font-size: 0.36rem; color: #f23030; line-height: 0.5rem; font-weight: 600}
  .details_text h3{ float: right; font-size: 0.28rem; color: rgba(0,0,0,0.5); line-height: 0.5rem; font-weight: 400; }
  /*商品套餐*/
  .shop_package{ width: 100%; background-color: #fff; margin-bottom: 0.2rem; }
  .shop_package h2{ line-height: 0.88rem; text-align: center; font-size: 0.36rem; border-bottom: solid 1px #f4f4f4; font-weight: 600; }
  .package_list{ width: 100%; }
  .package_list li{ width: 100%; margin-bottom: 0.1rem; }
  .package_photos{ height: 2.36rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 1.91rem 1.37rem; background-position: center center; background-repeat: no-repeat; }
  .package_text{ padding: 0.2rem; }
  .package_text p{ display: inline-block; height: 1.3rem; overflow: hidden; margin-bottom: 0.1rem; }
  .package_text h5{ line-height: 0.5rem; font-size: 0.28rem; color: rgba(0,0,0,0.5); font-weight: 400; }
  /*商品详情*/
  .shop_details{ width: 100%; background-color: #fff; margin-bottom: 0.2rem; }
  .shop_details h2{ line-height: 0.88rem; text-align: center; font-size: 0.36rem; border-bottom: solid 1px #f4f4f4; font-weight: 600; }
  .shopdetails_text{ padding: 0.2rem; }
  .shopdetails_text p{ font-size: 0.28rem; }
  .details_img{ min-height: 4rem; ;background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat; }
  /*评价区*/
  .shop_evaluate{ width: 100%; background-color: #fff; padding-bottom: 0.1rem; margin-bottom: 0.2rem; }
  .shop_evaluate h2{ line-height: 0.88rem; text-align: center; font-size: 0.36rem; border-bottom: solid 1px #f4f4f4; font-weight: 600; }
  .comment_user{ padding: 0.2rem; }
  .portrait{ width: 0.72rem; height: 0.72rem; float: left; margin-right: 0.2rem; border-radius: 50%; overflow: hidden;}
  .comment_user h3{ font-size: 0.36rem; line-height: 0.4rem; font-weight: 400;}
  .comment_user p{ color: #525252; font-size: 0.24rem; }
  .evaluate_photots{ width: 100%; overflow: hidden; }
  .evaluate_photots li{ width: 49%; height: 2.17rem; overflow: hidden; float: left; background-image: url(/static/images/imgloading.png); background-size: 2.7rem 1.93rem; background-position: center center; background-repeat: no-repeat; }
  .evaluate_photots li:nth-child(odd){ margin-right: 2%; }
  .comment_text{ padding: 0.2rem; margin-bottom: 0.2rem; }
  .comment_text p{ font-size: 0.28rem; }
  .more_evaluate{ width: 2.5rem; height: 0.7rem; border: solid #73a9ec 1px; border-radius: 0.35rem; margin: auto; text-align: center; line-height: 0.7rem; color: #73a9ec; font-size: 0.28rem; }
  /*推荐*/
  .recommend{ width: 100%; background-color: #fff; margin-bottom: 1.15rem; }
  .recommend h2{ line-height: 0.88rem; text-align: center; font-size: 0.36rem; border-bottom: solid 1px #f4f4f4; font-weight: 600; }
  .recommend_list{ width: 100%; }
  .recommend_list li{ padding: 0.2rem; border-bottom: solid 1px #f4f4f4; overflow: hidden; }
  .recommend_photos{ width: 1.72rem; height: 1.72rem; float: left; margin-right: 0.2rem; background-image: url(/static/images/imgloading.png); background-size: 1.66rem 1.19rem; background-position: center center; background-repeat: no-repeat;}
  .recommend_text{ height: 1.28rem; font-size: 0.28rem; }
  .recommend h3{ color: #f23030; float: left; font-size: 0.36rem; line-height: 0.5rem; font-weight: 600}
  .recommend h4{ color: rgba(0, 0, 0, 0.5); float: right; font-size: 0.28rem; line-height: 0.5rem; font-weight: 400; }
  /*购买*/
  .buy_box{display: flex; flex-direction: column; justify-content: flex-end; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.1); position: fixed; top: 0; left: 0; z-index: 6; }
  .buy_box_addr{width: 100%;font-size:0.32rem; text-align: center;height: 0.8rem;border:none;}
  .buy_box .addrChoiceWrapper{position:relative;font-size:0.32rem; text-align: center;height: 0.8rem; line-height:0.8rem; background-color:#fff; border:none;padding: 0 0.48rem}
  .buy_box .addrChoiceWrapper label{display:inline-block; text-align: center;width: 100%; height: 0.8rem; line-height:0.8rem;white-space:nowrap; overflow: hidden; text-overflow: ellipsis}
  .buy_box .addrChoiceWrapper input{position: absolute;left: 0.24rem; top:0.28rem}
  .add{ width: 100%; height: 0.6rem; padding: 0.15rem 0;background-color: #fff;  left: 0; }
  .add h3{ float: left; width: 0.6rem; height: 0.6rem; }
  .add h3:nth-child(2){ float: right; }
  .add p{ text-align: center; line-height: 0.7rem; font-size: 0.36rem; }
  .btn_box{ width: 100%; height: 0.96rem; text-align: center; line-height: 0.96rem; }
  .buy_btn{ background: linear-gradient(to right, #51d8f0 , #429ee4); color: #fff;}
  .cancel_btn{ background: linear-gradient(to right, #f23030 , #f97474); color: #fff;}
  .price_p{background-color: #fff; width: 100%; line-height: 0.88rem; text-align: center; border-bottom: 1px solid #eee; }
  .price_p b{ color: #f23030; }
  /*placeholder*/
  ::-webkit-input-placeholder { /* WebKit browsers */  color: #333; text-align: center; font-size: 0.32rem}
  :-ms-input-placeholder {  /* Internet Explorer 10+ */ color: #333; text-align: center; font-size: 0.32rem}
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */  color: #333; text-align: center;font-size: 0.32rem }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */  color: #333; text-align: center; font-size: 0.32rem}
  /*底部*/
  footer{ height: 0.96rem; position: fixed; bottom: 0; left: 0; width: 100%; background: #fff;}
  footer span{ text-align: center; line-height: 0.96rem; color: #fff}
  footer span:nth-child(1){ background-image: url(/static/images/details_contact.png); background-size: 0.96rem 0.96rem; background-position: center; background-repeat: no-repeat; }
  .collection{ background-image: url(/static/images/details_collection.png); background-size: 0.96rem 1.92rem; background-position: center top; background-repeat: no-repeat; position: relative;}
  .collection:before{ position: absolute; content: ""; width: 1px; height: 0.78rem; left: 0; top: 0.09rem; background: #f4f4f4; }
  .collection_hover{ background-position: center bottom; }
  footer span:nth-child(3){ background: linear-gradient(to right, #51d8f0 , #429ee4) }
  footer span:nth-child(4){ background: #8794f5; }
  /*过渡动画*/
  .translate-enter,.translate-leave-to{
    transform: translateY(100%);
  }
</style>
