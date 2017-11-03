<template lang="html">
  <div class="myteam">
    <header>
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 我的团队 -->
    <div class="team_content">
      <!-- 排序 -->
      <span class="array_btn" @click="array">排序<i class="iconfont icon-arrow-bottom" :class="[{rotate: arrayShow }]"></i></span>
      <transition name="aShow">
        <ul class="array_list" v-if="!arrayShow">
          <li @click="array();integral()">按积分排列</li>
          <li @click="array();vipnum()">按会员数排列</li>
        </ul>
      </transition>
      <!-- 会员列表 -->
      <h2>会员数({{ myTeams.length }})</h2>
      <ul class="myteam_list">
        <li v-for="(myTeam,index) in myTeams">
          <span class="iportrait"><img :src="myTeam.teamImg"></span>
          <span class="itext">
            <h3>{{ myTeam.teamName }}</h3>
            <h4>{{ myTeam.income }}</h4>
            <p>ID：{{ myTeam.teamID }}<b>会员数({{ myTeam.vipNum }})</b></p>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'myteam',
  components: { Goback },
  data () {
    return {
      arrayShow: true,
      title: 'VIP-name',
      myTeams: [
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员一',
          income: '+2019.00',
          teamID: 'A0235522',
          vipNum: '10',
          integral: '500'
        },
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员二',
          income: '+500.00',
          teamID: 'A0235523',
          vipNum: '23',
          integral: '200'
        },
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员三',
          income: '+1019.00',
          teamID: 'A0235524',
          vipNum: '20',
          integral: '300'
        },
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员四',
          income: '+5019.00',
          teamID: 'A0235524',
          vipNum: '45',
          integral: '568'
        }
      ]
    }
  },
  methods: {
    array () {
      this.arrayShow = !this.arrayShow
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
    // 按积分排列
    integral () {
      this.myTeams = this.myTeams.sort(this.compare("integral"))
    },
    // 按会员数排列
    vipnum () {
      this.myTeams = this.myTeams.sort(this.compare("vipNum"))
    }
  },
  watch: {

  },
  computed: {

  }
}
</script>

<style lang="css" scoped>
  .myteam{ width: 100%; min-height: 100vh; background-color: #fff; }
  .team_content{ width: 100%; position: relative; overflow: hidden; }
  .team_content h2{ font-size: 0.32rem; padding-left: 0.88rem; line-height: 0.88rem; background-image: url(/static/images/jiangli_icon.png); background-position: 0.2rem center; background-size: 0.5rem 0.5rem; background-repeat: no-repeat; border-bottom: solid 0.1rem #e9f1f7; }
  .myteam_list{ width: 100%; }
  .myteam_list li{ padding: 0.2rem; height: 0.98rem; border-bottom: solid 1px #eee; }
  .iportrait{ float: left; width: 0.98rem; height: 0.98rem; border-radius: 50%; overflow: hidden; margin-right: 0.2rem; }
  .itext{ float: left; width: 5.9rem; }
  .myteam_list h3{ font-size: 0.32rem; font-weight: 400; float: left; line-height: 0.44rem; }
  .myteam_list h4{ font-size: 0.28rem; font-weight: 400; float: right; line-height: 0.44rem; }
  .myteam_list p{ font-size: 0.28rem; color: rgba(0,0,0,0.5); clear: both; line-height: 0.54rem; }
  .myteam_list b{ font-size: 0.28rem; color: rgba(0,0,0,0.5); font-weight: 400; float: right; }
  /*排序*/
  .array_btn{ width: 1.2rem; height: 0.88rem; position: absolute; top: 0; right: 0; text-align: center; line-height: 0.88rem; font-size: 0.28rem; }
  .array_btn i{ float: right; margin-right: 0.1rem; padding-top: 0.05rem; transition: 0.4s all; }
  .array_btn .rotate{ transform: rotate(-90deg); padding-top: 0; }
  .array_list{ width: 2.5rem; position: absolute; top: 0.88rem; right: 0; box-shadow: 0 5px 15px rgba(0,0,0,0.3); background-color: #fff; transition: 0.4s all;}
  .array_list li{ line-height: 0.7rem; border: solid 1px #eee; line-height: 0.7rem; font-size: 0.28rem; text-align: center; }
  /*过渡动画*/
  .aShow-enter,.aShow-leave-active{
    	transform: translateY(20%);
      opacity: 0
  }


</style>
