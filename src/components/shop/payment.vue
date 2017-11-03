<template lang="html">
  <transition name="Translate">
    <div class="buyBox">
      <div class="payment">
        <span class="iconfont icon-guanbi off" @click="off()"></span>
        <p class="shop_text">{{ paymentState.totalNumber }} 件商品 共<b>￥{{ paymentState.totalPrice }}</b></p>
        <div class="payment_btn flex">
          <span class="f1" @click="balance">余额支付</span>
          <span class="f1" @click="wechart">微信支付</span>
          <span class="f1" @click="aliPay">支付宝支付</span>
        </div>
        <transition name="Slider">
          <p class="text_p" v-if="wechartShow">{{ text }}</p>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import Ajax from '@/module/ajax'

export default {
  name: 'buyBox',
  data () {
    return {
      wechartShow: false,
      text: '',
    }
  },
  methods: {
    // 关闭
    off () {
      this.$store.commit('paymentFun',{})
    },
    // 支付成功
    payTrue () {
      this.$store.commit('loadShow')
      this.$store.commit('paymentFun',{})
      this.$store.commit('promptText',{ text: '支付成功' })
    },
    // 支付失败
    payFalse () {
      this.$store.commit('loadShow')
      this.$store.commit('paymentFun',{})
    },
    // 用余额支付
    balance () {
      let that = this
      if (Number(that.paymentState.accountBalance) >= that.paymentState.totalPrice) {
        // loading页出现
        this.$store.commit('loadShow')
        // 发送请求
        let ajaxData = null
        if (that.paymentState.packgoods === 0) {
          ajaxData = 'uid='+localStorage.getItem('userID')+'&goods_sku_list='+that.paymentState.shopId +':'+that.paymentState.totalNumber+'&account_balance='+that.paymentState.totalPrice+'&packgoods='+that.paymentState.packgoods
        }else {
          ajaxData = 'uid='+localStorage.getItem('userID')+'&goods_sku_list='+that.paymentState.shopId +':'+that.paymentState.totalNumber+'&account_balance='+that.paymentState.totalPrice+'&packgoods='+that.paymentState.packgoods+'&pack_goods_list='+that.paymentState.pack_goods_list
        }
        let getSuccess = (data) => {
          console.log(data)
          that.payTrue()
        }
        let getError = (error) => {
          console.log(error)
          that.payFalse()
        }
        Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/Order/orderCreate', 'post', getSuccess, getError, ajaxData)
      }else {
        this.$store.commit('loadShow')
        this.payFalse()
        this.$store.commit('promptText',{ text: '支付失败，余额不足' })
      }
    },
    // 微信支付
    wechart () {
      this.text = '该支付暂不可用'
      this.wechartShow = !this.wechartShow
      setTimeout(() => {
        this.wechartShow = !this.wechartShow
      },500)
    },
    // 支付宝支付
    aliPay () {
//      this.text = '该支付暂不可用'
//        this.wechartShow = !this.wechartShow
//      setTimeout(() => {
//        this.wechartShow = !this.wechartShow
//      },500)
    }
  },
  computed: {
    paymentState () {
      return this.$store.state.paymentState
    }
  }
}
</script>

<style lang="css" scoped>
  /*购买*/
  .buyBox{ width: 100%; height: 100vh; background-color: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; z-index: 8; }
  .payment{ width: 96%; height: 6rem; padding: 0.2rem 2%; background-color: #fff; position: absolute; bottom: 0; left: 0; z-index: 10; }
  .off{ float: right; width: 0.88rem; height: 0.88rem; font-size: 0.64rem; text-align: center; line-height: 0.88rem; }
  .shop_text{ line-height: 0.88rem; clear: both; text-align: center; margin-bottom: 0.2rem; font-size: 0.32rem; }
  .shop_text b{ color: #f23030; }
  .payment_btn{ width: 100%; height: 0.9rem; margin-bottom: 0.2rem; }
  .payment_btn span{ text-align: center; line-height: 0.88rem; color: #8794f5; border: solid 1px #8794f5; border-radius: 0.08rem; margin-left: 0.2rem; }
  .payment_btn span:nth-child(1){ margin: 0; }
  .text_p{ text-align: center; transition: 0.3s all; }
  /*过渡动画*/
  .Translate-enter, .Translate-leave-to{
    transform: translateY(100%);
  }
  .Slider-enter{
    transform: translateX(-1rem); opacity: 0
  }
  .Slider-leave-to{
    transform: translateX(1rem); opacity: 0
  }
</style>
