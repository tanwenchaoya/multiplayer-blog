<template>
  <div class="myArticle">
    <div v-if="!username" class="no-login">
      糟糕，您还没有登陆检测不到信息! ~§(*￣▽￣*)§~
    </div>
    <!-- <div v-if="username" class="login-article">
      <div class="card-left">
        <Card-item
          @changelike="changeliked"
          v-for="(item, index) in lists"
          :title="item.title"
          :time="item.time"
          :Itemimg="item.article_img"
          :lable="item.lable"
          :categroy="item.article_categroy"
          :content="item.article_brief"
          :visited="item.visited"
          :like="item.like_Star"
          :id="item.id"
          :article_id="item.article_id"
          :accessPulish_count="item.accessPulish_count"
          :username="item.username"
          :touxiang="item.uploadimg"
          :key="index"
        />
      </div>
    </div> -->
    <Col :xl="24" :lg="24" :md="24" :sm="22" :xs="22" v-if="username" class="login-article">
        <div class="article-box">
          <div class="article-category">
            <Icon type="ios-bookmarks-outline" />文章列表
            <div class="article-num">
              共
              <span>{{count}}</span> 篇
            </div>
          </div>
          <div class="card-left">
            <!-- 文章卡片 -->
            <Card-item
              @changelike="changeliked"
              @deleteArt="deleteArt"
              v-for="(item, index) in lists"
              :title="item.title"
              :time="item.time"
              :Itemimg="item.article_img"
              :lable="item.lable"
              :categroy="item.article_categroy"
              :content="item.article_brief"
              :visited="item.visited"
              :like="item.like_Star"
              :id="item.id"
              :article_id="item.article_id"
              :accessPulish_count="item.accessPulish_count"
              :username="item.username"
              :touxiang="item.uploadimg"
              :key="index"
            />
            <Page
              ref="page"
              :total="count"
              :page-size="4"
              class="page"
              v-show="pageShow"
              @on-change="Pagechange"
              show-total
            />
          </div>
        </div>
      </Col>
  </div>
</template>

<script>
import { getUserArticle,deleteArticle} from "../api/index";
import { getnotedetail, PostMessage, PageSizeChange } from "../components/NetWork/request";

import CardItem from "../components/HomeComponents/CardIItem";
export default {
  name: "myArticle",
  components: {
    CardItem,
  },
  data() {
    return {
      username: "",
       pageShow: true,
      count: 0,
      lists: [],
    };
  },
  // private username:string|null  ='';
  // private lists:[] = []
  mounted() {
    let username = localStorage.getItem("username");
    this.username = username ? username.replaceAll('"', "") : "";
    if (this.username) {
      this.Pagechange(1);
    }
    
  },
  methods: {
    Pagechange(index) {
      getUserArticle({ token: this.username,page:index }).then((data) => {
        if (data.data.status === 200) {
          // this.lists = [...data.data.message,...data.data.message];    
          this.lists = data.data.message.data
          this.count = data.data.message.count
        }
      });
    },
    changeliked(id) {
      this.lists.forEach((element) => {
        if (element.id == id) {
          element.like_Star += 1;
          PostMessage("/note/notelike", {
            likestar: element.like_Star,
            id: id,
          }).then((res) => {
            if (res.data.err == 0) {
              this.$Message.success(
                "你为这篇文章增加了一个star谢谢你的支持鸭！(●ˇ∀ˇ●)"
              );
            } else {
              this.$Message.error(
                "网络好像有点差劲呢！小主稍后再来咱们不急！(ノへ￣、)"
              );
            }
          });
        }
      });
    },
     Pagechange1(index) {
      // this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在加载文章内容,请稍等...'})
      PageSizeChange("/page/getUserArticle", { page: index }).then(res => {
        if (res.data.err == 0) {
          this.count = res.data.message.count;
          this.lists = res.data.message.data;
        } else {
          this.$Message.error("网络出错了,(ノへ￣、)！");
        }
        // this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
      });
    },
    deleteArt(id){
      deleteArticle({article_id:id})
      .then(res=>{

      })
    }
  },
};
</script>
<style lang="scss" scoped>
.myArticle {
  min-height: 100vh;
  .no-login {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-article {
    margin: 1rem auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
     .article-box {
    background: #fff;
    border-radius: 5px;
    // margin: 2rem 0;
    .article-category {
      line-height: 20px;
      font-size: 15px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-bottom: 1.5px solid lightseagreen;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .article-num {
        display: inline-block;
        float: right;
        color: #333;
        span {
          color: orange;
          font-size: 20px;
        }
      }
    }
    .card-left {
      border: 1px solid #ccc;
      border-top: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .page {
        text-align: right;
        margin: 1rem;
      }
    }
  }
  }
}
</style>
