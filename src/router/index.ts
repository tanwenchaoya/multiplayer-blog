import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import articlePublish from "../views/artConfig/articlePublish.vue"
import MyArticle from "../views/MyArticle.vue"
import Article from "../components/HomeComponents/Card.vue"
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    redirect: "/article",
  },
  {
    path: "/article",
    name: "article",
    component: Article
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/artConfig/articlePublish",
    name:"articlePublish",
    component: articlePublish
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("../components/HomeComponents/detail.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/myArticle",
    name: "myArticle",
    component: MyArticle
  },
    {
    path:'/message',
    name:'message',
    component:() => import('../views/LeaveMessage.vue')
  },
    {
    path:'/category',
    name:'category',
    component:() => import('../views/category.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
