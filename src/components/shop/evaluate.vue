<template lang="html">
  <div class="evaluate">
    <header>
      <goback></goback>
      <h2>发表评价</h2>
      <i @click="sendPost">发布</i>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 商品 -->
    <div class="shop_box">
      <span class="shop_photo"><img :src="evaluateMsg.shopImg"></span>
      <span class="shop_text">{{ evaluateMsg.shopText }}</span>
      <p>共件{{ evaluateMsg.shopNum }}商品 合计：<b>￥{{ evaluateMsg.price }}</b></p>
    </div>
    <!-- 评论内容 -->
    <span class="comment_box">
      <textarea class="comment_content" rows="8" cols="80" placeholder="宝贝满意吗？分享一下你的心情"></textarea>
    </span>
    <!-- 发表图片 -->
    <div class="evaluate_file">
      <label for="file" v-if="evaluateMsg.photos.length < 5"></label>
      <input type="file" id="file" name="picture" @change="fileChange"/>
      <ul>
        <li v-for="(item, index) in evaluateMsg.photos"><img :src="item"></li>
      </ul>
    </div>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <!-- 评分 -->
    <div class="score">
      <h3>评分</h3>
      <ul v-for="(ulItem, ulIndex) in ulList">
        <i>{{ ulItem }}</i>
        <li v-for="(sItem, index) in new Array(5)" @click="liClick($event,index,ulIndex)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading'
import Goback from '@/components/goback'
import Pbox from '@/components/prompt'
import Ajax from '@/module/ajax'

export default {
  name: 'evaluate',
  data () {
    return {
      ulList: ['服务','环境','技术','效果'],
      evaluateMsg: {
        shopImg: 'static/images/plat1.png',
        shopText: '鱼跃医用测电子家用压全自动高精准老人上臂式量血压计测量表仪器。',
        shopNum: 2,
        price: '268.00',
        photos: [],
        serviceNum: '',
        environmentalNum: '',
        technologyNum: '',
        effectNum: ''
      }
    }
  },
  components: { Goback,Pbox,Loading },
  methods: {
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
        this.evaluateMsg.photos.push(e.target.result)
        // console.log(this.uploadPhotos)
      };
      reader.readAsDataURL(file)
    },
    // 星星点击事件
    liClick (el,index,num) {
      let father = el.target.parentNode
      let cLi = father.getElementsByTagName('li')
      for (let i = 0; i < cLi.length; i++) {
        cLi[i].style.cssText = "background-position: 0 0"
      }
      for (let i = 0; i <= index; i++) {
        cLi[i].style.cssText = "background-position: 0 -0.5rem"
      }
      if (num === 0) {
        this.evaluateMsg.serviceNum = index
      }if (num === 1) {
        this.evaluateMsg.environmentalNum = index
      }if (num === 2) {
        this.evaluateMsg.technologyNum = index
      }if (num === 3) {
        this.evaluateMsg.effectNum = index
      }
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
      if (this.evaluateMsg.serviceNum !=='' && this.evaluateMsg.environmentalNum !=='' && this.evaluateMsg.technologyNum !=='' && this.evaluateMsg.effectNum !=='') {
        this.$store.commit('loadShow')
        setTimeout(() => {
          this.sendTrue(true)
        },1000)
      }else {
        this.$store.commit('promptText',{ text: '请为4个状态评分' })
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
  .evaluate{ width: 100%; overflow: hidden; }
  header i{ font-size: 0.28rem; font-style: normal; position: absolute; line-height: 0.88rem; right: 0; top: 0; width: 0.88rem; color: #8c8df6; }
  header{ margin-bottom: 0.14rem; }
  .shop_box{ margin: auto; padding: 0.2rem; overflow: hidden; background-color: #fff; }
  .shop_photo{ width: 1.74rem; height: 1.74rem; overflow: hidden; float: left; margin-right: 0.2rem; }
  .shop_text{ height: 1.1rem; overflow: hidden; font-size: 0.28rem; }
  .shop_box p{ line-height: 0.7rem; }
  .shop_box b{ color: #f61a79; }
  .comment_box{ width: 100%; background-color: #fff; padding-bottom: 1px; }
  .comment_content{ display: block; width: calc(100% - 0.8rem);height: 2rem; padding: 0.2rem; border: solid 1px #eee; font-size: 0.32rem; margin: auto; resize: none; outline-color: #8c8df6; }
  .comment_content::-webkit-input-placeholder { color: #ccc; }
  .evaluate_file{ width: 100%; overflow: hidden; background-color: #fff; padding-bottom: 0.2rem; border-bottom: solid 1px #eee; }
  .evaluate_file label{ width: 20%; height: 1.5rem; margin-left: 0.2rem; border: none; background-image: url(/static/images/addfile.png); background-repeat: no-repeat; background-size: 100%; float: left; }
  #file{ display: none; }
  .evaluate_file ul{ width: 100%; overflow: hidden; }
  .evaluate_file li{ width: 16%; padding: 0 2%; float: left; }
  .score{ padding: 0.2rem; overflow: hidden; background-color: #fff; }
  .score h3{ font-size: 0.36rem; line-height: 0.7rem; font-weight: 400; }
  .score ul{ width: 100%; overflow: hidden; margin-bottom: 0.2rem; }
  .score i{ font-size: 0.32rem; margin-right: 0.2rem; float: left; font-style: normal; line-height: 0.5rem; }
  .score li{ float: left; width: 0.5rem; height: 0.5rem; background-image: url(/static/images/collection.png); background-repeat: no-repeat; background-size: 100%; background-position: 0 0; margin-right: 0.1rem; }

</style>
