<template>
  <div class="adminLogin">
    <div :class="{rightpanelactive: isTransform}" class="container" id="container">
      <div class="form-container sign-in-container">
        <!-- 登陆 -->
        <form action="javascript:;">
          <h1>
            <i class="iconfont icon-denglu"></i> 后台管理系统登陆:
          </h1>
          <input v-model="user" type="text" placeholder="用户名" />
          <input v-model="pass" type="password" placeholder="密码" />
          <a href="#">忘记密码？</a>
          <button @click="handelLogin">登陆</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { PostMessage } from "../components/NetWork/request";
export default {
  name: "adminlogin",
  data() {
    return {
      isTransform: false,
      user: "",
      pass: "",
    };
  },
  methods: {
    adminSignUp() {
      this.isTransform = true;
    },
    adminSignIn() {
      this.isTransform = false;
    },
    handelLogin() {
      if (!this.pass && this.user) {
        this.$Message.error("请填写完整的信息!");
      } else {
        PostMessage("/user/adminUserCheck", {
          username: this.user,
          password: this.pass,
        }).then((res) => {
          if (res.data.err === 0) {
            this.$router.replace("/admin/article/upload/articleManage/");
            this.$Message.success(res.data.message);
          } else if (res.data.err === -998) {
            this.$Message.error(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1 {
  margin: 0.2rem;
  font-size: 1.2rem;
}
h1 i {
  font-size: 1.2rem;
}
p {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 100;
  margin: 1.2rem 0;
  letter-spacing: 0.1rem;
}
span {
  font-size: 0.8rem;
  margin: 1.2rem 0;
}
a {
  color: #333;
  font-size: 1rem;
  text-decoration: none;
}
.container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.6rem;
  width: 30rem;
  height: 30rem;
  overflow: hidden;
  max-width: 100vw;
  min-height: 70vh;
  /* float: right; */
  margin: 4rem 0;
  opacity: 0.7;
  z-index: 9;
}
.form-container {
  width: 90%;
}
.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  height: 100%;
  width: 90%;
  justify-content: center;
  align-items: center;
}
.social-container {
  margin: 0.6rem 0;
}
.social-container a {
  border: 1px solid #eee;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 1.8rem;
  width: 1.8rem;
}
.social-container a:hover {
  opacity: 0.8;
}
.form-container input {
  width: 100%;
  height: 2.2rem;
  text-indent: 1rem;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  border-top: none;
  outline: none;
  margin: 0.6rem 0;
}
.form-container button:active {
  transform: scale(0.95, 0.95);
}
.form-container button {
  padding: 0.4rem 1rem;
  background: #417dff;
  color: white;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  font-size: 0.6rem;
  padding: 0.5rem 0;
}
button.ghost {
  background: transparent;
  border-color: #fff;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  padding: 0.5rem 0;
  color: white;
  font-size: 0.6rem;
}
button#send_code {
  width: 100%;
}
button.ghost:active {
  transform: scale(0.95, 0.95);
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in;
}
</style>