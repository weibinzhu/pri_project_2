<template lang="html">
  <div class="refund">
    <header>
      <goback></goback>
      <h2>退款申请</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <div class="shop_box">
      <span class="shop_photo"><img :src="refundMsg.shopImg"></span>
      <span class="shop_text">{{ refundMsg.shopText }}</span>
      <p>共件{{ refundMsg.shopNum }}商品 合计：<b>￥{{ refundMsg.price }}</b></p>
    </div>
    <span class="service">
      <i>联系卖家</i>
      <p>申请退款前请联系卖家协商同意</p>
    </span>
    <!-- 退款状态 -->
    <div class="refund_box">
      <span class="refund_state">
        <h3>商品状态：</h3>
        <i v-for="(item, index) in refundMsg.shopState" :class="{ihover: iText === item}" @click="iSwitch(item, index)">{{ item }}</i>
      </span>
      <span class="refund_text">
        <h3>退款原因：</h3>
        <textarea v-model="refundMsg.refundText" rows="8" cols="80"></textarea>
      </span>
    </div>
    <!-- 退款文件 -->
    <div class="refund_file">
      <span class="refund_price">
        <h3>退款金额：</h3>
        <b>￥{{ refundMsg.price }}</b>
      </span>
      <p>上传凭证</p>
      <ul class="photos_list">
        <li v-for="(litem, index) in refundMsg.photos"><img :src="litem" alt=""></li>
        <label for="file" v-if="refundMsg.photos.length < 4"></label>
      </ul>
      <input type="file" id="file" name="picture" @change="fileChange"/>
    </div>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <!-- 底部提交 -->
    <footer @click="sendPost">提交</footer>
  </div>
</template>

<script>
import Loading from '@/components/loading'
import Goback from '@/components/goback'
import Pbox from '@/components/prompt'
import Ajax from '@/module/ajax'

export default {
  name: 'refund',
  data () {
    return {
      iText: '',
      refundMsg: {
        shopImg: 'static/images/plat1.png',
        shopText: '鱼跃医用测电子家用压全自动高精准老人上臂式量血压计测量表仪器。',
        shopNum: 2,
        price: '268.00',
        shopState: ['已收到货','未收货到'],
        refundText: '',
        photos: []
      }
    }
  },
  components: { Goback,Pbox,Loading },
  methods: {
    iSwitch (item, index) {
      this.iText = item
    },
    // 上传图片
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png']
      if (!files.length || supportedTypes.indexOf(files[0].type) < 0){
        this.$store.commit('promptText',{ text: '文件格式只支持：jpg 和 png' })
        return
      }
      this.createImage(files[0])
    },
    createImage(file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.refundMsg.photos.push(e.target.result)
      };
      reader.readAsDataURL(file)
    },
    sendTrue (jump) {
      this.$store.commit('loadShow')
      this.$store.commit('promptText',{ text: '提交成功' })
      if (jump) {
        let t1 = setInterval(() => {
          if (!this.pShow) {
            this.$router.go(-1)
            clearInterval(t1)
          }
        },300)
      }
    },
    sendFalse (jump) {
      this.$store.commit('loadShow')
      this.$store.commit('promptText',{ text: '提交失败' })
      if (jump) {

      }
    },
    // 提交
    sendPost () {
      if (this.iText !== '') {
        if (this.refundMsg.refundText !== '') {
          this.$store.commit('loadShow')
          setTimeout(() => {
            this.sendTrue(true)
          },1000)
        }else {
          this.$store.commit('promptText',{ text: '退款原因不可无' })
        }
      }else {
        this.$store.commit('promptText',{ text: '请选择收货状态' })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    pShow () {
      return this.$store.state.pShow
    }
  }
}
</script>

<style lang="css" scoped>
  .refund{ width: 100%; }
  .refund header{ margin-bottom: 0.14rem; }
  .shop_box{ margin: auto; padding: 0.2rem; overflow: hidden; background-color: #fff; margin-bottom: 0.2rem; }
  .shop_photo{ width: 1.74rem; height: 1.74rem; overflow: hidden; float: left; margin-right: 0.2rem; }
  .shop_text{ height: 1.1rem; overflow: hidden; font-size: 0.28rem; }
  .shop_box p{ line-height: 0.7rem; }
  .shop_box b{ color: #f61a79; }
  .service{ padding: 0.2rem; overflow: hidden; background-color: #fff; margin-bottom: 0.2rem; }
  .service i{ display: block; height: 0.7rem; padding: 0 0.2rem; border: solid 1px #8c8df6; color: #8c8df6; font-size: 0.28rem; text-align: center; line-height: 0.7rem; font-style: normal; margin-right: 0.2rem; border-radius: 0.35rem; float: left; }
  .service p{ font-size: 0.28rem; line-height: 0.7rem; color: #ccc; }
  .refund_box{ width: 100%; background-color: #fff; overflow: hidden; padding-bottom: 1px; margin-bottom: 0.2rem; }
  .refund_state{ width: 100%; overflow: hidden; border-bottom: solid 1px #f5f5f5; }
  .refund_state h3{ width: 30%; padding: 0 5%; font-size: 0.36rem; font-weight: 400; float: left; line-height: 0.7rem; }
  .refund_state i{ width: 27%; padding-right: 3%; float: left; line-height: 0.7rem; font-style: normal; text-align: right; position: relative; }
  .refund_state i::before{ position: absolute; content: ""; width: 0.4rem; height: 0.4rem; left: 0.1rem; top: 50%; border-radius: 50%; overflow: hidden; transform: translateY(-50%); background-image: url(/static/images/checkbix.png); background-size: 100%; background-position: 0 -0.4rem; background-repeat: no-repeat; }
  .refund_state .ihover::before{ background-position: 0 0; }
  .refund_text{ width: 100%; }
  .refund_text h3{ width: 30%; padding: 0 5%; font-size: 0.36rem; font-weight: 400; float: left; line-height: 0.7rem; }
  .refund_text textarea{ width: 50%; padding: 0.2rem; float: left; height: 2rem; border: none; outline-color: #8c8df6; font-size: 0.32rem; resize: none; border: solid 1px #eee; }
  .refund_file{ width: 100%; overflow: hidden; background-color: #fff; padding-bottom: 1.2rem; }
  .refund_price{ width: 100%; overflow: hidden; border-bottom: solid 1px #f5f5f5; }
  .refund_price h3{ width: 30%; padding: 0 5%; font-size: 0.36rem; font-weight: 400; float: left; line-height: 0.7rem; }
  .refund_price b{ float: left; line-height: 0.7rem; font-size: 0.32rem; color: #f61a79; }
  .refund_file p{ padding-left: 5%; line-height: 0.7rem; }
  #file{ display: none; }
  .refund_file label{ width: 20%; height: 1.5rem; border: none; background-image: url(/static/images/addfile.png); background-repeat: no-repeat; background-size: 100%; float: left; }
  .photos_list { width: 100%; overflow: hidden; }
  .photos_list li{ width: 20%; margin: 0 2.5%; float: left;}
  footer{ width: 100%; height: 0.88rem; text-align: center; color: #fff; font-size: 0.36rem; line-height: 0.88rem; background: -webkit-gradient(linear, left top, right top, from(#51d8f0) , to(#429ee4)); background: linear-gradient(to right, #51d8f0 , #429ee4); position: fixed; bottom: 0; left: 0; }
</style>
