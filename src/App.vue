<template>
  <div id="app">
    <Index/>
  </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import Index from './views/index.vue'
@Component({
  components:{
    Index
  }
})
export default class App extends Vue{

}
</script>
<style lang="scss">
body,html {
      width: 100%;
  height: 100%;
    }
#app{
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media screen and (max-width:1200px) {
    body,html {
      font-size:15px ;
    }
}
@media screen and (max-width:992px) {
    body,html {
      font-size:14px ;
    }
}
@media screen and (max-width:768px) {
    body,html {
      font-size:13px ;
    }
}
@media screen and (max-width:576px) {
    body,html {
      font-size:12px ;
    }
}
@media screen and (max-width:400px) {
    body,html {
      font-size:11px ;
    }
}
</style>
