<template lang="html">
  <div class="community">
    <header>
      <goback></goback>
      <span class="title_text flex">
        <a class="f1" :class="{a_hover : navHover}" @click="Comm">社区</a>
        <a class="f1" :class="{a_hover : !navHover}" @click="Public">公益</a>
      </span>
      <router-link to="/rel" class="fatie"></router-link>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing"></span>
    <!-- 社区 -->
    <transition name="slider1">
      <ul v-if="content">
        <li v-for="(community, index) in communitys">
          <div class="user_box">
            <span class="portrait"><img :src="community.portrait"></span>
            <h3>{{ community.user_name }}</h3>
            <h4>{{ community.time }}</h4>
            <span class="icon_box">
              <i class="collection_i"></i>
              <i class="comment_i">{{ community.comment_num }}</i>
              <i class="zan_i">{{ community.zan_num }}</i>
            </span>
          </div>
          <div class="text_box">
            <p>{{ community.content }}</p>
          </div>
          <div class="photos_box flex">
            <span class="f1" v-for="(photo, index) in community.picture"><img :src="photo"></span>
          </div>
        </li>
      </ul>
    </transition>
    <!-- 公益 -->
    <transition name="slider2">
      <ul v-if="!content">
        <li v-for="(publicList, index_main) in publicLists">
          <div class="user_box">
            <span class="portrait"><img :src="publicList.portrait"></span>
            <h3>{{ publicList.user_name }}</h3>
            <h4>{{ publicList.time }}</h4>
            <span class="icon_box">
              <i class="dasan_i"></i>
              <i class="collection_i"></i>
              <i class="comment_i">{{ publicList.comment_num }}</i>
              <i class="zan_i">{{ publicList.zan_num }}</i>
            </span>
          </div>
          <div class="text_box">
            <p>{{ publicList.content }}</p>
          </div>
          <div class="photos_box flex">
            <span class="f1" v-for="(photo, index) in publicList.picture"><router-link :to="{ path: '/activity', query: { index: index_main }}" ><img :src="photo"></router-link></span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Ajax from '@/module/ajax'

