<template>
  <div v-show="$route.path !== '/home'" id="Footer">
    <div class="talk">
       <p>&copy; tanwenchao 版权所有.</a></p>
       <p><img src="../assets/images/beianicon.png" alt=""></p>
    </div>
  </div>
</template>
<script lang = "ts">
import {Vue} from 'vue-property-decorator'
  export default class Down extends Vue{
    Text: string = ''
  }
</script>
<style lang="scss" scoped>
#Footer {
  background: linear-gradient(#11659a,#5698c3);
  padding: 2rem 0;
  width: 100vw;
  margin-top: 2rem;
  .talk {
    margin:0 1rem;
    color: #f2f2f2;
    font-size: 11px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img.wx{
      width: 5rem;
      margin-right: 1rem;
    }
    p {
      img {
        margin-left: 1rem;
      }
    }
    a {
      color: #f2f2f2;
    }
  }
}
</style>