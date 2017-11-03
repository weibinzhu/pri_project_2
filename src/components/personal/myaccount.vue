<template lang="html">
  <div class="myaccount">
    <header>
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 账户信息 -->
    <div class="account_data">
      <h4>总金额(康元)</h4>
      <h5>保障</h5>
      <h2>{{ balance }}</h2>
    </div>
    <span class="recharge">充值</span>
    <div class="bill_content">
      <h2>账单明细</h2>
      <ul class="bill_list" v-for="(myAccount,index) in myAccounts">
        <span class="bill_title">
          <h3>{{ myAccount.month }}月</h3>
          <h6>查看月账单</h6>
        </span>
        <li v-for="(liItem,index) in myAccount.chilrden">
          <h4>{{ liItem.income }}</h4>
          <h5>{{ liItem.date }}</h5>
          <p>{{ liItem.accountText }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'myaccount',
  data () {
    return {
      title: '我的账户',
      balance: '2,5000.00',
      myAccounts: [
        {
          month: '六',
          chilrden: [
            {
              income: '-2000.98',
              date: '06月20日',
              accountText: '维生素B族片 100片 买一赠一共2瓶维生素B族片 100片 买一赠一共2瓶'
            },
            {
              income: '+1000.00',
              date: '06月10日',
              accountText: '支付宝充值'
            }
          ]
        },
        {
          month: '五',
          chilrden: [
            {
              income: '-2000.98',
              date: '05月20日',
              accountText: '维生素B族片 100片 买一赠一共2瓶维生素B族片 100片 买一赠一共2瓶'
            }
          ]
        }
      ]
    }
  },
  components: { Goback }
}
</script>

<style lang="css" scoped>
  .myaccount{ width: 100%; min-height: 100vh; background-color: #fff; }
  .account_data{ width: 92%; height: 3.3rem; padding: 0.4rem 4%; background-image: url(/static/images/acc_banner.png); background-size: 100%; }
  .account_data h4{ font-weight: 400; font-size: 0.32rem; line-height: 0.5rem; float: left; color: #fff; margin-bottom: 0.6rem; }
  .account_data h5{ font-weight: 400; font-size: 0.32rem; line-height: 0.5rem; float: right; color: #fff; }
  .account_data h2{ font-size: 0.8rem; clear: both; color: #fff; }
  .recharge{ width: 5.3rem; height: 0.88rem; margin: auto; box-shadow: 0px 0px 15px rgba(0,0,0,0.3); background-color: #fff; border-radius: 0.44rem; text-align: center; line-height: 0.88rem; font-size: 0.36rem; transform: translateY(-50%);}
  .bill_content{ width: 100%; }
  .bill_content ul:nth-child(odd) h3{ border-color: #51d8f0; }
  .bill_content h2{ font-size: 0.32rem; padding-left: 0.88rem; line-height: 0.88rem; background-image: url(/static/images/zhanghu_icon.png); background-position: 0.2rem center; background-size: 0.5rem 0.5rem; background-repeat: no-repeat; }
  .bill_title{ width: 100%; height: 0.7rem; background-color: #e9f0f7; line-height: 0.7rem; background-image: url(/static/images/more.png); background-size: 0.56rem 0.28rem; background-position: right center; background-repeat: no-repeat; }
  .bill_title h3{ float: left; padding-left: 0.2rem; font-size: 0.28rem; font-weight: 400; border-left: solid 0.1rem #8c8df6; }
  .bill_title h6{ float: right; padding-right: 0.7rem; font-size: 0.28rem; font-weight: 400; color: #9da0a3; }
  .bill_list li{ padding: 0.2rem; height: 0.98rem; border-bottom: solid 1px #eee; }
  .bill_list h4{ font-size: 0.32rem; font-weight: 400; float: left; line-height: 0.44rem; }
  .bill_list h5{ font-size: 0.28rem; font-weight: 400; float: right; line-height: 0.5rem; color: rgba(0,0,0,0.5); }
  .bill_list p{ font-size: 0.28rem; line-height: 0.44rem; color: rgba(0,0,0,0.5); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; clear: both; }


</style>
