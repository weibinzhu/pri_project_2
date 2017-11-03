<template lang="html">
  <div class="agent">
    <header>
      <goback></goback>
      <h2>合作加盟</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 图片区域 -->
    <ul class="content">
      <li v-for="(item, index) in content" :key="index"><img :src="item.shopImg"></li>
    </ul>
    <img src="/static/images/agent_img.jpg"/>
    <span class="agreement">
      <p :class="{p_hover: agreementState}" @click="agreementState = !agreementState">我已阅读并同意<a>《代理服务协议》</a></p>
    </span>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <!--<footer class="flex">-->
      <!--<span class="f1"><a class="keeper"></a></span>-->
      <!--<span class="add_agent f3" @click="addAgent">加入代理</span>-->
    <!--</footer>-->
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Pbox from '@/components/prompt'
import Loading from '@/components/loading'

export default {
  name: 'agent',
  data () {
    return {
      agreementState: true,
      content:[{
        shopImg:'/static/images/bannerloding.jpg'
      }],// 传回来的数据
      contentImgs: ['/static/images/agent.png','/static/images/agent.png']
    }
  },
  components: { Goback,Pbox,Loading },
  created(){
    this.getGoodsList()
  },
  methods: {
    getGoodsList(){
      this.$http.post('http://www.aikhome.com/index.php/apiv/Goods/getGoodslist',{
        category_id:327
      },{
        emulateJSON:true
      }).then(res=>{
        console.log(res.body[0])
        this.content = [res.body[0]]
      })
    },
    addAgent () {
      this.$store.commit('loadShow')
      setTimeout(() => {
        this.$store.commit('loadShow')
        this.$store.commit('promptText',{ text: '该功能暂没完成' })
      },1000)
    }
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
  .agent{ width: 100%; overflow: hidden; }
  .content{ width: 100%; }
  .agreement{ padding: 0.19rem 0.2rem; margin-bottom: 1.16rem; background-color: #fff; }
  .agreement p{ display: inline-block; height: 0.5rem; line-height: 0.5rem; padding-left: 0.6rem; background-image: url(/static/images/checkbix.png); background-repeat: no-repeat; background-size: 0.5rem 1rem; background-position: bottom left; }
  .agreement .p_hover{ background-position: top left; }
  .agreement a{ color: blue; }
  footer{ width: 100%; height: 0.96rem; position: fixed; bottom: 0; left: 0; background: #fff; }
  .keeper{ display: block; width: 0.96rem; height: 0.96rem; margin: auto; background-image: url(/static/images/details_contact.png); background-size: 100%; }
  .add_agent{ text-align: center; line-height: 0.96rem; color: #fff; background: linear-gradient(to right, #51d8f0 , #429ee4); }

</style>
