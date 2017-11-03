<template lang="html">
  <div class="video">
    <header>
      <goback></goback>
      <h2>{{ videoData.videoTitle }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <section class="content">
      <video :src="videoData.videoUrl" controls="controls">
      </video>
      <span class="text_box">
        <p>{{ videoData.videoTitle }}</p>
        <p>
          <i class="collection"></i>
          <i class="comment">{{ videoData.commentNum }}</i>
          <i class="watch">{{ videoData.watchNum }}</i>
        </p>
      </span>
      <span class="text_content">
        <p>{{ videoData.videoText }}</p>
      </span>
      <!-- 评论 -->
      <ul class="comment_list">
        <h3>全部评论</h3>
        <li v-for="(commentList, index) in commentLists">
          <span class="user_portrait"><img :src="commentList.userImg"></span>
          <h4>{{ commentList.userName }}</h4>
          <h5>{{ commentList.time }}</h5>
          <p>{{ commentList.content }}</p>
        </li>
      </ul>
    </section>
    <!-- 提示框 -->
    <pbox v-if="pShow"></pbox>
    <!-- loading -->
    <loading v-if="loading"></loading>
    <footer>
      <input type="text" v-model="commentText" placeholder="请输入不为空的内容..." v-if="isShow">
      <span class="send" v-if="isShow" @click="sendMsg">发送</span>
      <router-link tag="span" class="signin_btn" :to="{ path: '/signin', query: { plan: '1' } }" v-if="!isShow">你还没登录，点我登录才能发表评论</router-link>
    </footer>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Loading from '@/components/loading'
import Pbox from '@/components/prompt'

export default {
  name: 'video',
  data () {
    return {
      title: '标题',
      commentText: '',  // 评论的内容
      isShow: false,
      videoData: {
        videoUrl: '',
        videoTitle: '加载中',
        collection: false,
        commentNum: '加载中',
        watchNum: '加载中',
        videoText: '加载中',
      },
      commentLists: [
        {
          userImg: '/static/images/jiangli_head.png',
          userName: '阿基米德',
          time: '10分钟前',
          content: '这个视频看一百遍都不腻。'
        },
        {
          userImg: '/static/images/jiangli_head.png',
          userName: '佛拉基米尔',
          time: '35分钟前',
          content: '你们有听过我的歌吗？'
        },
        {
          userImg: '/static/images/jiangli_head.png',
          userName: '普雷拉多',
          time: '1小时前',
          content: '世界上养猫最早的算是古埃及，远在公元前2600年就有了猫的记载。'
        }
      ]
    }
  },
  components: { Goback,Pbox,Loading },

  methods: {
    getVideo(){
      this.$http.get('http://www.aikhome.com/index.php/apiv/Goods/video_info',{
        params:{id:this.$route.params.video_id}
      }).then(res=>{
        let videoData = res.body[0]
        this.videoData = {
          videoUrl: `http://www.aikhome.com/public/${videoData.lesson_video}`,
          videoTitle: videoData.lesson_name,
          collection: false,
          commentNum: '65',
          watchNum: '120',
          videoText: videoData.lesson_desc,
        }
      })
    },
    sendMsg () {
      while(this.commentText.lastIndexOf(' ')>=0){
        this.commentText = this.commentText.replace(' ','')
      }
      if(this.commentText.length == 0){
        this.$store.commit('promptText',{ text: '输入不能全为空' })
      }else {
        this.$store.commit('loadShow')
        setTimeout(() => {
          this.$store.commit('loadShow')
          this.$store.commit('promptText',{ text: '发帖成功' })
          this.commentText = ''
        },300)
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    pShow () {
      return this.$store.state.pShow
    }
  },
  mounted () {
    if (!localStorage.getItem('state') || localStorage.getItem('state') === '0') {
      return false
    }else {
      this.isShow = !this.isShow
    }
    this.getVideo()
  }
}
</script>

<style lang="css" scoped>
.video{ width: 100%; }
header{ border: none; }
header h2{ display: inline-block; width: 6rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.content{ width: 100%; padding-bottom: 1rem; }
.content video{ width: 100%; display: block; height: 4.6rem; background-color: #000; }
.text_box{ padding: 0.2rem; border-bottom: solid 1px #eee; background-color: #fff; overflow: hidden; }
.text_box p{ line-height: 0.5rem; overflow: hidden; margin-bottom: 0.1rem; }
.text_box p:nth-child(2){ margin: 0; }
.collection{ background-image: url(/static/images/collection.png); background-size: 0.35rem 0.7rem; background-position: top left; }
.comment{ background-image: url(/static/images/info.png); background-size: 0.35rem 0.35rem; background-position: center left; padding-left: 0.4rem; }
.watch{ background-image: url(/static/images/watch.png); background-size: 0.35rem 0.35rem; background-position: center left; padding-left: 0.4rem; }
.text_box i{ display: inline-block; font-size: 0.24rem; color: #ccc; line-height: 0.35rem; font-style: normal; float: right; min-width: 0.35rem; height: 0.35rem; margin-left: 0.2rem; background-repeat: no-repeat; }
.text_content{ padding: 0.2rem; background-color: #fff; font-size: 0.28rem; line-height: 0.45rem; margin-bottom: 0.2rem; }
/*评论*/
.comment_list{ width: 100%; background-color: #fff; }
.comment_list h3{ font-size: 0.36rem; line-height: 0.88rem; padding-left: 0.2rem; border-bottom: solid 1px #eee; }
.comment_list li{ border-bottom: solid 1px #eee; padding: 0.2rem; overflow: hidden; }
.user_portrait{ width: 0.7rem; height: 0.7rem; float: left; border-radius: 50%; overflow: hidden; margin-right: 0.2rem; margin-bottom: 0.1rem; }
.comment_list h4{ float: left; line-height: 0.7rem; font-weight: 400; font-size: 0.28rem; }
.comment_list h5{ float: right; line-height: 0.7rem; font-weight: 400; color: #ccc; font-size: 0.28rem; }
.comment_list p{ line-height: 0.5rem; clear: both; }
/*发表框*/
footer{ width: 96%; height: 0.7rem; position: fixed; bottom: 0; left: 0; padding: 0.14rem 2%; background-color: #f5f5f5; }
footer input{ display: block; width: 74%; height: 0.6rem; padding: 0.05rem 3%; border: none; background-color: #fff; float: left; border-radius: 0.08rem; outline-color: #8c8df6; }
.send{ width: 18%; float: left; height: 0.7rem; text-align: center; line-height: 0.7rem; margin-left: 2%; background: linear-gradient(to right, #51d8f0 , #429ee4); color: #fff; border-radius: 0.08rem; }
.signin_btn{ height: 0.7rem; width: 100%; text-align: center; line-height: 0.7rem; background: linear-gradient(to right, #51d8f0 , #429ee4); color: #fff; border-radius: 0.08rem; }

</style>
