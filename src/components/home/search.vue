<template lang="html">
  <div class="search">
    <input type="search" v-model="searchText" class="searchInput" @focus="boxShow = true" @blur="boxShow = false" @keyup.enter="getData" placeholder="搜你想看的">
    <!-- 候选内容 -->
    <transition name="searchSlide">
      <div class="search_box" v-if="boxShow">
        <h2>热搜</h2>
        <transition name="Pslide">
          <h3 v-if="hShow">{{ promptText }}</h3>
        </transition>
        <ul class="recommend" v-if="shopLists.length === 0">
          <li v-for="(rItem,index) in list">{{ rItem }}</li>
        </ul>
        <ul class="shop_list">
          <li v-for="(shop,index) in shopLists" >
            <router-link :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}">
              <span class="shop_photos"><img :src="shop.shopImg"/></span>
              <span class="shop_text">{{ shop.shopText }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Ajax from '@/module/ajax'

export default {
  name: 'search',
  data () {
    return {
      list: ['请输入相关内容','去眼袋','瘦眼针','牙齿矫正','去眼袋'],
      shopLists: [],
      searchText: '',
      boxShow: false,
      hShow: false,
      promptText: ''
    }
  },
  methods: {
    // 过渡动画方法
    Transition (text) {
      if (!this.hShow) {
        this.hShow = true
        this.promptText = text
        // 提示文字的显示时间设置
        setTimeout(() => {
          this.hShow = false
          this.promptText = ''
        },500)
      }
    },
    getData () {
      let that = this
      while(that.searchText.lastIndexOf(' ')>=0){
        that.searchText = that.searchText.replace(' ','')
      }
      if (that.searchText.length == 0) {
        that.Transition('输入不能为空')
      }else {
        that.Transition('搜索中...')
        let ajaxData = 'sear_name=' + that.searchText
        var getSuccess = (data) => {
          console.log(data)
          if (data === null) {
            that.hShow = true
            that.promptText = '搜索的内容不存在'
            setTimeout(() => {
              that.hShow = false
              that.promptText = ''
            },1500)
            that.shopLists = []
            that.searchText = ''
          }else {
            that.shopLists = data
          }
        }
        var getError = (error) => {
          console.log(error)
        }
        Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/goodsSearchList', 'POST', getSuccess, getError, ajaxData)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .search {flex:1;}
  ::-webkit-input-placeholder { /* WebKit browsers */  color: #cccccc; text-align: center; }
  :-ms-input-placeholder {  /* Internet Explorer 10+ */ color: #cccccc; text-align: center; }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */  color: #cccccc; text-align: center; }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */  color: #cccccc; text-align: center; }
  .searchInput{ margin:0 auto;box-sizing: border-box; display: block; width: 96%; height: 0.7rem; padding: 0 12%; border:none; border-radius: 0.35rem; outline: none; background-color: rgba(0,0,0,0.2); background-image: url(../../../static/images/search.png); background-size: 0.36rem 0.36rem; background-repeat: no-repeat; background-position: 32% center;}
  .searchInput:focus{ border-color: #8c8df6; background-size: 0 0; }
  .search_box{ width: 76%; min-height: 4.7rem; padding: 2%; background-color: #fff; border-radius: 0.08rem; position: absolute; top: 1rem; left: 50%; margin-left: -40%; box-shadow: 0px 0px 15px rgba(0,0,0,0.3); z-index: 8; }
  .search_box h2{ font-size: 0.32rem; line-height: 0.5rem; font-weight: 400; margin-bottom: 0.2rem; }
  .search_box h3{ font-size: 0.36rem; text-align: center; line-height: 0.5rem; color: #8c8df6; -webkit-transition: 0.3s all; transition: 0.3s all; }
  .recommend{ width: 100%; height: 4rem; overflow: scroll; }
  .recommend li{ height: 0.7rem; padding-left: 0.2rem; line-height: 0.7rem; background-color: #fff; border-radius: 0.08rem; margin-bottom: 0.1rem; font-size: 0.28rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .shop_list{ width: 100%; max-height: 9rem; overflow: scroll; }
  .shop_list li{ margin-bottom: 0.2rem; overflow: hidden;  }
  .shop_list a{ overflow: hidden; }
  .shop_photos{ width: 20%; height: 1.14rem; overflow: hidden; float: left; }
  .shop_text{ width: 76%; height: 1.14rem; overflow: hidden; padding: 0 2%; font-size: 0.28rem; float: left; }
  /*动画*/
  .searchSlide-enter,.searchSlide-leave-active{
    	transform: translateY(2rem);
      opacity: 0
  }
  .Pslide-enter{
    transform: translateX(-1rem); opacity: 0
  }
  .Pslide-leave-active{
    transform: translateX(1rem); opacity: 0
  }
</style>
