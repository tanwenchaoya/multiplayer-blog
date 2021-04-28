<template>
  <div class="myinfo">
      <!-- 个人介绍结束 -->
    <p class="title"><Icon type="ios-contacts-outline" /> My Makefirend:</p>
      <Tabs class="tabs" value="name1"> 
        <TabPane label="友情链接" name="name1">
        <Icon type="md-laptop" /> <a href="https://github.com/tanwenchaoya">tanwenchao's github</a>
        <br/>
        <Icon type="md-laptop" /> <a href="https://www.jianshu.com/u/86c6cd3f6ee0">tanwenchao's jianshu</a>
        </TabPane>
        <TabPane label="联系方式" name="name2">
          <br>
          大家一起来讨论哦
          <br>
          今天也不要忘记写博客哦！！！
        </TabPane>
      </Tabs>
  </div>
</template>

<script>

  export default {
    name:'myinfo',
  }

</script>
<style lang="scss" scoped>
.myinfo {
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
  .title {
    background: #fff;
    line-height:20px;
    padding:0.5rem;
    border-bottom:1.5px solid lightseagreen;
    font-size: 14px;
  }
  .tabs {
    padding: .5rem .8rem;
    position: relative;
    z-index: 5;
    background: #fff;
    color: #333;
    .ivu-tabs-tabpane {
      font-size: 13px;
    }
    a {
      color: #333;
    }
    a:hover {
      color: orange;
    }
  }
}
</style>