export default {
  name: 'community',
  data () {
    return {
      navHover: true,
      content: true,
      communitys: [
        {
          portrait: '/static/images/jiangli_icon.png',
          user_name: '加载中...',
          time: '加载中...',
          zan_num: 0,
          comment_num: 0,
          content: '加载中...',
          picture: ['']
        }
      ],
      publicLists: [
        {
          portrait: '/static/images/jiangli_icon.png',
          user_name: 'aikang公益',
          time: '刚刚',
          zan_num: '20',
          comment_num: '10',
          content: '公益活动：健康万里行，爱心传递，为实现一个没有乳腺癌的世界而努力。',
          picture: ['/static/images/activity_1.jpg','/static/images/activity_2.jpg','/static/images/activity_3.jpg','/static/images/activity_4.jpg','/static/images/activity_5.jpg']
        },
        {
          portrait: '/static/images/jiangli_icon.png',
          user_name: '健康中国关爱行',
          time: '刚刚',
          zan_num: '20',
          comment_num: '10',
          content: '健康中国关爱行公益项目是由中国初级卫生保健基金会发起的一项公益慈善活动。',
          picture: ['/static/images/guanai1.jpg','/static/images/guanai2.jpg','/static/images/guanai3.jpg']
        },
        {
          portrait: '/static/images/jiangli_icon.png',
          user_name: '医院慈善公益行',
          time: '刚刚',
          zan_num: '20',
          comment_num: '10',
          content: '情系苍生，尊重生命。',
          picture: ['/static/images/yizhen1.jpg','/static/images/yizhen2.jpg','/static/images/yizhen3.jpg']
        },
        {
          portrait: '/static/images/jiangli_icon.png',
          user_name: '医疗公益 走进西藏',
          time: '刚刚',
          zan_num: '20',
          comment_num: '10',
          content: '为期9天的“2017同心·共铸中国心”西藏行大型医疗公益活动在西藏自治区启动。',
          picture: ['/static/images/xizang1.jpg','/static/images/xizang2.jpg','/static/images/xizang3.jpg']
        }
      ]
    }
  },
  components: { Goback },
  methods: {
    Comm () {
      this.navHover = true,
      this.content = true
    },
    Public () {
      this.navHover = false,
      this.content = false
    },
    contentData () {
      let getSuccess = (data) => {
        console.log(data)
        this.communitys = data
      }
      let getError = (error) => {
        console.log(error)
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/wap/Welfare/postsList', 'POST', getSuccess, getError)
    }
  },
  mounted () {
    this.contentData()
  }
}
</script>

<style lang="css" scoped>
  .fatie{ width: 0.88rem; height: 0.88rem; position: absolute; top: 0; right: 0; background-image: url(/static/images/fatie.png); background-size: 0.4rem 0.4rem; background-repeat: no-repeat; background-position: center center;}
  .community{ width: 100%; }
  .community ul{ width: 100%; }
  .community li{ padding: 0.2rem; background-color: #fff; margin-bottom: 0.2rem; }
  .title_text{ width: 2.6rem; height: 0.88rem; margin: auto; }
  .title_text a{ font-size: 0.32rem; color: #333; text-align: center; line-height: 0.88rem; }
  .title_text .a_hover{ color: #8c8df6; border-bottom: 2px solid #8c8df6; }
  .user_box{ width: 100%; height: 0.7rem; overflow: hidden; border-bottom: solid 1px #eee; padding-bottom: 0.1rem; position: relative; }
  .portrait{ float: left; width: 0.7rem; height: 0.7rem; overflow: hidden; border-radius: 50%; margin-right: 0.2rem; }
  .user_box h3{ font-size: 0.32rem; width: 5rem; float: left; line-height: 0.4rem; font-weight: 400; }
  .user_box h4{ font-size: 0.28rem; width: 5rem; float: left; line-height: 0.3rem; color: #ccc; font-weight: 400; }
  .icon_box{ position: absolute; top: 0.17rem; right: 0; width: 4rem; height: 0.35rem; z-index: 5; }
  .icon_box i{ display: inline; min-width: 0.35rem; height: 0.35rem; font-size: 0.24rem; line-height: 0.35rem; font-style:normal; color: #6d6d6d; margin-left: 0.25rem; float: right; background-repeat: no-repeat; background-size: 0.35rem 0.7rem; background-position: right top; }
  .dasan_i{ background-image: url(/static/images/money.png); }
  .collection_i{ background-image: url(/static/images/collection.png); }
  .comment_i{ background-image: url(/static/images/comment.png); padding-right: 0.4rem; }
  .zan_i{ background-image: url(/static/images/praise.png); padding-right: 0.4rem; }

  .text_box{ width: 100%; padding: 0.1rem 0rem;overflow: hidden; }
  .text_box p{ line-height: 0.5rem; font-size: 0.28rem; }
  .photos_box{ overflow: hidden; }
  .photos_box span{ margin: 0 0.05rem 0.1rem;min-width: 2.2rem;  max-width: 2.3rem; height: 2.3rem; overflow: hidden; background-image: url(/static/images/imgloading.png); background-size: 1.91rem 1.37rem; background-repeat: no-repeat; background-position: center center;}
  .photos_box img{ width: 100%; height: 100%;}
  /*滑动动画*/
  .slider1-enter-active, .slider1-leave-active, .slider2-enter-active, .slider2-leave-active{
    transition: .4s;
  }
  .slider1-enter, .slider1-leave-to{
    position: fixed;
    top: 1.05rem;
    transform: translateX(-100%);
  }
  .slider2-enter, .slider2-leave-to{
    position: fixed;
    top: 1.05rem;
    transform: translateX(100%);
  }

</style>
