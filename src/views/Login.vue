<template>
  <div class="login_container">
    <div class="login_box">
      <p class="login-title">欢迎来到programming</p>
      <el-form ref="form" :model="loginData" :rules="loginRules">
        <el-form-item label="" prop="username">
          <el-input
            v-model="loginData.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            v-model="loginData.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="10">
            <el-col :span="17">
              <el-input
                v-model="loginData.captcha"
                prefix-icon="el-icon-view"
              ></el-input>
            </el-col>
            <el-col :span="7" id="col-captcha">
              <div v-html="codeUrl"
                class="captcha"
                ref="captchaImage"
                @click="undateCaptcha"
              >
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="auth_box">
        <ul>
          <li class="iconfont icon-github">
            <a href="http://127.0.0.1:3000/github"></a>
          </li>
          <li class="iconfont icon-weixin" style="color: green"></li>
        </ul>
      </div>
      <p class="to-register" @click="toRegister">还没有账号，去注册</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { loginUser,getImageCode } from "../api/index";
@Component({
  name: "Login",
  components: {},
})
export default class Login extends Vue {
  private loginData = {
    username: "tanwenchao",
    email: "",
    password: "tanwenchao1",
    captcha: "",
    registerType: "",
  };
  private codeUrl:string = ""
  mounted(){
    getImageCode('').then((res:any)=>{
      res.status=== 200 ? this.codeUrl = res.data:(this as any).$Message.error("验证码获取失败");
    })
  }
  private validateName = (rule: any, value: string, callback: any) => {
    const normalReg = /^[A-Za-z0-9.]{6,20}$/;
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (value === "") {
      callback(new Error("请输入用户名"));
    } else if (emailReg.test(value)) {
      this.loginData.email = this.loginData.username;
      // this.loginData.username = "";
      this.loginData.registerType = "email";
      callback();
    } else if (normalReg.test(value)) {
      this.loginData.registerType = "normal";
      callback();
    } else {
      callback("用户名不符合格式");
    }
  };
  private validatePassword = (rule: any, value: string, callback: any) => {
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9.]{8,20}$/;
    if (value === "") {
      callback(new Error("请输入密码"));
    } else if (value.length < 8) {
      callback(new Error("密码至少是8位"));
    } else if (!reg.test(value)) {
      callback(new Error("密码需包括字母和数字且不能包括特殊字符"));
    } else {
      callback();
    }
  };
  private validateCaptcha = (rule: any, value: string, callback: any) => {
    const reg = /^[a-zA-Z0-9]{4}$/;
    if (value === "") {
      callback(new Error("请输入验证码"));
    } else if (!reg.test(value)) {
      callback(new Error("验证码错误"));
    } else {
      callback();
    }
  };
  private loginRules = {
    username: [{ validator: this.validateName, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
    captcha: [{ validator: this.validateCaptcha, trigger: "blur" }],
  };
  @Ref() readonly form!: ElForm;
  private onSubmit() {
    this.form.validate((flag: any) => {
      if (flag) {
        loginUser(this.loginData)
          .then((response: any) => {
            console.log(response);
            if (response.data.status === 200) {
              (this as any).$Message.success('登录成功喽！');
              localStorage.setItem(
                "username",
                JSON.stringify(response.data.token)
              );
              this.$router.push("/article");
            } else {
              (this as any).$Message.error(response.data.message);
              this.undateCaptcha();
            }
          })
          .catch((err: any) => {
            console.log(err.message);
            (this as any).$Message.error(err.message);
            this.undateCaptcha();
          });
      } else {
        (this as any).$Message.error("数据格式不正确");
      }
    });
  }
  @Ref() readonly captchaImage!: HTMLImageElement;
  private undateCaptcha() {
    getImageCode(Math.random()).then((res:any)=>{
      res.status=== 200 ? this.codeUrl = res.data:(this as any).$Message.error("验证码获取失败");
    })
  }
  private toRegister(){
      this.$router.push('/register')
  }
}
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/images/bg4.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 35%;
    // height: 58%;
    // min-height: 430px;
    min-width: 350px;
    background: #f7f7f7;
    opacity: 0.8;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .login-title {
      margin: 25px 0 25px 0;
      font-weight: bold;
      font-size: 17px;
    }
    .el-button {
      width: 100%;
    }
    .captcha {
      width: 100%;
      height: 40px;
    }
    .to-register{
        color: skyblue;
        margin: 20px 0 30px;
    }
    .auth_box {
      ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          font-size: 30px;
          margin-right: 20px;
          position: relative;
          a {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
}
</style>
