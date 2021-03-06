<template>
  <div id="Header">
     <Row type="flex">
      <!-- logo介绍 -->
        <Col class="logo" :xl="6" :lg="4" :md="24" :sm="24" :xs="24" order="1">
          <Logo-content></Logo-content>
        </Col>
        <!-- 顶部导航菜单 -->
        <Col v-show="active" class="link_meta" :xl="18" :lg="20" :md="0" :sm="0" :xs="0" order="2">
          <Tabbar-link/>
        </Col>
    </Row>
  </div>
</template>
<script lang="ts">
import{Vue,Component} from 'vue-property-decorator'
import TabbarLink from './HomeComponents/TabberLink.vue'
import LogoContent from './HomeComponents/LogoContent.vue'
@Component({
  components:{
    TabbarLink,LogoContent
  }
})
  export default class Header extends Vue{
    get active() {
      return this.$route.name !== 'home'
    }
  }

</script>