<template lang="html">
  <div class="release">
    <header>
      <goback></goback>
      <h2>发布话题</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing"></span>
    <!-- 文本框 -->
    <textarea rows="8" cols="80" class="text_box" v-model="releaseText" placeholder="请输入.."></textarea>
    <!-- 上传图片列表 -->
    <ul class="upload_photos flex">
      <li class="f1" v-for="(uploadPhoto, index) in uploadPhotos"><img :src="uploadPhoto" alt=""></li>
    </ul>
    <input type="file" id="file" name="picture" @change="fileChange"/>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <footer class="flex">
      <label class="f1" for="file"></label>
      <span class="f1" @click="tishi('改模块还没开发完成')">发起公益</span>
      <span class="f1" @click="sendPost">发帖</span>
    </footer>
  </div>
</template>

<script>
import Loading from '@/components/loading'
import Pbox from '@/components/prompt'
import Goback from '@/components/goback'
import Ajax from '@/module/ajax'

export default {
  name: 'release',
  data () {
    return {
      userId: '',
      releaseText: '',
      uploadPhotos: []
    }
  },
  components: { Goback,Loading,Pbox },
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
        if (this.uploadPhotos.length >= 3) {
          return
        }else {
          this.uploadPhotos.push(e.target.result)
          // console.log(this.uploadPhotos)
        }
      };
      reader.readAsDataURL(file)
    },
    sendTrue () {
      this.$store.commit('loadShow')
      this.$store.commit('promptText',{ text: '发帖成功' })
      let t1 = setInterval(() => {
        if (!this.pShow) {
          this.$router.go(-1)
          clearInterval(t1)
        }
      },300)
    },
    sendFalse () {
      this.$store.commit('loadShow')
      this.$store.commit('promptText',{ text: '发帖失败' })
      this.releaseText = ''
    },
    // 发帖
    sendPost () {
      let that = this
      if (that.releaseText !== '') {
        that.$store.commit('loadShow')
        let picture = that.uploadPhotos.join('&')
        let ajaxData = 'uid=' + that.userId + '&content=' + that.releaseText
        //  + '&picture=' + picture
        let getSuccess = (data) => {
          // console.log(data)
          if (data.cookie) {
            that.sendTrue()
          }else {
            that.sendFalse()
          }
        }
        let getError = (error) => {
          console.log(error)
          that.sendFalse()
        }
        Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/Welfare/posted', 'POST', getSuccess, getError, ajaxData)
      }else {
        this.$store.commit('promptText',{ text: '输入不能为空' })
      }
    },
    tishi (text) {
      this.$store.commit('promptText',{ text: text })
    }
  },
  mounted () {
    if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
      this.$router.push({ path: '/signin', query: { plan: '2' }})
    }
    this.userId = localStorage.getItem('userID')
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
  header{ margin-bottom: 0.6rem; }
  .release{ width: 100%; }
  .text_box{ display: block; width: 6rem; height: 4rem; padding: 0.2rem; box-shadow: 0px 0px 15px rgba(0,0,0,0.3); border: none; outline-color: #8c8df6; margin: auto; resize: none; font-size: 16px; color: #333; margin-bottom: 0.6rem; }
  .upload_photos{ width: 96%; padding: 0 2%; }
  .upload_photos li{ max-width: 2.65rem; max-height: 2.65rem; overflow: hidden; }
  #file{ opacity: 0; }
  footer{ width: 100%; height: 0.98rem; box-shadow: 0 0 15px rgba(0,0,0,0.3); background-color: #fff; position: fixed; bottom: 0; left: 0; }
  footer span{ text-align: center; line-height: 0.98rem; position: relative; }
  footer span::before{ position: absolute; content: ""; top: 0.14rem; left: 0; width: 1px; height: 0.7rem; background-color: #ccc; }
  footer label{ background-image: url(/static/images/icon_piture.png); background-size: 0.5rem 0.5rem; background-position: center center; background-repeat: no-repeat; }
</style>
