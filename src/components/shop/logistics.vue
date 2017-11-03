<template lang="html">
  <div class="logistics">
    <header>
      <goback></goback>
      <h2>物流详情</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <div class="shop_box">
      <span class="shop_photo"><img :src="logisticsMsg.shopImg"></span>
      <span class="shop_text">
        <h4>物流状态：{{ logisticsMsg.state }}</h4>
        <h5>承运公司：{{ logisticsMsg.company }}</h5>
        <h6>运单编号：{{ logisticsMsg.waybill }}</h6>
      </span>
    </div>
    <!-- 物流显示 -->
    <ul class="logistics_msg">
      <li v-for="(list, index) in logisticsMsg.lists">
        <h3>{{ list.stateText }}</h3>
        <p>{{ list.stateTime }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Ajax from '@/module/ajax'

export default {
  name: 'logistics',
  data () {
    return {
      logisticsMsg: {
        shopImg: 'static/images/plat1.png',
        state: '已签收',
        company: '圆通快递',
        waybill: '564541522152',
        lists: [
          {
            stateText: '广东省广州市XXXX 已签收 签收人：前台',
            stateTime: '2017-01-02 15:40:10'
          },
          {
            stateText: '广东省广州市番禺区 已收入',
            stateTime: '2017-01-02 10:00:00'
          },
          {
            stateText: '浙江省 已发出',
            stateTime: '2017-01-01 05:18:00'
          }
        ]
      }
    }
  },
  components: { Goback },
  methods: {
    getData () {
      let ajaxData = this.$route.params.order_id
      // console.log(ajaxData)
      let getSuccess = (data) => {
        console.log(data)
        // this.shopList = data
      }
      let getError = error => console.log(error)
      // Ajax.ajaxRequest('url', 'POST', getSuccess, getError, ajaxData)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="css" scoped>
  .logistics{ width: 100%; }
  .logistics header{ margin-bottom: 0.14rem; }
  .shop_box{ margin: auto; padding: 0.2rem; overflow: hidden; background-color: #fff; margin-bottom: 0.2rem; }
  .shop_photo{ width: 1.74rem; height: 1.74rem; overflow: hidden; float: left; margin-right: 0.2rem; }
  .shop_text{ float: left; height: 1.74rem; overflow: hidden; }
  .shop_text h4{ font-size: 0.36rem; line-height: 0.6rem; }
  .shop_text h5{ font-size: 0.32rem; line-height: 0.58rem; font-weight: 400; }
  .shop_text h6{ font-size: 0.32rem; line-height: 0.56rem; font-weight: 400; }
  .logistics_msg{ width: 100%; background-color: #fff; }
  .logistics_msg li{ padding: 0.2rem; border-bottom: solid 1px #f5f5f5; }
  .logistics_msg h3{ line-height: 0.5rem; font-size: 0.32rem; font-weight: 400; }
  .logistics_msg p{ line-height: 0.5rem; font-size: 0.28rem; color: #ccc; }
</style>
