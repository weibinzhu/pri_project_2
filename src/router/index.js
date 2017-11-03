import Vue from 'vue'
// 路由
import Router from 'vue-router'
Vue.use(Router)
import Index from '@/components/index'
// 首页模块
import Home from '@/components/home/home'
import Ctiys from '@/components/home/city'
import Hclass from '@/components/home/homeclass'
import Community from '@/components/home/community'
import Release from '@/components/home/release'
import Platform from '@/components/home/platform'
import Platclass from '@/components/home/platclass'
import Video from '@/components/home/video'
import Agent from '@/components/home/agent'
// 分类页模块
import Shopclass from '@/components/shopclass/shopclass'
import Nava from '@/components/shopclass/classa'
// 机器人页
import Robot from '@/components/robot/robot'
// 商品
import Scar from '@/components/shop/shopcar'
import Sdetails from '@/components/shop/shopdetails'
import Comm from '@/components/shop/comment'
import Logis from '@/components/shop/logistics'
import Refund from '@/components/shop/refund'
import Evalu from '@/components/shop/evaluate'
// 个人中心模块
import Personal from '@/components/personal/personal'
import Pdata from '@/components/personal/personaldata'
import Paddress from '@/components/personal/address'
import Myaccount from '@/components/personal/myaccount'
import Mypapp from '@/components/personal/myappointment'
import Mycoll from '@/components/personal/mycollection'
import Myrew from '@/components/personal/myreward'
import Myteam from '@/components/personal/myteam'
import Myarc from '@/components/personal/archives'
import Myorder from '@/components/personal/myorder'
import Mypost from '@/components/personal/mypost'
// 登录页
import Sig from '@/components/personal/signin'
// 注册页
import Reg from '@/components/personal/register'
// 活动页
import Act from '@/components/activity/activity'


export default new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: Index,
      children: [
        {
          path: '/home',
          component: Home,
          children: [
            {
              path: '/city',
              component: Ctiys
            }
          ]
        },
        {
          path: '/shopclass',
          component: Shopclass
        },
        {
          path: '/robot',
          component: Robot
        },
        {
          path: '/shopcar',
          component: Scar
        },
        {
          path: '/personal',
          component: Personal
        }
      ]
    },
    {
      path: '/hclass/:text',
      component: Hclass,
      name: 'classTitle'
    },
    {
      path: '/agent',
      component: Agent
    },
    {
      path: '/comm',
      component: Community
    },
    {
      path: '/rel',
      component: Release
    },
    {
      path: '/plat',
      component: Platform
    },
    {
      path: '/pclass/:title',
      component: Platclass,
      name: 'videoTitle'
    },
    {
      path: '/video/:video_id',
      component: Video,
      name: 'videoId'
    },
    {
      path: '/shopd/:shop_id',
      component: Sdetails,
      name: 'shopDetails'
    },
    {
      path: '/classa/:num',
      component: Nava
    },
    {
      path: '/comment/:Ctext',
      component: Comm,
      name: 'comment'
    },
    {
      path: '/pdata',
      component: Pdata
    },
    {
      path: '/paddress',
      component: Paddress
    },
    {
      path: '/myacc',
      component: Myaccount
    },
    {
      path: '/mypap',
      component: Mypapp
    },
    {
      path: '/logis/:order_id',
      component: Logis,
      name: 'logisId'
    },
    {
      path: '/refund/:order_id',
      component: Refund,
      name: 'refundId'
    },
    {
      path: '/evalu/:order_id',
      component: Evalu,
      name: 'evaluId'
    },
    {
      path: '/mycoll',
      component: Mycoll
    },
    {
      path: '/myrew',
      component: Myrew
    },
    {
      path: '/myteam',
      component: Myteam
    },
    {
      path: '/myarc',
      component: Myarc
    },
    {
      path: '/myorder',
      component: Myorder
    },
    {
      path: '/mypost',
      component: Mypost
    },
    {
      path: '/register',
      component: Reg
    },
    {
      path: '/signin',
      component: Sig
    },
    {
      path: '/activity',
      component: Act
    }
  ]
})
