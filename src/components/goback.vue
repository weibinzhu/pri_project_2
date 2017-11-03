<template lang="html">
   <a class="iconfont icon-jiantou01 goback" @click="goback"></a>
</template>

<script>
export default {
   name: 'goback',
   methods: {
      goback () {
         this.$router.go(-1)              // 返回上一级
         // this.$router.push({ path: '/'})  // 直接回到首页
         // router.push({ name: 'hello', params: { userId: 123 }}) // 命名的路由
      }
   }
}
</script>

<style lang="css" scoped>
   .goback{ display: block; width: 0.88rem; height: 0.88rem; color: #333; line-height: 0.88rem; text-align: center; position: absolute; left: 0; top: 0; font-size: 0.36rem; cursor: pointer; }
</style>
