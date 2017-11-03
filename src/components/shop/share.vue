<template lang="html">
  <transition name="translate">
    <div class="share">
      <div class="share_box">
        <transition name="slide">
          <p v-if="pShow">{{ promptText }}</p>
        </transition>
        <textarea id="copyp" rows="8" cols="80">{{ copyText }}</textarea>
        <ul>
          <li v-for="(list, index) in sharelists"><img :src="list" @click="shareFunction(index)"></li>
        </ul>
        <h3 @click="off">取消</h3>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'share',
  data () {
    return {
      pShow: false,
      promptText: '',
      copyText: '',
      sharelists: [
        '/static/images/sharing_friends.png',
        '/static/images/sharing_WeChat.png',
        '/static/images/sharing_QQ.png',
        '/static/images/sharing_Qzone.png',
        '/static/images/sharing_blog.png',
        '/static/images/sharing_link.png',
        '/static/images/sharing_scan.png',
      ]
    }
  },
  methods: {
    // 过渡动画方法
    Transition (text) {
      if (!this.pShow) {
        this.promptText = text
        this.pShow = true
        // 提示文字的显示时间设置
        setTimeout(() => {
          this.pShow = false
          this.promptText = ''
        },1500)
      }
    },
    // 取消
    off () {
      this.$store.commit('shareFun')
    },
    shareFunction (index) {
      if (index === 0) {
        this.Transition('分享朋友圈功能还不能使用')
      }
      if (index === 1) {
        this.Transition('分享到微信功能还不能使用')
      }
      if (index === 2) {
        this.Transition('分享到QQ功能还不能使用')
      }
      if (index === 3) {
        this.Transition('分享到空间功能还不能使用')
      }
      if (index === 4) {
        this.Transition('分享到微博功能还不能使用')
      }
      if (index === 5) {
        this.copyText = document.URL
        document.getElementById('copyp').select()
        console.log(document.getElementById('copyp'))
        document.execCommand('Copy')
        console.log(this.copyText)
        this.Transition('复制链接成功！')
      }
      if (index === 6) {
        this.Transition('扫码功能还不能使用')
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .share{ width: 100%; height: 100vh; background-color: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; z-index: 10; }
  .share_box{ width: 100%; height: 6rem; background-color: #fff; position: absolute; bottom: 0; left: 0; }
  .share_box ul{ width: 100%; overflow: hidden; height: 4.3rem; padding-top: 0.8rem; }
  .share_box li{ width: 15%; margin: 0 0 5% 7.5%; float: left; overflow: hidden;}
  .share_box h3{ display: block; width: 100%; height: 0.88rem; line-height: 0.88rem; font-size: 0.32rem; text-align: center; color: rgba(0,0,0,0.7); border-top: 1px solid #ccc}
  .share_box p{ text-align: center; line-height: 0.8rem; transition: 0.3s all; margin-bottom: -0.8rem; }
  #copyp{ display: block; width: 10px; height: 10px; opacity: 0; overflow: hidden; position: absolute; top: 0; left: 0; z-index: -1; }
  /*过渡动画*/
  .translate-enter,.translate-leave-to{
    transform: translateY(100%);
  }
  .slide-enter{
    transform: translateX(-1rem); opacity: 0
  }
  .slide-leave-active{
    transform: translateX(1rem); opacity: 0
  }
</style>
