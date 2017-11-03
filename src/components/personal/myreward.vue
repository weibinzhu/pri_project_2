<template lang="html">
  <div class="myreward">
    <header>
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 我的信息 -->
    <div class="reward_data">
      <h4>总金额(元)</h4>
      <h2>{{ balance }}</h2>
    </div>
    <span class="extract">提现</span>
    <!-- 我的团队 -->
    <div class="reward_content">
      <h2>我的团队({{ myTeams.length }})</h2>
      <ul class="myteam_list">
        <li v-for="(myTeam,index) in myTeams">
          <span class="iportrait"><img :src="myTeam.teamImg"></span>
          <router-link tag="span" class="itext" to="/myteam">
            <h3>{{ myTeam.teamName }}</h3>
            <h4>{{ myTeam.income }}</h4>
            <p>ID：{{ myTeam.teamID }}<b>会员数({{ myTeam.vipNum }})</b></p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'myreward',
  components: { Goback },
  data () {
    return {
      title: '我的奖励',
      balance: '1500.00',
      myTeams: [
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员一',
          income: '+2019.00',
          teamID: 'A0235522',
          vipNum: '10'
        },
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员二',
          income: '+500.00',
          teamID: 'A0235523',
          vipNum: '23'
        },
        {
          teamImg: '/static/images/jiangli_head.png',
          teamName: '会员三',
          income: '+1019.00',
          teamID: 'A0235524',
          vipNum: '20'
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
  .myreward{ width: 100%; min-height: 100vh; background-color: #fff; }
  .reward_data{ width: 92%; height: 3.3rem; padding: 0.4rem 4%; background-image: url(/static/images/acc_banner.png); background-size: 100%; }
  .reward_data h4{ font-weight: 400; font-size: 0.32rem; line-height: 0.5rem; float: left; color: #fff; margin-bottom: 0.6rem; }
  .reward_data h2{ font-size: 0.8rem; clear: both; color: #fff; }
  .extract{ width: 5.3rem; height: 0.88rem; margin: auto; box-shadow: 0px 0px 15px rgba(0,0,0,0.3); background-color: #fff; border-radius: 0.44rem; text-align: center; line-height: 0.88rem; font-size: 0.36rem; transform: translateY(-50%);}
  .reward_content{ width: 100%; }
  .reward_content h2{ font-size: 0.32rem; padding-left: 0.88rem; line-height: 0.88rem; background-image: url(/static/images/jiangli_icon.png); background-position: 0.2rem center; background-size: 0.5rem 0.5rem; background-repeat: no-repeat; border-bottom: solid 0.1rem #e9f1f7; }
  .myteam_list{ width: 100%; }
  .myteam_list li{ padding: 0.2rem; height: 0.98rem; border-bottom: solid 1px #eee; }
  .iportrait{ float: left; width: 0.98rem; height: 0.98rem; border-radius: 50%; overflow: hidden; margin-right: 0.2rem; }
  .itext{ float: left; width: 5.9rem; }
  .myteam_list h3{ font-size: 0.32rem; font-weight: 400; float: left; line-height: 0.44rem; }
  .myteam_list h4{ font-size: 0.28rem; font-weight: 400; float: right; line-height: 0.44rem; }
  .myteam_list p{ font-size: 0.28rem; color: rgba(0,0,0,0.5); clear: both; line-height: 0.54rem; }
  .myteam_list b{ font-size: 0.28rem; color: rgba(0,0,0,0.5); font-weight: 400; float: right; }

</style>
