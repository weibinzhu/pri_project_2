<template lang="html">
  <transition name="cityShow">
    <div class="citySelect">
      <span class="iconfont icon-guanbi close" @click="goback"></span>
      <h3>请选择您的当前城市</h3>
      <!-- 省份 -->
      <ul class="provinces">
        <li v-for="(pItem,index) in address.pItems" @click="pSelect(index,pItem)" :class="{listHover: address.pShow == pItem.text}">{{ pItem.text }}</li>
      </ul>
      <!-- 城市 -->
      <ul class="citys">
        <li v-for="(cItem,index) in address.cItems" @click="cSelect(index,cItem)" :class="{listHover: address.cShow == cItem.city}">{{ cItem.city }}</li>
      </ul>
      <!-- 提交 -->
      <span class="send_btn" @click="goback">确定</span>
    </div>
  </transition>
</template>

<script>
import Ajax from '@/module/ajax'

export default {
  name: 'citySelect',
  methods: {
     goback () {
        this.$router.go(-1)
     },
     pSelect (index,pItem) {
       this.address.cItems = this.address.pItems[index].children
       this.address.pShow = pItem.text
     },
     cSelect (index,cItem) {
       this.address.cShow = cItem.city
     },
     getData () {
       let getSuccess = (data) => {
         this.address.pItems = data
       }
       let getError = (error) => {
         console.log(error)
       }
       Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/Health/province', 'get', getSuccess, getError)
     }
  },
  mounted () {
    this.getData()
  },
  computed: {
    address () {
      return this.$store.state.address
    }
  }
  // watch: {
  //   pShow (val, oldVal) {
  //     console.log('new: %s, old: %s', val, oldVal)
  //   }
  // }
}
</script>

<style lang="css" scoped>
  .citySelect{ width: 86%; height: 6.7rem; padding: 0.15rem 2%; background: #fff; box-shadow: 0px 5px 15px rgba(0,0,0,0.3); position: fixed; top: 50%; left: 50%; margin: -3.5rem -45%; z-index: 10; }
  .close{ width: 0.88rem; height: 0.88rem; text-align: center; line-height: 0.88rem; font-size: 0.64rem; float: right; }
  .citySelect h3{ font-weight: 400; font-size: 0.32rem; line-height: 0.88rem; border-bottom: 1px solid #ccc; }
  .citySelect ul{ float: left; width: 50%; height: 4.82rem; overflow: scroll; margin-bottom: 0.25rem; }
  .citySelect li{ line-height: 0.7rem; border-bottom: 1px solid #ccc; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
  .provinces li{ background-image: url(/static/images/more.png); background-size: 0.56rem 0.28rem; background-repeat: no-repeat; background-position: right center; }
  .citySelect .citys{ width: 48%; padding-left: 2%; }
  .citySelect .listHover{ color: #fff; background-color: #8c8df6; background-size: 0 0; padding-left: 0.2rem; }
  .send_btn{ width: 1.8rem; height: 0.7rem; margin: auto; border-radius: 0.08rem; background-color: #8c8df6; color: #fff; text-align: center; line-height: 0.7rem; clear: both; }
  .cityShow-enter{
    	transform: translateY(-2rem);
      opacity: 0
  }
   .cityShow-leave-active{
     transform: translateY(2rem);
     opacity: 0
   }
</style>
