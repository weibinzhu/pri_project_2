<template lang="html">
  <div class="signin">
    <a class="goback iconfont icon-jiantou01" @click="goback"></a>
    <div class="signin_box">
      <span class="portrait"><img :src="portrait" alt=""></span>
      <span class="prompt_box">
        <transition name="slide">
          <h3 v-if="prompt">{{ promptText }}</h3>
        </transition>
      </span>
  		<input type="text" class="phone_text" v-model="phone" placeholder="手机号码">
  		<span class="obtain" @click="vNum">验证码</span>
  		<input type="text" v-model="verification" class="verification_text" placeholder="验证码">
  		<span class="signin_btn" @click="signin">登录</span>
      <router-link tag="span" class="register_btn" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import Ajax from '@/module/ajax'

export default {
  name: 'signin',
  data () {
    return {
      goNum: 1,
      portrait: '/static/images/portrait.png',
      phone: '',
      verification: '',
      promptText: '请输入有效的手机号码',
      prompt: false,
      btnClick: true,
      param: ''
    }
  },
  methods: {
    goback () {
       this.$router.go(-this.goNum)
    },
    // 过渡动画
    Transition (text) {
      if (!this.prompt) {
        this.promptText = text
        this.prompt = true
        // 提示文字的显示时间设置
        setTimeout(() => {
          this.prompt = false
          this.promptText = '请输入有效的手机号码'
        },1500)
      }
    },
    // 获取验证码
    vNum () {
      // 判断手机格式的标准定义
      let standard = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/
      let pNum = this.phone.toString()
      if (this.btnClick) {
        this.btnClick = !this.btnClick
        // 判断用户是否输入正确的手机号码
        if (standard.test(pNum)) {
          // 请求参数
          let phoneNum = 'mobile=' + this.phone
          // 验证手机是否注册过
          let getSuccess = (data) => {
            console.log(data)
            if (data === 1) {
              // 验证手机号没注册过之后就获取验证码
              let getNum = (data) => {
                console.log(data)
                this.param = data.param
                this.Transition ('验证码已发送（5分钟内有效）')
                // 获取验证码成功之后的时间设置
                setTimeout(() => {
                  this.btnClick = !this.btnClick
                },10000)
              }
              let getnumError = (error) => {
                console.log(error)
              }
              Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/Login/sendSmsRegisterCodeApi', 'POST', getNum, getnumError, phoneNum)
            }
            if (data === 0) {
              this.Transition ('此手机还没注册过')
            }
          }
          let getError = (error) => {
            console.log(error)
          }
          // 成功之后请求验证码
          Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/Login/mobile', 'POST', getSuccess, getError, phoneNum)
        }else {
          this.phone = ''
          this.prompt = !this.prompt
          setTimeout(() => {
            this.prompt = !this.prompt
            this.btnClick = !this.btnClick
          },1500)
        }
      }
    },
    signin () {
      let standard = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/
      let pNum = this.phone.toString()
      // 再验证用户是否输入正确的手机号码
      if (standard.test(pNum)) {
        let ajaxData = 'mobile=' + this.phone +'&sms_captcha=' + this.param
        // 安全起见，再验证一次手机验证码
        if (this.verification !== '' && Number(this.verification) && Number(this.verification).toString().length === 6 && Number(this.verification) === this.param) {
          let getSuccess = (data) => {
            console.log(data)
            localStorage.setItem('state', '1')
            localStorage.setItem('userID', data.uid)
            this.$router.go(-1)
          }
          let getError = (error) => {
            console.log(error)
          }
          Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/login/signin', 'POST', getSuccess, getError, ajaxData)
        }else {
          this.Transition('请输入正确的验证码')
        }
      }else {
        this.phone = ''
        this.prompt = !this.prompt
        setTimeout(() => {
          this.prompt = !this.prompt
          this.btnClick = !this.btnClick
        },1500)
      }
    }
  },
  mounted () {
    this.goNum = JSON.parse(location.href.substring(location.href.length-1))
  }
}
</script>

<style lang="css" scoped>
  .signin{ width: 100%; max-width: 550px; height: 100vh; margin: auto; position: relative; min-height: 10rem; background-image: url(/static/images/signin.jpg); background-size: cover; background-repeat: no-repeat; }
  .goback{ display: block; width: 0.88rem; height: 0.88rem; color: #fff; line-height: 0.88rem; text-align: center; position: absolute; left: 0; top: 0; font-size: 0.36rem; cursor: pointer; }
  .signin_box{ width: 6.05rem; height: 6.8rem; position: absolute; margin: auto; left: 0; right: 0; top: 0; bottom: 0; }
  .portrait{ width: 1.75rem; height: 1.75rem; border-radius: 50%; margin: auto; overflow: hidden; }
  .prompt_box{ width: 100%; height: 0.9rem; }
  .prompt_box h3{ line-height: 0.9rem; text-align: center; color: #fff; font-size: 0.32rem; font-weight: 400; transition: 0.4s all; }
  input{ display: block; outline: none; border: none; height: 0.32rem; padding: 0.2rem 0.22rem; background-color: rgba(255,255,255,0.3); border-radius: 0.08rem; color: rgba(255,255,255,0.8); font-size: 0.28rem; }
  input::-webkit-input-placeholder { color: rgba(255,255,255,0.8); }
  .phone_text{ width: 5.6rem; margin-bottom: 0.15rem;}
  .verification_text{ width: 3.6rem; margin-bottom: 0.9rem;}
  .obtain{ display: block; float: right; background: rgba(255,255,255,0.3); color: rgba(255,255,255,0.9); width: 1.8rem; height: 0.72rem; border-radius: 0.08rem; font-size: 0.28rem; line-height: 0.72rem; text-align: center;}
  .signin_btn{ width: 3.5rem; height: 0.72rem; text-align: center; line-height: 0.72rem; font-size: 0.28rem; color: #553f8c; background: rgba(255,255,255,0.7); margin: 0 auto 0.15rem; border-radius: 0.08rem;}
  .register_btn{ width: 3.5rem; height: 0.72rem; text-align: center; line-height: 0.72rem; font-size: 0.28rem; color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.3); margin: auto; border-radius: 0.08rem;}
  /*动画*/
  .slide-enter{
    transform: translateX(-1rem); opacity: 0
  }
  .slide-leave-active{
    transform: translateX(1rem); opacity: 0
  }
</style>
