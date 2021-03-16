<template>
  <div class="publish">
    <div v-if="!username" style="text-align:center;padding-top:8rem;">
              糟糕，您还没有登陆检测不到信息! ~§(*￣▽￣*)§~
            </div>
    <div class="container" v-else>
      <h2><i class="iconfont icon-wenzhang"></i> 文章内容编辑与发表</h2>
      <p><i class="iconfont icon-lianjie"></i> 文章标题:</p>
      <Input
        v-model="articleDate.title"
        style="width:100%"
        placeholder="请输入文章标题..."
      />
      <p>
        <img
          v-show="articleDate.src"
          :src="articleDate.src"
          alt="笔记中的图片"
        />
      </p>
      <Upload :action="articleImageUpload" :on-success="handleSuccess"
        ><!-- codelei.cn/api为你的后台地址 -->
        <Button icon="ios-cloud-upload-outline">选择文章封面图片</Button>
      </Upload>
      <p><i class="iconfont icon-lianjie"></i> 文章简介:</p>
      <Input
        v-model="articleDate.brief"
        style="width:100%"
        type="textarea"
        :rows="4"
        placeholder="请输入文章简介..."
      />
      <p><i class="iconfont icon-lianjie"></i> 文章主体内容:</p>
      <!-- <Input v-model="articleDate.content" style="width:80%" type="textarea" :rows="16" placeholder="请输入文章主体内容..." /> -->
      <mavon-editor
        v-model="articleDate.content"
        ref="md"
        @change="change"
        style="min-height: 600px"
      />
      <p><i class="iconfont icon-lianjie"></i> 文章标签:</p>
      <Input
        v-model="articleDate.lable"
        style="width:200px"
        placeholder="文章标签"
      />
      <p><i class="iconfont icon-lianjie"></i> 文章分类:</p>
      <Input
        v-model="articleDate.categroy"
        style="width:200px"
        placeholder="文章分类"
      />
      <div class="event-Button">
        <Button @click.native="handelPublish" type="primary">发表</Button>
        <Button type="default">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { PostMessage } from "@/components/NetWork/request";
export default {
  name: "articlePublish",
  components: {
    mavonEditor,
  },
  data() {
    return {
      articleDate: {
        src: "",
        title: "",
        brief: "",
        content: "",
        lable: "",
        categroy: "",
      },
      username:''
    };
  },
  mounted(){
    this.username = localStorage.getItem('username');
  },
  computed: {
    articleImageUpload() {
      console.log(this.$store.state.blog.baseURL);
      return `${this.$store.state.blog.baseURL}/upload/imageUpload`;
    },
  },
  methods: {
    handleSuccess(res) {
      this.articleDate.src = res.url;
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.content = render;
    },
    handelPublish() {
      if (
        !this.articleDate.src ||
        !this.articleDate.content ||
        !this.articleDate.title ||
        !this.articleDate.brief ||
        !this.articleDate.categroy ||
        !this.articleDate.lable
      )
        return this.$Message.error("请输入完整的文章信息!");
      const obj = this.articleDate;
      let username = localStorage.getItem('username');
      username=username?username.replaceAll('"',''):'';
      obj.username = username
      const path = this.articleDate.lable + Math.floor(Math.random() * 2000000);
      obj.articlePath = path;
      PostMessage("/note/articlePublish", obj).then((res) => {
        if (res.data.err == 0) {
          this.$router.push("/article");
          this.$Message.success(res.data.message);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.publish {
  margin: 20px auto;
  width: 90%;
  padding-bottom: 30px;
  .container {
    // position: relative;
    // z-index: 99;
    img {
      width: 400px;
      height: 300px;
    }
    p {
      color: #333;
      font-weight: bold;
      margin: 1rem 0;
    }
    .event-Button {
      margin-top: 1rem;
      button {
        margin-right: 1rem;
      }
    }
  }
}
</style>
