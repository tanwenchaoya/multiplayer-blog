import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    redirect: "/article",
  },
  {
    path: "/article",
    name: "card",
    component: () => import("../components/HomeComponents/Card.vue"),
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
    path: "/admin/articlePublish",
    component: () => import("../views/admin/articlePublish.vue"),
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
    component: () => import("../views/MyArticle.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
