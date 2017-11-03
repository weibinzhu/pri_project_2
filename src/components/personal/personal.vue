  <template lang="html">
  <section class="personal">
    <!-- 头部 -->
    <div class="personal_top">
      <span class="personal_tag"><img src="/static/images/personal_label@3x.png" /></span>
      <router-link tag="span" class="p_btn" to="/pdata"><img src="/static/images/set@3x.png"/></router-link>
      <span class="p_btn" @click="show = !show"><img src="/static/images/share@3x.png"/></span>
      <span class="portrait">
        <label for="file" class="portrait_photo"><img :src="portrait"></label>
        <input type="file" id="file" name="picture" @change="fileChange"/>
  			<h2>用户名</h2>
  		</span>
    </div>
    <!-- 个人信息按钮 -->
    <nav class="personal_nav">
      <router-link tag="li" to="/myacc"><img src="/static/images/personal_1.png" alt=""></router-link>
      <router-link tag="li" to="/myorder"><img src="/static/images/personal_2.png" alt=""></router-link>
      <router-link tag="li" to="/mypap"><img src="/static/images/personal_3.png" alt=""></router-link>
      <router-link tag="li" to="/mycoll"><img src="/static/images/personal_4.png" alt=""></router-link>
      <router-link tag="li" to="/myarc"><img src="/static/images/personal_5.png" alt=""></router-link>
      <router-link tag="li" to="/myrew"><img src="/static/images/personal_6.png" alt=""></router-link>
      <router-link tag="li" to="/personal"><img src="/static/images/personal_7.png" alt=""></router-link>
      <router-link tag="li" to="/personal"><img src="/static/images/personal_8.png" alt=""></router-link>
      <router-link tag="li" to="/mypost"><img src="static/images/personal_9.png" alt=""></router-link>
      <router-link tag="li" to="/personal"><img src="static/images/personal_10.png" alt=""></router-link>
  	</nav>
    <!-- 分享的二维码 -->
    <transition name="scale">
      <div class="share" v-if="show">
  			<span class="close iconfont icon-guanbi" @click="show = !show"></span>
  			<span class="QRcode"><img src="/static/images/wechart.jpg" alt=""></span>
  			<p>手机扫二维码建立邀请关系</p>
  		</div>
    </transition>
  </section>
</template>

<script>
// import Ajax from '@/module/ajax'

export default {
  name: 'personal',
  data () {
    return {
      show: false,
      portrait: '/static/images/portrait.png'
    }
  },
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
        this.portrait = e.target.result
      };
      reader.readAsDataURL(file)
    }
  },
  mounted () {
    if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
      this.$router.push({ path: '/signin', query: { plan: '2' }})
    }
  }
}
</script>

<style lang="css" scoped>
  .personal{ width: 100%; }
  .personal_top{ width: 100%; height: 3.22rem; background-image: url(/static/images/personal_bg.png); background-size: 100%; background-repeat: no-repeat; position: relative; }
  .p_btn{ width: 0.42rem; height: 0.42rem; float: right; color: #fff; text-align: center; line-height: 0.88rem; margin-right: 0.40rem; margin-top:0.2rem ;font-size: 0.36rem; }
  .personal_tag{width: 1.56rem; height:0.58; float: left;margin-top: 0.2rem; margin-left: 0.2rem;}
  .portrait{ width: 1.34rem; height: 1.8rem; margin: -0.9rem -0.67rem; text-align: center; position: absolute; top: 50%; left: 50%; }
  .portrait_photo{ display: block;  width: 1.34rem; height: 1.34rem; border-radius: 50%; overflow: hidden; }
  #file{ display: none; }
  .portrait h2{ font-size: 0.32rem; color: #fff; font-weight: 400; }
  .personal_nav{ width: 100%; overflow: hidden; padding-bottom: 1rem; background-color: #fff}
  .personal_nav li{ width: 3.58rem; height: 2.1rem; overflow: hidden; float: left; border-radius: 0.08rem; margin-top:0.1rem; margin-left: 0.1rem; background-image: url(/static/images/imgloading.png); background-repeat: no-repeat; background-size: 2.7rem 1.93rem; background-position: center center;}
  .share{ position: fixed; width: 6rem; height: 6rem; margin: -3rem; top: 50%; left: 50%; background: #fff; border-radius: 0.12rem; box-shadow: 0px 0px 15px rgba(0,0,0,0.5)}
  .close{ display: block; width: 0.88rem; height: 0.88rem; float: right; font-size: 0.64rem; text-align: center; line-height: 0.88rem;}
  .QRcode{ width: 4rem; height: 4rem; overflow: hidden; margin: auto; clear: both;}
  .share p{ text-align: center; line-height: 0.88rem; }
  /*过渡效果*/
  .scale-enter{
    	transform: translateY(-2rem);
      opacity: 0
  }
   .scale-leave-active{
     transform: translateY(2rem);
     opacity: 0
   }
</style>
