<template>
  <el-form ref="form" :model="registerData" :rules="registerRules">
    <el-form-item label="" prop="username">
      <el-input
        v-model="registerData.username"
        prefix-icon="el-icon-user"
      ></el-input>
    </el-form-item>
    <el-form-item label="" prop="password">
      <el-input
        type="password"
        v-model="registerData.password"
        prefix-icon="el-icon-lock"
      ></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-row :gutter="10">
        <el-col :span="17">
          <el-input
            v-model="registerData.captcha"
            prefix-icon="el-icon-view"
          ></el-input>
        </el-col>
        <el-col :span="7" id="col-captcha">
          <div
            v-html="codeUrl"
            class="captcha"
            ref="captchaImage"
            @click="undateCaptcha"
          ></div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { registerUser, getImageCode } from "../../api/index";
@Component({
  name: "NormalRegister",
  components: {},
})
export default class NormalRegister extends Vue {
  private registerData = {
    username: "",
    password: "",
    captcha: "",
    registerType: "normal",
  };
  private validateName = (rule: any, value: string, callback: any) => {
    const reg = /^[a-zA-Z0-9]{6,}$/;
    if (value === "") {
      callback(new Error("请输入用户名"));
    } else if (!reg.test(value)) {
      callback(new Error("用户名为字母和数字且至少6位"));
    } else {
      callback();
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
  private registerRules = {
    username: [{ validator: this.validateName, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
    captcha: [{ validator: this.validateCaptcha, trigger: "blur" }],
  };
  private codeUrl: string = "";
  mounted() {
    getImageCode("1").then((res: any) => {
      res.status === 200
        ? (this.codeUrl = res.data)
        : (this as any).$Message.error("验证码获取失败");
    });
  }
  @Ref() readonly form!: ElForm;
  private onSubmit() {
    this.form.validate((flag: any) => {
      if (flag) {
        registerUser(this.registerData)
          .then((response: any) => {
            console.log(response);
            if (response.data.status === 200) {
              (this as any).$Message.success(response.data.message);
              this.form.resetFields();

              this.$router.push("/login");
            } else {
              (this as any).$Message.error(response.data.message);
              this.form.resetFields();

              this.undateCaptcha();
            }
          })
          .catch((err: any) => {
            (this as any).$Message.error(err.message);
            this.form.resetFields();

            this.undateCaptcha();
          });
      } else {
        this.form.resetFields();

        (this as any).$Message.error("数据格式不正确");
      }
    });
  }
  @Ref() readonly captchaImage!: HTMLImageElement;
  private undateCaptcha() {
    getImageCode(Math.random()).then((res: any) => {
      res.status === 200
        ? (this.codeUrl = res.data)
        : (this as any).$Message.error("验证码获取失败");
    });
  }
  public resetForm() {
    this.form.resetFields();
  }
}
</script>
<style lang="scss" scoped>
.captcha {
  width: 100%;
  height: 40px;
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.el-col {
  padding: 0;
}
.el-button {
  width: 100%;
}
</style>
