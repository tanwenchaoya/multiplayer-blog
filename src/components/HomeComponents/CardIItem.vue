<template>
  <div id="carditem">
        <div class="md-title">
          <!-- md尺寸的小球 -->
          <div class="right-around md-ball">
            <span :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
          </div>
          <p class="title"> <i class="iconfont icon-lianjie"></i>  {{title}}</p>
        </div>
         <img @click="detailPage(article_id)" :src="Itemimg" alt="封面">
        <Card :contentid="id" class="card">
          <!-- xl尺寸显示的三个小球 -->
          <div class="right-around xl-ball">
            <span :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
          </div>
          <!-- 文章标题 -->
           <p class="title"><i class="iconfont icon-lianjie"></i>{{title}}</p>
            <!-- 文章简介 -->
            <p v-html="content" class="content"></p>
            <!-- 文章发布时间，点赞数，访问量 -->
            <div class="article-item-icon">
              <div class="access_me"><img :src="touxiang" alt=""><p>{{username}}</p></div>
              <p class="publictime"><Icon type="ios-clock-outline" /> {{time | timeFilter}}</p>
              <p class="box">
              <i @click="likeArticle(id)" 
              class="iconfont icon-dianzan"
              :class="{likeStyle:liked(id)}"
              ></i>
              <span style="margin-right:0.5rem">{{like}}</span>
              <i class="iconfont icon-pinglun"></i><span>{{accessPulish_count}}</span>
              <i class="iconfont icon-fangwen"></i><span>{{visited}}</span>
            </p>
            </div>
            <!-- 文章标签 -->
            <div class="tags">
              <Tag color="cyan">{{categroy}}</Tag>
              <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag>
            </div>
            <div class="card-button" v-if="$route.path.includes('myArticle')">
              <!-- <el-button type="danger" size="mini" @click="deleteArticle">删除</el-button> -->
              <el-popconfirm
                title="确定删除该文章码？"
                @confirm='deleteArticle'
              >
                <el-button slot="reference" size="mini"  type="danger">删除</el-button>
              </el-popconfirm>
              <el-button type="primary" size="mini" class="update-article" @click="updateArticle">更新文章</el-button>
            </div>
        </Card>
  </div>
</template>
<script>
import moment from "moment";
  export default {
    name:'carditem',
    props:{
      title:{
        type:String,default:'',required:true
      },
      time:{
        type:String,default:'',required:true
      },
      content:{
        type:String,default:'',required:true
      },
      Itemimg:{
        type:String,default:'',required:true
      },
      visited:{
        type:Number,default:999,required:true
      },
      like:{
        type:Number,default:999,required:true
      },
      id:{
        type:Number,default:0,required:true
      },
      article_id:{
        type:String,default:'',required:true
      },
      accessPulish_count:{
        type:Number,default:0,required:true
      },
      lable:{
        type:String,default:''
      },
      categroy:{
        type:String,default:''
      },
      username:{
        type:String,default:''
      },
      touxiang:{
        type:String,default:''
      }
    },
    data () {
      return {
        flag:true,
        bgColor:['magenta','blue','red','cyan','volcano','yellow'],
        ballColor:['orangered', 'yellow', 'lightgreen']
      };
    },
    filters:{
      timeFilter(V) {
        // return V.toString().slice(0,10)
      return moment(V).format("YYYY-MM-DD");

      }
    },
    methods: {
      detailPage(article_id) {
        this.$router.push(`/detail/${article_id}`)
      },
      likeArticle(id) {
        if(localStorage.getItem('username')) {
          if(localStorage.getItem(`like${id}`)) {
          this.$Message.success("你已经为这篇文章点过赞了噢~o(*￣▽￣*)o")
        } else {
          localStorage.setItem(`like${id}`,id)
          /* 发送请求 */
        this.$emit('changelike',id)
        }
        } else {
           this.$Message.error("请先去登陆再来点赞噢小主！(ノへ￣、)")
        }
      },
      deleteArticle(){
        this.$emit('deleteArt',this.article_id)
      },
      updateArticle(){
        this.$store.dispatch('blog/updateArticle',{articleId:this.article_id});
        this.$router.push('/artConfig/articlePublish');
      }
   },
   computed:{
      liked() {
        return function(id) {
          return localStorage.getItem(`like${id}`) == id
        }
      },
      lablesList() {
      const regExep = /\w\w*/g
      return this.title.match(regExep)
    }
   }
  }

</script>
<style lang="scss" scoped>
.card::v-deep .ivu-card-body{
        width: 100%;
      }
  #carditem {
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid #ccc;
    .md-title { 
      display: none; font-size: 16px;
      margin: 1rem 0;
      color: #333;
    }
      .md-ball {
        margin-right: 1rem;
        display: none;
      }
     .right-around {
        float:right;
        span {
          display: inline-block;
          width: 12px;height: 12px;
          border-radius: 50%;
          margin: 0 0.2rem;
          border: 1px solid #f2f2f2;
        }
      }
    .card {
      
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0 0 0;
      border: 0;
      
      .title {
        font-size: 16px;
        margin: 1rem 0;
        color: #333;
      }
      .content {
        font-size: 14px;
      }
      .article-item-icon {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 1rem 0;
        .publictime {
          white-space: nowrap;
          margin-left: 1.5rem;
        }
        .access_me {
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: .8rem;
          color: skyblue;
          img {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            padding: 0;
          }
        }
        .box {
          padding-left: 0.8rem;
          i {
            font-size: 13px;
            margin: 0 0.2rem;
            color: #333;
          }
          i:nth-child(1):hover {
            color: orange;
            cursor: pointer;
          }
        }
      }
      .card-button{
        margin: 10px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .update-article{
          margin-left: 20px;
        }
      }
    }
    .card:hover {
      transition: transform .6s;
      box-shadow: 0 0 0 #fff;
      transform: scale(0.95);
      cursor: pointer;
    }
    img {
      width: 14rem;
      padding: .4rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  @media screen and (max-width:992px) {
      #carditem {
        flex-direction: column;
        .md-ball {
          display: inline;
        }
        .xl-ball {
          display: none;
        }
        .md-title {
          display: block;
          p {
            margin-left: 1rem;
          }
        }
        .card {
          .title {
            display: none;
          }
        }
        img {
          width: 60%;
          margin: 0;
          margin:0 1rem;
        }
      }
  }
</style>