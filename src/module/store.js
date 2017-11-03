// const STORAGE_KEY = 'aikang-vuejs'
// export default{
//   fetch () {
//     return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]')
//   },
//   save (lists) {
//     window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
//   }
// }
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  loading: false,     // 加载中显示
  pShow: false,       // 提示框显示
  pText: '',          // 提示框数据
  shareShow: false,   // 分享页显示
  // 支付页的数据
  paymentState: {
    payShow: false,     // 支付页显示
    totalPrice: '',
    totalNumber: '',
    shopId: '',
    pack_goods_list: '',
    packgoods: '',
    accountBalance: ''
  },
  // 城市数据
  address: {
    pShow: '',
    cShow: '',
    pItems: [
      {
        text: '数据加载中...',
        children: [
          {
            city: '数据加载中...'
          }
        ]
      }
    ],
    cItems: [
      {
        city: '请选择省份'
      }
    ]
  },
  // 首页数据
  homeData: {
    slideList: [
      {adv_img: '/static/images/bannerloding.jpg'}
    ],
    shopList: [
      {
        shopId: '0',
        shopImg: '',
        shopText: '加载中...',
        shopPrice: '0',
        shopVolume: '0'
      }
    ]
  },
  // 分类页数据
  classData: {
    isHover: '',
    boxShow: false,           // 侧边栏出现
    minimum: '',              // 最小价格
    maximum: '',              // 最大价格
    promptText: '',           // 提示文字
    prompt: false,            // 提示出现状态
    shopData: '',             // 存放数据（价格查询用）
    shopList: [
      {
        shopId: '0',
        shopImg: '',
        shopText: '加载中...',
        shopPrice: '0',
        shopVolume: '0'
      }
    ]
  },
  // 我的订单数据
  orderState: {
    isHover: '全部',
    liShow: true,
    liIndex: 1
  },
  // 我的预约
  appointState: {
    isActive: '全部',
    liState: 0,
    liIndex: 1,
    liShow: true,
  }
}
const mutations = {
  // 提示框
  promptText (state, payload) {
    state.pText = payload.text
    state.pShow = !state.pShow
  },
  // loading
  loadShow (state) {
    state.loading = !state.loading
  },
  // 分享页
  shareFun (state) {
    state.shareShow = !state.shareShow
  },
  // 支付页
  paymentFun (state, payload) {
    state.paymentState.totalPrice = payload.shopPrice
    state.paymentState.totalNumber = payload.shopNmber
    state.paymentState.shopId = payload.shopId
    state.paymentState.pack_goods_list = payload.shopList
    state.paymentState.packgoods = payload.shopPack
    state.paymentState.accountBalance = payload.shopBalance
    state.paymentState.payShow = !state.paymentState.payShow
  }
}

export default new Vuex.Store({ state, mutations })
