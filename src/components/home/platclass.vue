<template lang="html">
  <div class="platclass">
    <header>
      <goback></goback>
      <h2>{{ $route.params.title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 视频列表 -->
    <ul class="video_list">
      <li v-for="(videoList, index) in videoLists">
        <img :src="videoList.videoImg">
        <router-link tag="span" class="text_box" :to="{ name: 'videoId', params: { video_id: videoList.videoId }}">
          <h3>{{ videoList.videoText }}</h3>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'platclass',
  data () {
    return {
      videoLists: [
        {
          videoId: '0',
          videoImg: '/static/images/plat6.png',
          videoText: '打破职场天花板 商界的不为人知秘密'
        },
        {
          videoId: '1',
          videoImg: '/static/images/plat4.png',
          videoText: '内天摄入超标的铁，竟会对身体产生这样的影响？'
        },
        {
          videoId: '2',
          videoImg: '/static/images/plat5.png',
          videoText: '还在苦恼戒烟不成？你需要这样一份戒烟指南'
        },
        {
          videoId: '3',
          videoImg: '/static/images/plat3.png',
          videoText: '吸猫过敏怎么办？知名医生给你出个招'
        }
      ]
    }
  },
  components: { Goback },

  methods: {

  },
  mounted () {
    this.title = sessionStorage.getItem('pclassTitle')
  }
}
</script>

<style lang="css" scoped>
  .platclass{ width: 100%; }
  .video_list{ width: 100%; }
  .video_list li{ width: 100%; height: 3.72rem; overflow: hidden; margin-bottom: 2px; position: relative; background-image: url(/static/images/imgloading.png); background-size: 3.82rem 2.74rem; background-position: center center; background-repeat: no-repeat; }
  .text_box{ width: 100%; max-width: 6rem; height: 1rem; position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; }
  .text_box h3{ text-align: center; color: #fff; line-height: 0.5rem; font-size: 0.36rem; font-weight: 600; }
</style>
