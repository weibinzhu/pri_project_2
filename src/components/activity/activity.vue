<template lang="html">
  <div class="activity">
    <header>
      <goback></goback>
      <h2>{{activityHead}}</h2>
    </header>
    <span class="activity_content">
      <h3>{{ activityTitle }}</h3>
      <p v-for="(listText, index) in activityTexts">{{ listText }}</p>
    </span>
    <ul class="activity_list">
      <li v-for="(list, index) in activityLists"><img :src="list"></li>
    </ul>
  </div>
</template>

<script>
import Goback from '@/components/goback'

export default {
  name: 'activity',
  data () {
    return {
      activityHead:'粉红丝带，乳腺癌防治活动宣传月',
      activityTitle: '健康万里行，爱心传递，为实现一个没有乳腺癌的世界而努力',
      activityTexts: [
        '“粉红丝带”作为乳腺癌防治活动的标识，用于宣传和倡导“及早预防，及早发现，及早治疗”这一理念，粉红丝带已成为全球乳腺癌防治活动的公认标志，每年的10月为粉红丝带乳腺癌防治宣传月，10月18日为粉红丝带乳腺癌防治宣传日，10月的第三个星期五为粉红丝带关爱日。',
        '粉红丝带活动由民间发起，但得到社会各界的支持，足迹遍布全球数十个国家。各国政府亦将每年的10月定为“乳腺癌防治月”。在中国，粉红丝带健康管理机构与粉红丝带健康咨询机构等单位共同成立“粉红丝带活动组委会”，倡议发起“中华粉红丝带女性健康万里行活动”、“粉红丝带乳腺癌防治宣传活动”、“粉红丝带爱心传递活动”，提示人们关爱乳房、呵护生命，她已经成为了一种爱心和时尚，越来越多的媒体、政要、名人、明星正在参与进来，为实现一个没有乳腺癌的世界而努力，我们已经进入了一个全新的“粉红时代”。'
      ],
      activityLists: [
        '/static/images/activity_01.jpg',
        '/static/images/activity_02.jpg',
        '/static/images/activity_03.jpg',
        '/static/images/activity_04.jpg',
        '/static/images/activity_05.jpg',
        '/static/images/activity_06.jpg',
        '/static/images/activity_07.jpg',
        '/static/images/activity_08.jpg',
        '/static/images/activity_09.jpg',
        '/static/images/activity_10.jpg',
        '/static/images/activity_11.jpg',
        '/static/images/activity_12.jpg',
        '/static/images/activity_13.jpg',
        '/static/images/activity_14.jpg',
        '/static/images/activity_15.jpg',
      ]
    }
  },
  created(){
    let index = this.$route.query.index
    console.log(index)
    switch (index){
      case 0:
        this.activityHead='粉红丝带，乳腺癌防治活动宣传月'
        this.activityTitle='健康万里行，爱心传递，为实现一个没有乳腺癌的世界而努力'
        this.activityTexts= ['“粉红丝带”作为乳腺癌防治活动的标识，用于宣传和倡导“及早预防，及早发现，及早治疗”这一理念，粉红丝带已成为全球乳腺癌防治活动的公认标志，每年的10月为粉红丝带乳腺癌防治宣传月，10月18日为粉红丝带乳腺癌防治宣传日，10月的第三个星期五为粉红丝带关爱日。',
        '粉红丝带活动由民间发起，但得到社会各界的支持，足迹遍布全球数十个国家。各国政府亦将每年的10月定为“乳腺癌防治月”。在中国，粉红丝带健康管理机构与粉红丝带健康咨询机构等单位共同成立“粉红丝带活动组委会”，倡议发起“中华粉红丝带女性健康万里行活动”、“粉红丝带乳腺癌防治宣传活动”、“粉红丝带爱心传递活动”，提示人们关爱乳房、呵护生命，她已经成为了一种爱心和时尚，越来越多的媒体、政要、名人、明星正在参与进来，为实现一个没有乳腺癌的世界而努力，我们已经进入了一个全新的“粉红时代”。']
        this.activityLists= ['/static/images/activity_01.jpg',
        '/static/images/activity_02.jpg',
        '/static/images/activity_03.jpg',
        '/static/images/activity_04.jpg',
        '/static/images/activity_05.jpg',
        '/static/images/activity_06.jpg',
        '/static/images/activity_07.jpg',
        '/static/images/activity_08.jpg',
        '/static/images/activity_09.jpg',
        '/static/images/activity_10.jpg',
        '/static/images/activity_11.jpg',
        '/static/images/activity_12.jpg',
        '/static/images/activity_13.jpg',
        '/static/images/activity_14.jpg',
        '/static/images/activity_15.jpg',]
        break
      case 1:
        this.activityHead='健康中国关爱行公益项目'
        this.activityTitle='健康中国关爱行公益项目'
        this.activityTexts= ['健康中国关爱行公益项目是由中国初级卫生保健基金会发起的一项公益慈善活动，由其下设东方关爱公益基金负责执行实施。\n' +
        '该公益项目旨在联合政府、企业、非营利组织及媒体等各方面力量，通过推广慢病管理教育、义诊筛查咨询、慢性病专项救助、社区服务及老年健康服务等模式，关注老人与儿童因营养失衡而引发的各类慢性疾病，推广传统医学在慢性疾病防治领域中的应用，达到提高全民自我慢病综合防治管理水平，提升我国基础医疗体系建设，促进我国初级卫生保健事业的发展。\n' +
        '根据《中共中央关于在全党深入开展党的群众路线教育实践活动的意见》（中发〔2013〕4号）和国家卫生计生委《全民健康素养促进行动计划（2014-2020年）》（国卫宣传发〔2014〕15号）精神，为了进一步提升我国基础医疗的诊治技术和服务水平，促进我国初级卫生保健事业的蓬勃发展，大力弘扬中国传统医学在慢性疾病防治中的积极作用，全面提高我国居民的健康水平，中国初级卫生保健基金会东方关爱公益基金拟邀请中国社区卫生协会、中国人生科学学会营养科学研究院、世界中医药学会联合会中药专业委员会、中国教育电视台等单位联合开展“健康中国关爱行”公益活动。\n' +
        '本次活动的核心是帮助和解决基层“一老一小”的健康问题；以“政策引路、社会互助、公益服务、健康同步”为指导思想，在国家政策的指导下，发挥社会组织、公益基金的积极作用，引导全社会共同关心和解决儿童、老年人的身心健康问题。探索多部门合作、全社会参与的健康促进公益模式，倡导树立科学慢病防治观，促进儿童、老年人的营养改善与慢病综合管理，提高全民对于慢病防治知识的知晓率、治疗率和达标率，预防和抑制我国目前非传染性慢性疾病不断蔓延的高发态势。\n' +
        '本次活动主要是在各省市卫生部门的组织协调下，制定出切实行之有实效的实施方案，在综合医院及社区卫生服务中心开展血糖/血压/心血管风险因素筛查、健康大讲堂等慢病管理教育；实施慢病防预知识科普、义诊咨询活动、医护师技能提升、基础医疗条件改善等公益项目；同时还要以建立长效机制为目标开展“营养配餐进校园、健康服务进社区” “中医文化进家庭”等活动积极引导设立老年健康服务组织；针对特困人群开展心脑血管病、糖尿病、慢性呼吸系统疾病、肿瘤等重点慢性病专项救治；在有条件的地区开展康复营养治疗试点工作；设计开发院外慢病管理软件开展居家养老护理人员培训。促进全民自我慢病综合防治管理水平的提升，通过公益活动聚集全社会互助正能量，共同促进我国初级卫生保健事业的发展，助力全民早日实现健康中国梦。']
        this.activityLists= ['/static/images/guanai1.jpg',
          '/static/images/guanai2.jpg',
          '/static/images/guanai3.jpg',]
        break
      case 2:
        this.activityHead='医院慈善公益行 义诊活动进社区'
        this.activityTitle='医院慈善公益行 义诊活动进社区'
        this.activityTexts= ['加入WTO后的中国从全球化舞台上的青涩配角，快速成长为GDP总量跻身全世界第二。与此同时，信息技术突飞猛进，基因密码陆续破译，疾病病毒不断演变，新疫情不期而至，健康被公认为最大的财富，医疗领域成为资本角逐的金矿。每一个制造健康产品的专业医疗机构，从出生开始就承载着不平凡的使命。\n' +
        '\n' +
        '　　现代医院以扞卫生命健康为价值原点，以“情系苍生，尊重生命”的医院使命，肩负社会公益，传递对生命的真诚热爱。现代医院自成立之初，不断大胆实践、开拓创新，创造了经济效益的同时创造社会效益，致力公益慈善事业。“现代人”深信：企业的发展得益于社会，更应回报社会。']
        this.activityLists= ['/static/images/yizhen1.jpg',
          '/static/images/yizhen2.jpg',
          '/static/images/yizhen3.jpg',]
        break
      case 3:
        this.activityHead='医疗公益活动走进西藏'
        this.activityTitle='医疗公益活动走进西藏'
        this.activityTexts= ['日前，为期9天的“2017同心·共铸中国心”西藏行大型医疗公益活动在西藏自治区启动，来自全国200余家医疗机构的专家志愿者开展义诊巡诊、爱心捐赠、培训讲座、现场手术等公益活动。新华社发（曹正平 摄）']
        this.activityLists= ['/static/images/xizang1.jpg',
          '/static/images/xizang2.jpg',
          '/static/images/xizang3.jpg',]
        break
    }
  },
  components: { Goback }
}
</script>

<style lang="css" scoped>
  .activity{ width: 100%; }
  .activity_content{ padding: 0.1rem 0.2rem; }
  .activity_content h3{ font-size: 0.36rem; line-height: 0.8rem; color: #8c8df6; }
  .activity_content p{ margin-bottom: 0.2rem; }
</style>
