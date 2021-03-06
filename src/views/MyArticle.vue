<template>
  <div class="myArticle">
    <div v-if="!username" class="no-login">
      糟糕，您还没有登陆检测不到信息! ~§(*￣▽￣*)§~
    </div>
    <div v-if="username" class="SuccessInfo">123123</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "myArticle",
})
export default class MyArticle extends Vue {
    private username:string|null  ='';
    mounted(){
        this.username = localStorage.getItem('username');
    }

}
</script>
<style lang="scss" scoped>
.myArticle{
    height: 100%;
    .no-login{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
