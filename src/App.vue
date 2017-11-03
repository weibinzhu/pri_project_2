<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css">
  *{ padding: 0; margin: 0; color: #333; }
  body{ font-family: 微软雅黑; color: #333; letter-spacing: 1px; -webkit-tap-highlight-color:rgba(0,0,0,0); font-size: 0.32rem; background: #f5f5f5; }
  li{ list-style: none; }
  a{ text-decoration: none; color: #333; }
  span,img{ display: block; }
  img{ width: 100%; }
  header{ width: 100%; height: 0.88rem; text-align: center; background: #fff; position: fixed; top: 0; left: 0; border-bottom: solid 2px #eee; z-index: 6; }
  header h2{ font-size: 0.36rem; color: #333; font-weight: 400; line-height: 0.88rem; }
  .spacing{ height: 1.05rem; }
  .spacing2{ height: 0.9rem; }
  header,footer,div,span,a,li,input,*::before{ -webkit-transition: .4s all; transition: .4s all}
  #app{ width: 100%; margin: auto; max-width: 550px; }
  .flex{ display: -webkit-box; display: flex; -webkit-flex-wrap: wrap; flex-wrap: wrap; }
  .f1{ -webkit-box-flex: 1; flex: 1; }
  .f2{ -webkit-box-flex: 2; flex: 2; }
  .f3{ -webkit-box-flex: 3; flex: 3; }
</style>
