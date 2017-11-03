<template lang="html">
  <div class="comment">
    <header>
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <!-- 顶部间隔 -->
    <span class="spacing2"></span>
    <!-- 评论区 -->
    <div class="comment_list" v-for="comment in comments">
      <span class="comment_user">
        <span class="portrait"><img :src="comment.userImg" alt=""></span>
        <h3>{{ comment.userName }}</h3>
        <p>{{ comment.userDate }}</p>
      </span>
      <ul class="comment_photos">
        <li v-for="pItem in comment.commentPotos"><img :src="pItem"></li>
      </ul>
      <span class="comment_text">
        <p>{{ comment.commentText }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'
import Ajax from '@/module/ajax'

export default {
  name: 'comment',
  data () {
    return {
      title: '商品评论专区',
      comments: [
        {
          userImg: '/static/images/jiangli_icon.png',
          userName: '加载中...',
          userDate: '加载中...',
          commentPotos: [''],
          commentText: '加载中...'
        }
      ]
    }
  },
  components: { Goback },
  methods: {
    getData () {
      let ajaxData = 'goods_id=' + this.$route.params.Ctext
      let getSuccess = (data) => {
        this.comments = data
      }
      let getError = (error) => {
        console.log(error)
      }
      Ajax.ajaxRequest('http://www.aikhome.com/index.php/apiv/goods/getGoodsComments', 'POST', getSuccess, getError, 'goods_id=745')
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="css" scoped>
  .comment{ width: 100%; }
  .comment_list{ margin-bottom: 0.2rem; background-color: #fff; }
  .comment_user{ padding: 0.2rem; }
  .portrait{ width: 0.72rem; height: 0.72rem; float: left; margin-right: 0.2rem; border-radius: 50%; overflow: hidden; }
  .comment_user h3{ font-size: 0.36rem; line-height: 0.4rem; font-weight: 400; }
  .comment_user p{ color: #525252; font-size: 0.24rem; }
  .comment_photos{ width: 100%; overflow: auto; }
  .comment_photos li{ width: 47%; margin-left: 2%; float: left; height: 2.08rem; overflow: hidden; margin-bottom: 2%; background-image: url(/static/images/imgloading.png); background-size: 2.7rem 1.93rem; background-position: center center; background-repeat: no-repeat;}
  .comment_text{ padding: 0.2rem; }
</style>
