<template lang="html">
  <section class="shopclass">
    <div class="top_search">
      <search></search>
    </div>
    <!-- 顶部间隔 -->
    <span class="spacing"></span>
    <!-- 分类导航 -->
    <nav class="class_nav flex">
      <li class="f1" v-for="(navItem, index) in navList">
        <router-link tag="span" :to="navItem.navLink"><img :src="navItem.navImg"></router-link>
      </li>
    </nav>
    <!-- 内容列表 -->
    <section class="list_content">
      <nav class="nav_sort flex">
        <li class="f1" v-for="(sortType, index) in sortLists" :class="{li_hover: classData.isHover === sortType}" @click="liSort(sortType, index)">{{ sortType }}</li>
      </nav>
      <transition-group name="slider" tag="ul" class="shop_list">
        <li v-for="(shop, index) in classData.shopList" :key="index">
          <!--<router-link tag="span" class="shop_photos" :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}"><img :src="shop.shopImg"></router-link>-->
          <!--<span class="shop_text">{{ shop.shopText }}</span>-->
          <!--<h4>￥{{ shop.shopPrice }}</h4>-->
          <!--<h5>销量 {{ shop.shopVolume }}</h5>-->
          <router-link tag="span" class="shop_photos" :to="{ name: 'shopDetails', params: { shop_id: shop.shopId }}">
            <img :src="shop.shopImg">
          </router-link>
          <div class="shop_text_wrapper">
            <div>{{ shop.shopText }}</div>
            <div class="shop_text_price">￥{{ shop.shopPrice }}</div>
          </div>
        </li>
      </transition-group>
    </section>
    <!-- 侧边栏 -->
    <transition name="translatex">
      <div class="sidebar" v-if="classData.boxShow">
        <div class="sidebar_content">
          <i class="close iconfont icon-guanbi" @click="classData.boxShow = !classData.boxShow"></i>
          <span class="sort_btn" @click="liSort('sortType', 3)">评论最多</span>
          <span class="sort_btn" @click="liSort('sortType', 4)">价格由高到低</span>
          <span class="sort_btn" @click="liSort('sortType', 5)">价格由低到高</span>
          <div class="range_box">
            <p>价格区间</p>
            <input type="text" v-model="classData.minimum" placeholder="最低价格">
            <span>——</span>
            <input type="text" v-model="classData.maximum" placeholder="最高价格">
            <transition name="slide">
              <h5 v-if="classData.prompt">{{ classData.promptText }}</h5>
            </transition>
            <h4 @click="liSort('sortType', 6)">查询</h4>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Ajax from '@/module/ajax'
import Search from '@/components/home/search'

