<template lang="html">
  <div class="archives">
    <header>
      <goback></goback>
      <h2>健康档案</h2>
      <span>保存</span>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <div class="user_box">
      <span class="portrait"><img :src="userImg"></span>
      <p>{{ uerName }}</p>
    </div>
    <div class="user_from">
      <span class="from_list">
        <h3>性别</h3>
        <input type="text" v-model="gender">
      </span>
      <span class="from_list">
        <h3>年龄</h3>
        <input type="text" v-model="age">
      </span>
      <span class="from_list">
        <h3>身高</h3>
        <input type="text" v-model="height">
      </span>
      <span class="from_list">
        <h3>体重</h3>
        <input type="text" v-model="weight">
      </span>
      <span class="from_list">
        <h3>血压</h3>
        <input type="text" v-model="bloodPressure">
      </span>
      <span class="from_list">
        <h3>婚姻</h3>
        <input type="text" v-model="marriage">
      </span>
      <span class="from_list">
        <h3>烟龄</h3>
        <input type="text" v-model="smoker">
      </span>
      <span class="from_list">
        <h3>饮酒</h3>
        <input type="text" v-model="wine">
      </span>
    </div>
    <!-- 病历 -->
    <div class="medical_record">
      <h2>健康历史</h2>
      <textarea rows="8" cols="80" class="text_box" v-model="medicalText"></textarea>
      <span class="submit_btn">上传病历</span>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'archives',
  data () {
    return {
      userImg: '/static/images/jiangli_head.png',
      uerName: 'Lisa',
      gender: '',
      age: '',
      height: '',
      weight: '',
      bloodPressure: '',
      marriage: '',
      smoker: '',
      wine: '',
      medicalText: ''
    }
  },
  components: { Goback },
  watch: {
    // medicalText (val, oldVal) {
    //   console.log('new: %s, old: %s', val, oldVal)
    // }
  }
}
</script>

<style lang="css" scoped>
  .archives{ width: 100%; }
  header span{ position: absolute; width: 0.88rem; height: 0.88rem; text-align: center; line-height: 0.88rem; top: 0; right: 0; color: #fff; }
  .user_box{ width: 100%; height: 2.2rem; background-image: url(/static/images/arc.png); background-size: 100%; background-repeat: no-repeat; padding-top: 0.2rem; }
  .portrait{ width: 1.4rem; height: 1.4rem; margin: 0 auto 0.1rem; border-radius: 50%; overflow: hidden; }
  .user_box p{ line-height: 0.5rem; color: #fff; text-align: center; }
  .user_from{ background-color: #fff; padding: 0 0.2rem; margin-bottom: 0.2rem; }
  .from_list{ width: 100%; height: 0.88rem; }
  .from_list h3{ font-size: 0.32rem; text-align: center; line-height: 0.88rem; float: left; width: 20%; }
  .from_list input{ display: block; width: 80%; height: 0.8rem; line-height: 0.88rem; border: none; border-bottom: solid 1px #ccc; outline: none; font-size: 0.32rem; }
  .from_list input:focus{ border-color: #8c8df6; }
  .medical_record{ padding: 0 0.2rem; background-color: #fff; }
  .medical_record h2{ line-height: 0.88rem; font-size: 0.32rem; }
  .text_box{ width: 100%; height: 2rem; background-color: #f5f5f5; resize: none; border: none; margin-bottom: 0.2rem; outline-color: #8c8df6; font-size: 0.32rem; }
  .submit_btn{ width: 100%; height: 0.88rem; background-image: url(/static/images/arc.png); background-size: 100%; background-repeat: no-repeat; text-align: center; line-height: 0.88rem; color: #fff; margin-bottom: 0.2rem; }
</style>
