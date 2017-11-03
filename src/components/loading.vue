<template lang="html">
  <transition name="Opacity">
    <div class="loading">
      <span class="loading_text"><p>{{ loadingText }}</p></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      loadingText: '操作正在进行中...'
    }
  }
}
</script>

<style lang="css" scoped>
.loading{ width: 100%; height: 100vh; background-color: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; z-index: 15; }
.loading_text{ width: 80%; height: 0.5rem; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; }
.loading_text p{ text-align: center; line-height: 0.5rem; color: #fff; -webkit-animation: mymove 3s infinite; animation: mymove 3s infinite; }
@-webkit-keyframes mymove{
  0%{ letter-spacing: 1px; }
  50%{ letter-spacing: 7px; }
  100%{ letter-spacing: 1px; }
}
@keyframes mymove{
  0%{ letter-spacing: 1px; }
  50%{ letter-spacing: 7px; }
  100%{ letter-spacing: 1px; }
}
/*过渡动画*/
.Opacity-enter,.Opacity-leave-to{
  opacity: 0.3
}
</style>
