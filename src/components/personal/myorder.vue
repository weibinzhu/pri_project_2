<template lang="html">
  <div class="myorder">
    <header>
      <goback></goback>
      <h2>我的订单</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <nav class="nav_box">
      <ul>
        <li v-for="(navList, index) in navLists" :class="{li_hover: orderState.isHover === navList}" @click="liSort(navList, index)">{{ navList }}</li>
      </ul>
    </nav>
    <!-- 订单内容 -->
    <ul class="order_list">
      <li v-for="(orderList, index) in orderLists" v-if="orderList.order_type === (orderState.liIndex + 1) ? true : orderState.liShow">
        <span class="title_box">
          <h3>{{ orderList.storeName }}</h3>
          <h4>{{ orderList.state }}</h4>
        </span>
        <span class="shop_box">
          <span class="shop_photos"><img :src="orderList.shopImg"></span>
          <span class="shop_text">{{ orderList.shopText }}</span>
          <p>共 {{ orderList.shopNumber }} 件商品<b>￥ {{ orderList.shopPrice }}</b></p>
        </span>
        <!-- <span class="options" v-if="orderList.order_type === 0">
          <i class="i_hover">付款</i>
          <i>取消订单</i>
          <i>联系卖家</i>
        </span> -->
        <span class="options" v-if="orderList.order_type === 1">
          <i class="i_hover">提醒发货</i>
          <i>联系卖家</i>
        </span>
        <span class="options" v-if="orderList.order_type === 2">
          <i class="i_hover">确认收货</i>
          <router-link tag="i" :to="{ name: 'logisId', params: { order_id: orderList.order_id } }">查看物流</router-link>
          <router-link tag="i" :to="{ name: 'refundId', params: { order_id: orderList.order_id } }">申请退款</router-link>
        </span>
        <span class="options" v-if="orderList.order_type === 3">
          <i class="i_hover">删除订单</i>
          <router-link tag="i" :to="{ name: 'evaluId', params: { order_id: orderList.order_id } }">评价</router-link>
        </span>
        <!-- <span class="options" v-if="orderList.order_type === 4">
          <i class="i_hover">查看详情</i>
        </span> -->
      </li>
    </ul>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Ajax from '@/module/ajax'

export default {
  name: 'myorder',
  data () {
    return {
      navLists: ['全部','待发货','待收货','待评价','退款/售后'],
      orderLists: [
        {
          order_id: 0,
          order_type: 1,                  // 0=待付款，1=待发货, 2=待收货，3=待评价， 4=退款/售后
          storeName: '广州美莱医院',       // 店铺名
          state: '待发货',                // 状态
          shopImg: 'static/images/plat1.png',    // 商品图片
          shopText: '魅力隆鼻整形服务 【广州美莱医院】',
          shopNumber: '1',             // 商品数量
          shopPrice: '39.00'           // 商品价格
        },
      ]
    }
  },
  components: { Goback },
  methods: {
    liSort (navList, position) {
      this.orderState.isHover = navList
      if (position === 0) {
        this.orderState.liShow = true
      }else {
        this.orderState.liShow = false
      }
      this.orderState.liIndex = position - 1
    },
    getData () {
      let dataSent = {
        uid:localStorage.getItem('userID'),
      }
      this.$http.post('http://www.aikhome.com/index.php/apiv/member/my_order/my_order',dataSent,{emulateJSON:true}).then(res=>{
//          order_id: 0,
//          order_type: 1,                  // 0=待付款，1=待发货, 2=待收货，3=待评价， 4=退款/售后 , 5=交易成功（已评价）
//          storeName: '广州美莱医院',       // 店铺名
//          state: '待发货',                // 状态
//          shopImg: 'static/images/plat1.png',    // 商品图片
//          shopText: '魅力隆鼻整形服务 【广州美莱医院】',
//          shopNumber: '1',             // 商品数量
//          shopPrice: '39.00'           // 商品价格
        let tempList = []
        for (let item of res.body.data){
          let order_type
          switch (item.order_status){
            case 0:
              order_type = 0
              break
            case 1:
              order_type = 1
              break
            case 2:
              order_type = 2
              break
            case 4:
              if(item.is_evaluate == 0){
                order_type = 3
              }else{
                order_type = 5
              }
              break
            case -1:
            case -2:
              order_type = 4
              break
          }
          let tempItem = {
            order_id: item.order_id,
            order_type:order_type,
            storeName:item.shop_name,
            state: item.status_name,
            shopImg: `http://www.aikhome.com/${item.order_item_list[0].picture.pic_cover_small}`,

          }
        }

      })
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    orderState () {
      return this.$store.state.orderState
    }
  }
}
</script>

<style lang="css" scoped>
  .myorder{ width: 100%; }
  .nav_box{ width: 100%; height: 0.88rem; overflow-x: scroll; margin-bottom: 0.2rem; }
  .nav_box ul{ overflow: hidden; background-color: #fff; width: 9.4rem; height: 0.88rem; }
  .nav_box li{ height: 0.88rem; text-align: center; line-height: 0.88rem; float: left; padding: 0 0.4rem; position: relative; }
  .nav_box .li_hover{ color: #8c8df6; }
  .nav_box .li_hover::before{ position: absolute; content: ""; width: 100%; height: 2px; bottom: 0; left: 0; background-color: #8c8df6; }
  /*订单*/
  .order_list{ width: 100%; }
  .order_list li{ margin-bottom: 0.2rem; }
  .title_box{ height: 0.88rem; padding: 0 0.2rem; background-color: #fff; }
  .title_box h3{ font-size: 0.32rem; line-height: 0.88rem; float: left; font-weight: 400; }
  .title_box h4{ font-size: 0.28rem; line-height: 0.88rem; float: right; color: #8c8df6; font-weight: 400; }
  .shop_box{ padding: 0.2rem; height: 1.74rem; background-color: #fbfdfe; }
  .shop_photos{ width: 1.74rem; height: 1.74rem; overflow: hidden; float: left; margin-right: 0.2rem; }
  .shop_text{ height: 1.1rem; font-size: 0.28rem; overflow: hidden; }
  .shop_box p{ line-height: 0.7rem; }
  .shop_box b{ color: #f61a79; margin-left: 0.2rem; }
  .options{ padding: 0.13rem 0.2rem; height: 0.66rem; background-color: #fff; }
  .options i{ display: block; height: 0.62rem; padding: 0 0.2rem; font-style: normal; line-height: 0.62rem; font-size: 0.28rem; float: right; border: solid 1px #ccc; border-radius: 0.31rem; margin-left: 0.2rem; color: #525252; }
  .options .i_hover{ color: #8c8df6; border: solid 1px #8c8df6; }
</style>
