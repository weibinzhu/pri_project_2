<template lang="html">
  <div class="address">
    <header v-if="headerShow">
      <goback></goback>
      <h2>{{ title }}</h2>
    </header>
    <section class="address_box">
       <ul>
          <li>
             <h2>收货人：</h2>
             <span @click="Moda">修改</span>
             <span v-if="dataLength > 1">删除</span>
             <p>{{ Aname }}</p>
          </li>
          <li>
             <h2>手机号：</h2>
             <p>{{ Aphone }}</p>
          </li>
          <li>
             <h2>详细地址：</h2>
             <p>{{ Aaddress }}</p>
          </li>
       </ul>
       <span class="btn" @click="Adda">增新收货地址</span>
    </section>
    <!-- 管理收货地址 -->
    <div class="modify" v-if="modifyShow">
      <header>
        <span class="close iconfont icon-jiantou01" @click="modifyShow = !modifyShow,isheadershow()"></span>
        <h2>{{ modifyTitle }}</h2>
      </header>
      <div class="address_box">
         <ul class="address_ul">
            <li>
               <h2>姓名</h2>
               <input v-model="receiverName" type="text" placeholder="请输入收件人姓名"/>
            </li>
            <li>
               <h2>手机</h2>
               <input v-model="receiverMobile" type="text" placeholder="请输入手机号"/>
            </li>
            <li>
               <h2>省份</h2>
               <input @click="selectAddr(0)" v-model="receiverProvince"  type="text" placeholder="请选择省份" readonly="readonly" class="position" />
            </li>
            <li>
               <h2>城市</h2>
               <input @click="selectAddr(1)" v-model="receiverCity" type="text" placeholder="请选择城市" readonly="readonly" class="position" />
            </li>
            <li>
               <h2>区县</h2>
               <input @click="selectAddr(2)" v-model="receiverDistrict" type="text" placeholder="请选择区县" readonly="readonly" class="position" />
            </li>
            <li>
               <h2>详细地址</h2>
               <input v-model="receiverAddr" type="text" value="" placeholder="请输入详细地址"/>
            </li>
         </ul>
        <span class="btn" @click="saveAddr">保存</span>
      </div>
      <transition name="selectBoxShow">
        <ul class="selectBox" v-show="selectBoxShow">
        <span class="iconfont icon-guanbi close" @click="hideSelectBox"></span>
          <li v-for="(item,index) in currentList" @click="select(index)">{{item}}</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'address',
  data () {
    return {
      title: '个人收货地址',
      Aname: '张国荣',
      Aphone: '13265317656',
      Aaddress: '青蓝街26号有米科技大厦5层502房',
      dataLength: 1,
      headerShow: true,
      modifyShow: false,
      modifyTitle: '',
      currentType: -1, // 当前是修改地址还是增加地址，0为修改，1为增加

      selectBoxShow:false,// 地址选择的显隐

      pList:['广东省','福建省','北京市','上海市','湖南省','湖北省'],// 省
      cList:['广州市','深圳市','珠海市','东莞市','佛山市','惠州市'],// 市
      dList:['番禺区','天河区','越秀区','白云区','黄埔区'],// 区
      currentList:[],
      currentListType : -1, // 当前是省还是市还是区
//      修改、增加地址用临时绑定
      receiverName:'',
      receiverMobile:'',
      receiverProvince:'',
      receiverCity:'',
      receiverDistrict:'',
      receiverAddr:'',
    }
  },
  methods: {
    Moda () {
      this.isheadershow()
      this.modifyTitle = '修改当前收货地址'
      this.currentType = 0
      this.modifyShow = !this.modifyShow
    },
    Adda () {
      this.isheadershow()
      this.modifyTitle = '增加收货地址'
      this.currentType = 1
      this.modifyShow = !this.modifyShow
    },
    isheadershow () {
      this.headerShow = !this.headerShow
    },
    selectAddr(type){
      // type: 点击的是省、市还是区，分别为0，1 ，2
      if (type == 0){
        this.currentListType = 0
        this.currentList = this.pList
      }else if(type == 1){
        this.currentListType = 1
        this.currentList = this.cList
      }else if(type == 2){
        this.currentListType = 2
        this.currentList = this.dList
      }else{
        this.currentList = []
      }
      this.selectBoxShow = true
    },// 选择省市区
    hideSelectBox(){
      this.selectBoxShow = false
    },// 隐藏省市区
    select(index){
      if(this.currentListType == 0){
        this.receiverProvince = this.currentList[index]
      }else if (this.currentListType == 1){
        this.receiverCity = this.currentList[index]
      }else if (this.currentListType == 2){
        this.receiverDistrict = this.currentList[index]
      }
      this.selectBoxShow = false
    },// 选择省市区具体项
    saveAddr(){
      let data = {
        uid: localStorage.getItem('userID'),
        consigner: this.receiverName,
        mobile:this.receiverMobile,
        province:'广东省',
        city:'广州市',
        district:'番禺区',
        address:this.receiverAddr,
      }

      if(this.currentType == 0){
        var url = 'http://www.aikhome.com/index.php/wap/Member/updateMemberAddress'
      }else if (this.currentType == 1){
        var url = 'http://www.aikhome.com/index.php/wap/Member/addMemberAddress'
      }

      this.$http.post(url,data,{emulateJSON:true}).then(res=>{
        console.log(res)
      })
    },// 修改、增加收货地址
  },
  components: { Goback }
}
</script>

