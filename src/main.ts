import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/iview.ts";
import "./plugins/element.ts";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont2/iconfont.css";
import "./assets/iconfont3/iconfont.css";
import "./assets/iconfont4/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont5/iconfont.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
