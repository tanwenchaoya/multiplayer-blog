<template>
  <div id="message">
    <marquee style="color:orange;" direction="left">
      每天一句话来激励自己吧！！
    </marquee>
        <replyOrpublish 
        :messageData='arrMesasgeList' publishURL="/message/leavemessage"
        replyURL='/message/replyInfo'
        />
        <Page class="page" :page-size="10" @on-change="Pagechange" :total="count" show-total />
        <div class="message-footer">
          <!-- <Footer></Footer> -->
        </div>
  </div>
</template>

<script>
import { PageSizeChange } from '../components/NetWork/request'
import Footer from '../components/Footer.vue'
import replyOrpublish from '../components/ReplyOrPublish/replyOrpublish'
  export default {
    name:'leaveMessage',
    data () {
      return {
          value:'',
          arrMesasgeList:[],
          currentSize:1,
          count:0,
          isshow:false,
          replyInfo:{},
          replyValue:''
      };
    },
    mounted() {
      this.Pagechange(1)
    },
    components:{ replyOrpublish,Footer},
    methods: {
      Pagechange(index) {
        /* 发起请求 */
        // this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在获取留言信息~'})
        PageSizeChange('/page/pageSize',{page:index})
        .then(res => {
          if(res.data.err == 0) {
            this.count = res.data.message.count
            this.arrMesasgeList = res.data.message.data
            this.$Spin.hide()
          } else {
            this.$Message.error("网络出错了,(ノへ￣、)！")
          }
          //  this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
        })
      },
    }
  }
</script>
<style lang="scss" scope>
#message {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top:2rem;
    .page {
      margin:2rem 0;
      position: relative;
      z-index: 99;
    }
    .message-footer{
      position: fixed;
      bottom: 0;
      left: 0;
    }
}
</style>