<style lang="css" scoped>
  .address{ width: 100%; overflow: hidden; }
  .address header{ position: relative; }
  .address_box{ width: 100%; }
  .address_box ul{ width: 96%; padding: 0 2%; background: #fff;}
  .address_box li{ width: 100%; min-height: 0.88rem; line-height: 0.88rem; border-bottom: solid 1px #f4f4f4; overflow: auto; margin: 0}
  .address_box li span{ float: right; width: 1rem; height: 0.6rem; margin: 0.1rem 0 0 0.1rem; border: solid 1px #5278ff; border-radius: 0.08rem; color: #5278ff; text-align: center; line-height: 0.6rem}
  .address_box p{ line-height: 0.88rem; }
  .address_box h2{ display: block; width: 30%; font-size: 0.32rem; font-weight: 600; color: rgba(0,0,0,0.7); float: left; }
  .btn{ width: 2.5rem; height: 0.7rem; line-height: 0.7rem; text-align: center; background: #8c8df6; color: #fff; border-radius: 0.08rem; margin: 1.5rem auto 0; }
  /*修改框*/
  .modify{ width: 100%; min-height: 100%; overflow: hidden; position: fixed; top: 0; left: 0; background: #ebf6f8; }
  .close{ width: 0.88rem; height: 0.88rem; color: #333; text-align: center; line-height: 0.88rem; font-size: 0.36rem; position: absolute; left: 0; top: 0; }
  .address_ul{ width: 96%; padding: 0 2%; background: #fff; }
  .address_ul li{ min-height: 0.88rem; line-height: 0.88rem; border-bottom: solid 1px #f4f4f4; margin: 0}
  .address_ul h2{ width: 20%; float: left; font-size: 0.32rem; font-weight: 600; color: rgba(0,0,0,0.7); text-align: center;}
  .address_ul input{ float: left; display: block; height: 0.7rem; width: 70%; border: none; padding: 0.1rem 0 0; outline: none; font-size: 0.28rem; }
  .address_ul .position{ text-align: center;}
  /*省市区选择*/
  .selectBox {
    position: fixed;
    top: 2rem;
    left: 1.7rem;
    width: 4rem;
    height: 5rem;
    overflow: scroll;
    padding: 0.15rem 2%;
    background-color: #ffffff;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.3);
    z-index: 10;
  }

  .selectBox li{
    text-align: center;
    min-height: 0.88rem;
    line-height: 0.88rem;
    border-bottom: solid 1px #f4f4f4;
    margin: 0
  }
  .selectBoxShow-enter{
    top: 0;
    opacity: 0;
  }
  .selectBoxShow-leave-to{
    top:4rem;
    opacity: 0;
  }
  .selectBoxShow-enter-active, .selectBoxShow-leave-active{
    transition: all 0.5s;
  }
</style>
