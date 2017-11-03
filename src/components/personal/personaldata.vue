<template lang="html">
  <div class="personaldata">
    <header v-if="headerShow">
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <nav class="personal_list">
       <li>
          <h2>账号</h2>
          <h3>{{ Anumber }}</h3>
       </li>
       <li>
          <h2>昵称</h2>
          <h3 @click="nameShow = !nameShow,isheadershow()">{{ Aname }}</h3>
       </li>
       <li>
          <h2>密码</h2>
          <h4 @click="passwordShow = !passwordShow,isheadershow()">修改</h4>
       </li>
       <li>
          <h2>手机</h2>
          <h3 @click="phoneShow = !phoneShow,isheadershow()">{{ Aphone }}</h3>
       </li>
       <router-link tag="li" to="/paddress">
         <h2>我的收货地址</h2>
       </router-link>
    </nav>
    <span class="btn">退出登录</span>
    <!-- 修改名字 -->
    <section class="class_box" v-if="nameShow">
      <header>
        <span class="close iconfont icon-jiantou01" @click="nameShow = !nameShow,isheadershow()"></span>
        <h2>修改个人呢称</h2>
      </header>
       <span class="name_box">
          <h2>新的呢称</h2>
          <input class="name_input" type="text" placeholder="输入新的name">
       </span>
       <span class="btn">保存</span>
    </section>
    <!-- 修改密码 -->
    <section class="class_box" v-if="passwordShow">
      <header>
        <span class="close iconfont icon-jiantou01" @click="passwordShow = !passwordShow,isheadershow()"></span>
        <h2>修改当前密码</h2>
      </header>
      <div class="resetpassword">
        <ul>
          <li>
            <h2>当前密码：</h2>
            <input type="text" placeholder="请输入">
          </li>
          <li>
            <h2>新的密码：</h2>
            <input type="password" placeholder="请输入">
          </li>
          <li>
            <h2>确认新密码：</h2>
            <input type="password" placeholder="请输入">
          </li>
        </ul>
        <span class="btn">保存</span>
      </div>
    </section>
    <!-- 修改手机号 -->
    <section class="class_box" v-if="phoneShow">
      <header>
        <span class="close iconfont icon-jiantou01" @click="phoneShow = !phoneShow,isheadershow()"></span>
        <h2>修改当前手机号</h2>
      </header>
      <div class="BindMobile">
        <div class="phone_box">
           <span class="phone_num">
              <h2>手机号</h2>
              <input type="text" name="" value="" placeholder="请输入新的手机号">
           </span>
           <span class="obtain_num">
              <h2>手机验证码</h2>
              <input type="text" name="" value="" placeholder="请输入验证码">
              <span class="obtain">获取验证码</span>
           </span>
        </div>
        <span class="btn">保存</span>
      </div>
    </section>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'personaldata',
  data () {
    return {
      title: '个人资料',
      Anumber: '13265317656',
      Aname: '张国荣',
      Aphone: '13265317656',
      headerShow: true,
      nameShow: false,
      passwordShow: false,
      phoneShow: false
    }
  },
  components: { Goback },
  methods: {
    isheadershow () {
      this.headerShow = !this.headerShow
    }
  }
}
</script>

<style lang="css" scoped>
  .personaldata{ width: 100%; }
  .personaldata header{ position: relative; }
  .personal_list{ width: 96%; overflow: auto; background: #fff; padding: 0 2%;}
  .personal_list li{ height: 0.88rem; width: 100%; border-bottom: solid 1px #f4f4f4; line-height: 0.88rem; background-image: url(/static/images/more.png); background-size: 0.56rem 0.28rem; background-position: 102% 50%; background-repeat: no-repeat;}
  .personal_list li:first-child{ background: none; }
  .personal_list h2{ font-size: 0.32rem; font-weight: 600; color: rgba(0,0,0,0.7); float: left; }
  .personal_list h3{ font-size: 0.32rem; font-weight: 400; color: rgba(0,0,0,0.5); float: right; margin-right: 0.6rem; }
  .personal_list li:first-child h3{ margin: 0;}
  .personal_list h4{ font-size: 0.32rem; font-weight: 400; color: #5278ff; float: right; margin-right: 0.6rem; }
  .btn{ width: 2.5rem; height: 0.7rem; line-height: 0.7rem; text-align: center; background: #8c8df6; color: #fff; border-radius: 0.08rem; margin: 1.5rem auto 0; }
  /*一开始不显示的内容*/
  .class_box{ width: 100%; position: fixed; top: 0; left: 0; min-height: 9rem; background: #ebf6f8; }
  .close{ width: 0.88rem; height: 0.88rem; color: #333; text-align: center; line-height: 0.88rem; font-size: 0.36rem; position: absolute; left: 0; top: 0; }
  /*修改名字*/
  .name_box{ width: 96%; height: 0.88rem; background: #fff; line-height: 0.88rem; padding:0 2%;}
  .name_box h2{ display: block; width: 30%; font-size: 0.32rem; font-weight: 600; color: rgba(0,0,0,0.7); float: left; }
  .name_input{ display: block; height: 0.7rem; width: 70%; border-bottom: 1px solid #ccc; border-top: none; border-left: none; border-right: none; border-top: none; padding: 0.1rem 0 0; outline: none; font-size: 0.28rem; }
  /*修改密码*/
  .resetpassword{ width: 100%; }
  .resetpassword ul{ width: 96%; padding: 0 2%; background: #fff; }
  .resetpassword li{ height: 0.88rem; width: 100%; line-height: 0.88rem; }
  .resetpassword h2{ display: block; float: left; width: 30%; font-size: 0.32rem; font-weight: 600; color: rgba(0,0,0,0.7);}
  .resetpassword input{ display: block; height: 0.7rem; width: 70%; border-bottom: 1px solid #ccc; border-top: none; border-left: none; border-right: none; border-top: none; padding: 0.1rem 0 0; outline: none; font-size: 0.28rem; }
  /*修改手机号码*/
  .BindMobile{ width: 100%; }
  .phone_box{ background: #fff;}
  .phone_num{ height: 0.88rem; width: 96%; padding: 0 2%; line-height: 0.88rem;}
  .BindMobile h2{ display: block; width: 30%; font-size: 0.32rem; font-weight: 600; color: rgba(0,0,0,0.7); float: left;}
  .phone_num input{ display: block; height: 0.7rem; width: 70%; border-bottom: 1px solid #ccc; border-top: none; border-left: none; border-right: none; border-top: none; padding: 0.1rem 0 0; outline: none; font-size: 0.28rem; }
  .obtain_num{ height: 0.88rem; width: 96%; padding: 0 2%; line-height: 0.88rem; margin: 0;}
  .obtain_num input{ display: block; height: 0.7rem; width: 35%; border-bottom: 1px solid #ccc; border-top: none; border-left: none; border-right: none; border-top: none; padding: 0.1rem 0 0; outline: none; font-size: 0.28rem; float: left;}
  .obtain{ width: 30%; border: solid 1px #8c8df6; color: #8c8df6; text-align: center; line-height: 0.7rem; height: 0.7rem; float: right; margin-top: 0.05rem; border-radius: 0.08rem;}

</style>
