<template>
  <div class="register_container">
    <div class="register_box">
      <p>欢迎注册</p>
      <el-tabs
        class="el-tabs"
        value="first"
        @tab-click="handleClick"
        style="width: 328px"
      >
        <el-tab-pane label="用户名注册" name="first">
          <NormalRegister ref="normalForm"></NormalRegister>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="second">
          <EmailRegister ref="emailForm"></EmailRegister>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import NormalRegister from "../components/register/NormalRegister.vue";
import EmailRegister from "../components/register/EmailRegister.vue";
@Component({
  name: "Register",
  components: {
    NormalRegister,
    EmailRegister,
  },
})
export default class Register extends Vue {
  @Ref() readonly normalForm!: NormalRegister;
  @Ref() readonly emailForm!: EmailRegister;
  private handleClick() {
    console.log("111");
    this.normalForm.resetForm();
    this.emailForm.resetForm();
  }
}
</script>
<style lang="scss" scoped>
.register_container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url("../assets/images/bg4.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .register_box {
    width: 35%;
    // height: 45%;
    min-height: 430px;
    min-width: 350px;
    background: #f7f7f7;
    opacity: 0.8;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    p {
      margin: 25px 0 25px 0;
      font-weight: bold;
      font-size: 17px;
    }
    // .el-form{
    //     width: 60%;
    // }
  }
}
</style>
