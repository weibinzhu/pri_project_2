<template lang="html">
  <div class="index">
    <router-view></router-view>
    <!-- 底部 -->
    <footer class="flex">
      <router-link class="f1 footer_nav_item" to="/home"><span style="background-image: url(/static/images/f_home.png)"></span>首页</router-link>
      <router-link class="f1 footer_nav_item" to="/shopclass"><span style="background-image: url(/static/images/f_shopclass.png)"></span>分类</router-link>
      <router-link class="f1" to="/robot">
        <span class="logo">
          <img :src="logoImg" alt="" />
          <p>康康</p>
        </span>
      </router-link>
      <router-link class="f1 footer_nav_item" to="/shopcar"><span style="background-image: url(/static/images/f_shopping.png)"></span>购物车</router-link>
      <router-link class="f1 footer_nav_item" to="/personal"><span style="background-image: url(/static/images/f_personal.png)"></span>个人中心</router-link>
    </footer>
  </div>
</template>

<script>
export default {
   name: 'index',
   data () {
      return {
         logoImg: '/static/images/logo.png',
      }
   }
}
</script>

<style lang="css" scoped>
  .index{ width: 100%; overflow: hidden; }
  footer{ height: 1rem; width: 100%; position: fixed; bottom: 0; left: 0; border-top: solid 1px #eee; background-color: #fff; z-index: 5; }
  footer span{ width: 0.48rem; height: 0.48rem; margin: 0.06rem auto 0.1rem; line-height: 1rem; background-size: 0.48rem 0.96rem; background-position: 0 0; background-repeat: no-repeat; transition: 0s all; }
  .footer_nav_item{margin-top:0.05rem;font-size: 0.2rem;color: #999; text-align: center}
  .logo{ width: 1.06rem; height: 2.72rem; margin: -0.43rem auto 0; }
  .logo p{height:0.4rem; line-height:0.4rem; color:#999; text-align: center;font-size:0.2rem}
  /*路由激活时的样式  exact */
  .router-link-active span{
    background-position: 0 -0.48rem;
  }
  .router-link-active{
    color:#2ac19c;
  }
  /*需要过渡的组件效果*/
  /*.fade-enter-active, .fade-leave-active {
    transition: .4s;
  }
  .fade-enter{
    position: fixed;
    top: 0.88rem;
    left: 0;
    opacity: 0.5;
    transform: scale(0.5,0.5) translateY(100%);
  }
  .fade-leave-to{
    position: fixed;
    top: 0.88rem;
    left: 0;
    opacity: 0.5;
    transform: scale(0.8,0.8);
  }*/
</style>
