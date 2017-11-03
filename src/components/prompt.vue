<template lang="html">
  <transition name="Scale">
    <div class="prompt">
      <span class="prompt_box">
        <p>{{ pText }}</p>
        <h3 @click="off">确定</h3>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'prompt',
  methods: {
    off () {
      this.$store.commit('promptText',{})
    }
  },
  computed: {
    pText () {
      return this.$store.state.pText
    }
  }
}
</script>

<style lang="css" scoped>
  .prompt{ width: 100%; height: 100vh; position: fixed; top: 0; left: 0; background-color: rgba(0,0,0,0.3); z-index: 12; }
  .prompt_box{ width: 6rem; height: 3.4rem; padding: 0.7rem 0 0; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; background-color: #fff; border-radius: 0.12rem; }
  .prompt_box p{ line-height: 0.5rem; text-align: center; margin: 0.7rem; }
  .prompt_box h3{ display: block; width: 1.8rem; height: 0.7rem; border: solid 1px #8794f5; color: #8794f5; text-align: center; line-height: 0.7rem; border-radius: 0.08rem; margin: auto; }
  /*过渡动画*/
  .Scale-enter,.Scale-leave-to{
    opacity: 0.3;
    transform: scale(1.2,1.2);
  }
</style>