export default {
  name: 'shopclass',
  data () {
    return {
      navList: [
//    参数（分类category_id）
//    精准医疗：category_id=330
//    变美趁早：category_id=329
//    冻龄抗衰：category_id=328
//    营养辅助：category_id=315
//    滋补贡品：category_id=323
//    有机农产：category_id=331
//    美妆个护：category_id=312
//    智能穿戴：category_id=311
        {
          // 精准医疗
          navImg: '/static/images/class_1.png',
          navLink: '/classa/330'
        },
        {
          // 变美趁早
          navImg: '/static/images/class_2.png',
          navLink: '/classa/329'
        },
        {
          // 冻龄抗衰
          navImg: '/static/images/class_3.png',
          navLink: '/classa/328'
        },
        {
          // 营养辅助
          navImg: '/static/images/class_4.png',
          navLink: '/classa/315'
        },
        {
          // 滋补贡品
          navImg: '/static/images/class_5.png',
          navLink: '/classa/323'
        },
        {
          // 有机农产
          navImg: '/static/images/class_6.png',
          navLink: '/classa/331'
        },
        {
          // 美妆个护
          navImg: '/static/images/class_7.png',
          navLink: '/classa/312'
        },
        {
          // 智能穿戴
          navImg: '/static/images/class_8.png',
          navLink: '/classa/311'
        }
      ],
      sortLists: ['销量优先','最新上架','综合排序']
    }
  },
  components: { Search },
  methods: {
    // 过渡动画
    Transition (text) {
      if (!this.classData.prompt) {
        this.classData.promptText = text
        this.classData.prompt = true
        // 提示文字的显示时间设置
        setTimeout(() => {
          this.classData.prompt = false
          this.classData.promptText = ''
        },1500)
      }
    },
    // 对比方法
    compare (prop) {
      return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 > val2) {  // 大到小
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    // 排序按钮
    liSort (sortType, index) {
      if (index === 0) {
        this.classData.isHover = sortType.toString()
        this.classData.shopList = this.classData.shopList.sort(this.compare('shopVolume'))
      }
      if (index === 1) {
        this.classData.isHover = sortType.toString()
      }
      if (index === 2) {
        this.classData.isHover = ''
        this.classData.boxShow = !this.classData.boxShow
      }
      if (index === 3) {
        this.classData.boxShow = !this.classData.boxShow
      }
      if (index === 4) {
        this.classData.shopList = this.classData.shopList.sort(this.compare('shopPrice'))
        this.classData.boxShow = !this.classData.boxShow
      }
      if (index === 5) {
        this.classData.shopList = this.classData.shopList.sort(this.compare('shopPrice')).reverse()
        this.classData.boxShow = !this.classData.boxShow
      }
      if (index === 6) {
        let min = Number(this.classData.minimum)
        let max = Number(this.classData.maximum)
        if (min && max) {
          if (min < max) {
            this.classData.shopList = this.classData.shopData.filter((item, index, array) => {
             return (item.shopPrice >= min && item.shopPrice <= max);
            });
            this.classData.minimum = ''
            this.classData.maximum = ''
            this.classData.boxShow = !this.classData.boxShow
          }else {
            this.Transition('最大价格必需大于最小价格')
          }
        }else {
          this.Transition('请输入大于零的价格')
        }
      }
    },
    // 初始化数据
    getData () {
      let ajaxData = 'category_id=330';
      let getSuccess = (data) => {
        let filtedData = []
        for (let item of data){
          if(item.state !=0){
            filtedData.push(item)
          }
        }
        this.shopData = filtedData
        this.classData.shopList = filtedData
      }
      let getError = (error) => {
        console.log(error)
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/getGoodslist', 'post', getSuccess, getError, ajaxData)
    }
  },
  computed: {
    classData () {
      return this.$store.state.classData
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="css" scoped>
  .shopclass{ width: 100%; min-height: 10rem; }
  .top_search{display: flex; align-items: center;  width: 100%; height: 0.88rem;background-image: url("/static/images/search_bg.png"); background-size: cover; /*background-color: rgba(0,0,0,0.3);*/ padding: 0.09rem 0; position: fixed; top: 0; left: 0; z-index: 2; }
  /*.top_search{ width: 100%; height: 0.7rem; background-color: #fff; padding: 0.09rem 0; margin-bottom: 0.2rem; position: fixed; top: 0; left: 0; border-bottom: 2px solid #eee; z-index: 10;}*/
  /*分类导航*/
  .class_nav{ width: 100%; background-color: #fff; padding-top: 0.2rem; }
  .class_nav li{ min-width: 1.8rem; margin-bottom: 0.2rem; -webkit-flex: 1 1 1.8rem; }
  .class_nav span{ width: 90%; height: auto; margin: auto; overflow: hidden; }
  /*筛选*/
  .nav_sort{ width: 100%; height: 0.9rem; background-color: #fff; border-bottom: solid 1px #eee; margin-bottom: 0.2rem; }
  .nav_sort li{ text-align: center; line-height: 0.9rem; position: relative; z-index: 0; }
  .nav_sort li::before{ position: absolute; content: ""; width: 1px; height: 0.6rem; background-color: #eee; top: 0.15rem; left: 0; }
  .nav_sort li:nth-child(1)::before{ width: 0; }
  .nav_sort li:nth-child(3){ background-image: url(/static/images/down.png); background-size: 0.25rem 0.25rem; background-repeat: no-repeat; background-position: 94% center;}
  .nav_sort .li_hover{ color: #8c8df6; font-size: 0.36rem; font-weight: 600; }
  /*滑动出来的筛选*/
  .sidebar{ width: 80%; height: 100vh; padding-left: 20%; background-color: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; z-index: 11; }
  .sidebar_content{ width: 100%; height: 100vh; background-color: #fff; }
  .close{ display: block; width: 0.88rem; height: 0.88rem; float: right; font-size: 0.64rem; text-align: center; line-height: 0.88rem; }
  .sort_btn{ clear: both; line-height: 0.8rem; text-align: center; border-top: solid 1px #f5f5f5; }
  .sort_btn:nth-child(3),.sort_btn:nth-child(4){border: none}
  .range_box{ border-top: solid 0.1rem #f5f5f5; border-bottom: solid 0.1rem #f5f5f5; padding-left: 0.2rem; padding-bottom: 0.2rem; overflow: hidden; }
  .range_box p{ line-height: 0.8rem; }
  .range_box input{ display: block; width: 2rem; height: 0.8rem; float: left; padding: 0 0.15rem; background-color: #f5f5f5; outline-color: #8c8df6; border: none; border-radius: 0.08rem; text-align: center; margin-bottom: 0.4rem; }
  .range_box span{ float: left; width: 1rem; height: 0.8rem; text-align: center; line-height: 0.8rem; color: #ccc; }
  .range_box h4{ width: 2.3rem; height: 0.8rem; line-height: 0.8rem; display: block; margin: auto;border: solid 1px #000; border-radius: 0.08rem; color: #000; font-size: 0.32rem; font-weight: 400; text-align: center; clear: both; }
  .range_box h5{ font-size: 0.36rem; line-height: 0.8rem; text-align: center; color: #8c8df6; clear: both; -webkit-transition: 0.3s all; transition: 0.3s all; }
  /*列表内容*/
  .list_content{ width: 100%; padding-top: 0.2rem; background-color: #fff}
  .shop_list{ width: 100%; overflow: hidden; padding-bottom: 1rem; background-color: #fff;}
  .shop_list li{position: relative; width: 6.9rem; overflow: hidden; background-color: #fff; margin-bottom: 0.3rem; margin-left: auto; margin-right: auto; padding-bottom: 0.1rem; box-shadow: 0px 10px 38px 3px rgba(231,231,231,1);border-radius: 0.08rem}
  .shop_photos{ width: 100%; height: 3.6rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 2.7rem 1.93rem; background-position: center center; background-repeat: no-repeat; }
  .shop_text_wrapper{box-sizing:border-box; width: 100%; height: 1.6rem;display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 0.3rem; font-size: 0.32rem; font-weight: normal;}
  .shop_text_wrapper .shop_text_price{color:#ff4444}
  .shop_text_wrapper div{white-space:nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 4.3rem}
  /*.shop_list{ width: 100%; overflow: hidden; padding-bottom: 1rem; }*/
  /*.shop_list li{ float: left; width: 49%; overflow: hidden; background-color: #fff; margin-bottom: 2%; padding-bottom: 0.1rem; }*/
  /*.shop_list li:nth-child(odd){ margin-right: 2%; }*/
  /*.shop_photos{ width: 100%; height: 3.675rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 2.7rem 1.93rem; background-position: center center; background-repeat: no-repeat; }*/
  /*.shop_text{ width: 92%; height: 0.88rem; padding: 0% 4%; line-height: 0.44rem; font-size: 0.28rem;margin-top: 0.4rem;margin-bottom: 0.2rem;overflow: hidden;text-overflow: ellipsis; }*/
  /*.shop_list h4{ float: left; line-height: 0.5rem; font-size: 0.28rem; color: #7c7c7c; margin-left: 0.1rem; margin-bottom: 0.8rem;font-weight: 400;}*/
  /*.shop_list h5{ float: right; line-height: 0.5rem; font-size: 0.28rem; color: #7c7c7c; margin-right: 0.1rem; font-weight: 400; }*/
  /*.slider*/
  .slider-move {
    transition: 1s all;
  }
  .translatex-enter,.translatex-leave-to{
    transform: translateX(100%);
  }
  .slide-enter{
    transform: translateX(-1rem); opacity: 0
  }
  .slide-leave-active{
    transform: translateX(1rem); opacity: 0
  }
</style>
