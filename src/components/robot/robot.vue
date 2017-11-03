<template lang="html">
  <section class="robot">
    <div class="pay_content">
      <span class="about" @click="boxShow = !boxShow">关于</span>
      <div class="text_box">
        <h3>{{ robotText }}</h3>
        <h2>{{ robotPhone }}</h2>
        <span><img src="/static/images/robot.png" alt=""></span>
        <audio src="" autoplay preload controls style="visibility: hidden" id="bgmusic"></audio>
      </div>
    </div>
    <!-- 版权介绍 -->
    <transition name="translatex">
      <div class="copyright" v-if="boxShow">
        <span class="top">
          <i class="iconfont icon-jiantou01" @click="boxShow = !boxShow"></i>
          <h3>关于我们</h3>
        </span>
        <h4>AI康 幸福百年旗下购物平台</h4>
        <p>AI康由广东幸福百年科技发展有限公司于2017年创建，以客户为核心，运用互联网、大数据、物联网、人工智能等未来新技术，并聚合全球最优质的服务资源，构造精选商品旗舰平台。</p>
        <p>AI康一直以来以“顾客之上，品质乘上”作为公司和每位员工的行为准则，以“最大程度满足客户需求”为目标，为客户提供智能、便捷、专业、丰富的一站式购物服务和完善的售后服务。打造新电商E时代购物体验。</p>
        <h4 style="padding-top: 30%">版权信息</h4>
        <p class="copyright_p">广东幸福百年科技发展有限公司</p>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'robot',
  data () {
    return {
      boxShow: false,
      robotText: '欢迎拨打你的私人健康顾问电话',
      robotPhone: '020-62736333'
    }
  },
  methods: {
    play () {
      // 语音播放
      var audioEl = document.getElementById('bgmusic');
      function log(info) {
          // console.log(info)
      }
      function forceSafariPlayAudio() {
          audioEl.load() // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
          audioEl.play() // iOS 7/8 仅需要 play 一下
      }
      audioEl.addEventListener('loadstart', function() {
          log('loadstart')
      }, false)
      audioEl.addEventListener('loadeddata', function() {
          log('loadeddata')
      }, false)
      audioEl.addEventListener('loadedmetadata', function() {
          log('loadedmetadata')
      }, false)
      // audioEl.addEventListener('canplay', function() {   // 重复播放
      //     log('canplay');
      // }, false);
      audioEl.addEventListener('play', function() {
          log('play')
          // 当 audio 能够播放后, 移除这个事件
          window.removeEventListener('touchstart', forceSafariPlayAudio, false);
      }, false)
      audioEl.addEventListener('playing', function() {
          log('playing')
      }, false)
      audioEl.addEventListener('pause', function() {
          log('pause')
      }, false)
      // 由于 iOS Safari 限制不允许 audio autoplay, 必须用户主动交互(例如 click)后才能播放 audio,
      // 因此我们通过一个用户交互事件来主动 play 一下 audio.
      window.addEventListener('touchstart', forceSafariPlayAudio, false);
      audioEl.src = '/static/images/kangkang.mp3.mp3'   //  在这里写上路径
    }
  },
  mounted () {
    this.play()
  }
}
</script>

<style lang="css" scoped>
  .robot{ width: 100%; }
  .pay_content{ width: 100%; height: 100vh; background-image: url(/static/images/robotbg.jpg); background-position: center; background-size: cover; background-repeat: no-repeat; position: relative; }
  .text_box{ width: 5rem; height: 6rem; position: absolute; top: 0; bottom: 0; right: 0; left: 0; margin: auto;}
  .text_box h3{ text-align: center; font-size: 0.28rem; line-height: 0.5rem; color: #fff; font-weight: 400; }
  .text_box h2{ text-align: center; font-size: 0.44rem; line-height: 0.7rem; margin-bottom: 0.4rem; color: #fff; font-weight: 400; }
  .text_box span{ width: 60%; margin: auto; }
  .about{ width: 2.6rem; height: 0.7rem; text-align: center; line-height: 0.7rem; color: #fff; border: solid 1px #fff; border-radius: 0.08rem; position: absolute; top: 15%; margin-left: -1.3rem; left: 50%; z-index: 5; }
  .copyright{ height: 100vh; padding: 0 0.2rem; background-color: #fff; position: absolute; top: 0; left: 0; z-index: 10; }
  .top{ width: 100%; height: 0.88rem; text-align: center; position: relative; border-bottom: solid 2px #eee; margin-bottom: 0.2rem; }
  .top i{ display: block; width: 0.88rem; height: 0.88rem; color: #333; line-height: 0.88rem; text-align: center; position: absolute; left: 0; top: 0; font-size: 0.36rem; }
  .top h3{ color: #333; line-height: 0.88rem; text-align: center; font-size: 0.36rem; font-weight: 400; }
  .copyright h4{ color: #8c8df6; line-height: 0.6rem; text-align: center; font-size: 0.36rem; }
  .copyright p{ margin-bottom: 0.2rem; line-height: 0.5rem; }
  .copyright .copyright_p{ text-align: center; color: #ccc; margin-bottom: 0.5rem; }
  .translatex-enter,.translatex-leave-to{
    transform: translateX(100%);
  }
</style>
