<template lang="html">
  <div class="mypost">
    <header>
      <goback></goback>
      <h2>我的消息</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 分类导航 -->
    <nav class="flex">
      <li class="f1" :class="{li_hover: liHover === menu }" v-for="(menu, index) in menuList" @click="navSwitch(menu, index)">{{ menu }}</li>
    </nav>
    <!-- 我的主贴 -->
    <transition name="slider1">
      <ul class="mypost_list" v-if="isShow">
        <li v-for="(post, index) in myposts">
          <h2>{{ post.content }}</h2>
          <span class="post_box">
            <span class="my_portrait"><img :src="post.user_headimg"></span>
            <p>{{ post.user_name }}</p>
            <p><b>{{ post.create_time }}</b></p>
            <!-- <i>删帖</i> -->
          </span>
        </li>
      </ul>
    </transition>
    <!-- 我的回帖 -->
    <transition name="slider2">
      <ul class="myreply" v-if="!isShow">
        <li v-for="(myreply, index) in myreplys">
          <span class="user_portrait"><img :src="myreply.user_headimg"></span>
          <span class="user_box">
            <h3>{{ myreply.user_name }}</h3>
            <h4>{{ myreply.create_time }}</h4>
          </span>
          <p>{{ myreply.content }}</p>
          <span class="post_text">
            <p>主贴：{{ myreply.contentTitle }}</p>
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'mypost',
  data () {
    return {
      menuList: ['我的主贴','我的回贴'],
      liHover: '我的主贴',
      isShow: true,
      myposts: [
        {
          post_id: 22,
          content: '记录了作者在欧洲各国的旅行见闻和日常生活，向我们描述了活生生的欧式欧洲人的日常生活',
          user_headimg: '/static/images/jiangli_head.png',
          user_name: 'name',
          create_time: '刚刚'
        },
        {
          post_id: 22,
          content: '这里是帖子内容',
          user_headimg: '/static/images/jiangli_head.png',
          user_name: 'ractelis',
          create_time: '10分钟前'
        }
      ],
      myreplys: [
        {
          post_id: 22,
          user_headimg: '/static/images/jiangli_head.png',
          user_name: 'name',
          create_time: '刚刚',
          content: '呵呵。',
          contentTitle: '万达管理系统'
        },
        {
          post_id: 22,
          user_headimg: '/static/images/jiangli_head.png',
          user_name: 'ractelis',
          create_time: '一天前',
          content: '记录了作者在欧洲各国的旅行见闻和日常生活，向我们描述了活生生的欧式欧洲人的日常生活',
          contentTitle: '记录了作者在欧洲各国者在欧洲各国的旅行见闻和日常生'
        },
      ]
    }
  },
  components: { Goback },
  methods: {
    navSwitch (menu, index) {
      this.liHover = menu
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="css" scoped>
  .mypost{ width: 100%; }
  nav{ width: 100%; height: 1rem; background-color: #fff; margin-bottom: 0.2rem; }
  nav li{ height: 1rem; line-height: 1rem; text-align: center; position: relative; }
  nav .li_hover{ color: #8c8df6; }
  nav .li_hover::before{ position: absolute; content: ""; width: 100%; height: 2px; background-color: #8c8df6; bottom: 0; left: 0; }
  .mypost_list{ width: 100%; }
  .mypost_list li{ width: 6.7rem; padding: 0 0.2rem; background-color: #fff; box-shadow: 0 3px 15px rgba(0,0,0,0.3); margin: 0 auto 0.2rem;}
  .mypost_list h2{ height: 0.9rem; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 0.9rem; font-size: 0.32rem; font-weight: 400; border-bottom: 1px solid #eee; }
  .post_box{ width: 100%; padding: 0.1rem 0; overflow: hidden; }
  .my_portrait{ width: 0.7rem; height: 0.7rem; overflow: hidden; float: left; margin-right: 0.2rem; }
  .post_box p{ line-height: 0.7rem; }
  .post_box b{ font-size: 0.28rem; color: #ccc; font-weight: 400; }
  .post_box i{ display: block; width: 1.2rem; height: 0.7rem; font-style: normal; float: right; text-align: right; background-image: url(/static/images/delete.png); background-repeat: no-repeat; background-size: 0.4rem 0.4rem; background-position: left center;}
  .myreply{ width: 100%; }
  .myreply li{ width: 6.7rem; padding: 0.2rem; background-color: #fff; box-shadow: 0 3px 15px rgba(0,0,0,0.3); margin: 0 auto 0.2rem; overflow: hidden; }
  .user_portrait{ width: 0.7rem; height: 0.7rem; overflow: hidden; float: left; margin-right: 0.2rem; margin-bottom: 0.2rem;}
  .user_box{ float: left; height: 0.7rem; }
  .user_box h3{ font-size: 0.32rem; line-height: 0.4rem; font-weight: 400; }
  .user_box h4{ font-size: 0.28rem; line-height: 0.3rem; font-weight: 400; color: #ccc; }
  .myreply p{ clear: both; line-height: 0.46rem; margin-bottom: 0.2rem; }
  .post_text{ padding: 0.17rem 0.2rem 0.01rem; background-color: #f5f5f5; border-radius: 0.08rem; overflow: hidden; }
  .post_text p{ text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  /*滑动动画*/
  .slider1-enter-active, .slider1-leave-active, .slider2-enter-active, .slider2-leave-active{
    transition: 0.4s;
  }
  .slider1-enter, .slider1-leave-to{
    position: fixed;
    top: 2.1rem;
    transform: translateX(-100%);
  }
  .slider2-enter, .slider2-leave-to{
    position: fixed;
    top: 2.1rem;
    transform: translateX(100%);
  }
</style>
