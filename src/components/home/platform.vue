<template lang="html">
  <div class="platform">
    <header>
      <goback></goback>
      <h2>幸福学院</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 分类 -->
    <nav class="flex">
      <li class="f1" v-for="(navlist, index) in navLists">
        <img :src="navlist.liImg">
        <router-link tag="span" class="text_box" :to="{ name: 'videoTitle', params: { title: navlist.liTitle }}">
          <h3>{{ navlist.liTitle }}</h3>
          <p>{{ navlist.liText }}</p>
        </router-link>
      </li>
    </nav>
    <!-- 列表 -->
    <ul class="video_list">
      <router-link tag="li" :to="{ name: 'videoId', params: { video_id: videoList.videoId }}" v-for="(videoList, index) in videoLists">
        <img :src="videoList.videoImg">
        <span  class="text_box">
          <h3>{{ videoList.videoText }}</h3>
        </span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'platform',
  data () {
    return {
      navLists: [
        {
          liImg: '/static/images/plat1.png',
          liTitle: '新鲜出炉',
          liText: '最新视频 视觉盛宴',
        },
        {
          liImg: '/static/images/plat2.png',
          liTitle: '热气腾腾',
          liText: '热门推荐 人气视频',
        }
      ],
      videoLists: [
        {
          videoId: '-1',
          videoImg: '',
          videoText: '加载中'
        },
      ]
    }
  },
  components: { Goback },
  created(){
    this.getVideoList()
  },
  methods: {
    getVideoList(){
      this.$http.get('http://www.aikhome.com/index.php/apiv/Goods/video_list').then(res=>{
        let videos = res.body
        let tempList = []
        for (let video of videos){
          let tempItem = {
            videoId: video.id,
            videoImg: `http://www.aikhome.com/public/${video.lesson_pic}`,
            videoText: video.lesson_name,
          }
          tempList.push(tempItem)
        }
        this.videoLists = tempList
        console.log(this.videoLists)
      })
    },
  }
}
</script>

<style lang="css" scoped>
  .platform{ width: 100%; }
  nav{ width: 100%; height: 3.73rem; margin-bottom: 2px; }
  nav li{ margin-left: 2px; height: 3.73rem; overflow: hidden; position: relative; background-image: url(/static/images/imgloading.png); background-size: 2.55rem 1.83rem; background-position: center center; background-repeat: no-repeat; }
  nav li:nth-child(1){ margin-left: 0; }
  nav .text_box {background: none}
  .text_box{ width: 100%; max-width: 6rem; height: 1rem;  position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; }
  .text_box h3{ text-align: center; color: #fff; line-height: 0.5rem;font-size: 0.36rem; font-weight: 600;text-shadow:5px 5px 6px #000;  }
  .text_box p{ text-align: center; color: #fff; line-height: 0.5rem; font-size: 0.32rem; }
  .video_list{ width: 100%; }
  .video_list li{ width: 100%; height: 3.72rem; overflow: hidden; margin-bottom: 2px; position: relative; background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat; }
  /*.video_list li img { filter: brightness(70%);     }*/
</style>
