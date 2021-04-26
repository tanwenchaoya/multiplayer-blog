<template>
  <div id="index" :class="{ adminCssStyle: $route.path.includes('admin') }">
    <div class="moon" v-if="!$route.path.includes('admin')&&!$route.path.includes('login')"></div>
    <Header
      v-if="!$route.path.includes('article1')&&!$route.path.includes('home')"
      @click="changeBG"
      class="header active"
    />
    <keep-alive exclude="detail,profile,article,home,articlePublish,myArticle">
      <router-view :class="{ router_content: $route.name !== 'home'&&!$route.path.includes('login') }" />
    </keep-alive>
    <Loading class="LoadingStyle" v-show="LoadingShow" />
    <Tab-contorle />
    <Footer 
    v-if="!$route.path.includes('artConfig')
    &&!$route.path.includes('login')
    &&!$route.path.includes('register')
    &&!$route.path.includes('message')
     &&!$route.path.includes('category')
    " 
    
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import TabContorle from "../components/Tabcontorle.vue";
import light from "../components/highlight/light.vue";
import Loading from "../components/Loading/Loading.vue";
import {State,Mutation,namespace} from 'vuex-class'
const blogModule = namespace('blog')
@Component({
  name: "index",
  components: {
    Header,
    TabContorle,
    Footer,
    light,
    Loading,
  },
  mounted() {
    document.onclick = (e:MouseEvent) => {
      console.log(123123)
      const target = e.target as HTMLElement
      if(target.className=='meun iconfont icon-caidan') {
        this.$store.dispatch('blog/updateShow',{isShow:true});
      }else if(
        target.className=='MeunTab' || 
       target.tagName.toLowerCase()=='img' || 
        target.className=='ivu-list-item' || 
        target.className == 'profile'
        ) {
        return
      } else {
        this.$store.dispatch('blog/updateShow',{isShow:false});

      }
    }
  }
})
export default class Index extends Vue {
  @blogModule.State('fontColor') public fontColor!:string
  @blogModule.State('LoadingShow') public LoadingShow!:string
  @blogModule.Mutation('updateShow') public updateShow!:Function
  public changeBG():void {
    this.$store.commit("updatefont", !this.$store.state.fontColor);
  }
  get TypeChange() {
    return this.fontColor;
  }
   
}
</script>

<style lang="scss">
* {
  list-style: none;
}
body,
html {
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
#index {
  // height: 100%;
  display: flex;
  flex-direction: column;
  .moon,
  .night {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .night {
    background: url("../assets/images/night.gif") center;
  }
  .moon {
    // background: #7a7374;
    background: url("../assets/images/bg4.jpg") center;
    background-size: 100% 100%;
    background-position: 0 -20px;
    opacity: 0.7;
  }
  .router_content {
    animation: animate 2s;
    position: relative;
    top: 40px;
  }
  .header {
    width: 100%;
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    transition: all 0.6s;
    background: linear-gradient(#11659a,#5698c3);

  }
  .active,
  .current {
    // position: sticky;
    // background: linear-gradient(#11659a,#5698c3);
    // animation: animate 1s;
  }
  @keyframes animate {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .LoadingStyle {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
  }
}
.adminCssStyle {
  background: #fff !important;
}
</style>
