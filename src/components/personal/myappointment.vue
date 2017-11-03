<template lang="html">
  <div class="appointment">
    <header>
      <goback></goback>
      <h2>我的预约</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 导航 -->
    <nav class="flex menu">
      <li v-for="(menu, index) in menuList" @click="Mindex(menu,index)" :class="[{li_hover: appointState.isActive === menu},'f1']">{{ menu }}</li>
    </nav>
    <!-- 全部 -->
    <div class="app_list">
      <ul class="commodity">
        <li v-for="(hospital, index) in hospitalList" v-if="hospital.type === appointState.liIndex ? true:appointState.liShow">
          <span class="title">
            <h2>{{ hospital.hospitalName }}</h2>
            <h3>{{ hospital.state }}</h3>
          </span>
          <span class="ashop_box">
            <span class="ashop_photos"><img :src="hospital.hospitalImg" alt=""></span>
            <span class="ashop_text">{{ hospital.hospitalText }}</span>
            <p>共{{ hospital.shopNum }}件商品 合计：<b>￥{{ hospital.hospitalPrice }}</b></p>
          </span>
          <span class="options">
            <a class="ap_hover" v-if="hospital.type === 1">完成服务</a>
            <a class="ap_hover" v-if="hospital.type === 2">预约时间</a>
            <router-link class="ap_hover"  v-if="hospital.type === 3" :to="{ name: 'evaluId', params: { order_id: hospital.order_id } }">评价</router-link>
            <a v-if="hospital.type <= 2">联系客服</a>
            <a v-if="hospital.type === 3">删除订单</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'appointment',
  data() {
    return {
      menuList: ['全部', '已预约', '未预约', '评价'],
      hospitalList: [
        {
          order_id: 1,
          hospitalName: '广州美莱医院',
          type: 1,         // 已预约
          state: '预约成功',  // 状态
          hospitalImg: '/static/images/plat1.png',
          hospitalText: '魅力隆鼻整形服务 【广州美莱医院】',
          shopNum: '1',
          hospitalPrice: '39.00'
        },
        {
          order_id: 2,
          hospitalName: '广州健美医疗机构',
          type: 1,          // 已预约
          state: '预约成功',
          hospitalImg: '/static/images/plat1.png',
          hospitalText: '养身保健体操服务 【广州健美医疗机构】',
          shopNum: '1',
          hospitalPrice: '39.00'
        },
        {
          order_id: 3,
          hospitalName: '广州美莱医院',
          type: 2,          // 未预约
          state: '等待预约',
          hospitalImg: '/static/images/plat1.png',
          hospitalText: '广州美莱通过严格选才标准，融汇业界医疗美容医生提供先进的医美技术，构建起一个学术、医术与艺术相结合的塑美平台',
          shopNum: '1',
          hospitalPrice: '39.00'
        },
        {
          order_id: 4,
          hospitalName: '广州山卡拉整形机构',
          type: 3,          // 评价
          state: '订单已结束',
          hospitalImg: '/static/images/plat1.png',
          hospitalText: '成年人脂肪细胞的数量已经恒定，人们之所以会胖会瘦，是因为细胞体积增大和缩小，通常的非手术减肥方法不能减少脂肪细胞的数量',
          shopNum: '1',
          hospitalPrice: '39.00'
        }
      ]
    }
  },
  components: {
    Goback
  },
  methods: {
    Mindex(menu,index) {
      this.appointState.isActive = menu.toString()
      if (index === 0) {
        this.appointState.liShow = true
      }else {
        this.appointState.liShow = false
      }
      this.appointState.liIndex = index
    }
  },
  computed: {
    appointState () {
      return this.$store.state.appointState
    }
  }
}
</script>

<style lang="css" scoped>
  /*导航*/
  .menu { width: 100%;height: 0.88rem; margin-bottom: 0.2rem; background: #fff }
  .menu li { text-align: center; line-height: 0.88rem; transition: 0s all }
  .li_hover { border-bottom: solid 0.04rem #8c8df6; color: #8c8df6; }
   /*商品列表*/
  .commodity { width: 100%; }
  .commodity li { background: #fff; padding-bottom: 0.2rem; margin-bottom: 0.2rem; }
  .title { height: 0.88rem; padding: 0 0.2rem; line-height: 0.88rem; }
  .title h2 { float: left; font-size: 0.32rem; font-weight: 400; }
  .title h3 { float: right; font-size: 0.28rem; color: #8c8df6; line-height: 0.88rem; font-weight: 400; }
  .ashop_box { height: 1.67rem; padding: 0.2rem; background: #fbfdfe; }
  .ashop_photos { width: 1.67rem; width: 1.67rem; float: left; margin-right: 0.2rem; }
  .ashop_text { height: 1.1rem; font-size: 0.28rem; overflow: hidden; }
  .ashop_box b { color: #f61a79; font-size: 0.32rem; }
  .ashop_box p { font-size: 0.32rem; line-height: 0.7rem; }
  .options { height: 0.64rem; padding: 0.2rem 0.2rem 0; background: #fff }
  .options a { display: block; height: 0.62rem; padding: 0 0.2rem; line-height: 0.62rem; font-size: 0.28rem; float: right; border: solid 1px #ccc; border-radius: 0.31rem; margin-left: 0.2rem; color: #525252; }
  .options .ap_hover { color: #8c8df6; border: solid 1px #8c8df6; }
</style>
