import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { getnotedetail } from '@/components/NetWork/request'

import articlePublish from "../views/artConfig/articlePublish.vue"
import MyArticle from "../views/MyArticle.vue"
import Article from "../components/HomeComponents/Card.vue"
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
  },
  {
    path: "/article",
    name: "article",
    component: Article
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Center.vue")
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
    {
    path:'/admin/login',
    name:'adminlogin',
    component:() => import ('../admin/adminLogin.vue')
  },
  {
    path: '/admin/article',
    name: 'admin',
    component: () => import('../admin/articleEditor.vue'),
    children: [
     
      {
        path: '/admin/article/upload/articleManage',
        name: 'articleManage',
        component: () => import('../admin/articleManage.vue')
      },
      {
        path: '/admin/article/upload/users',
        name: 'UserManage',
        component: () => import('../admin/UserManage.vue')
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
/* 管理系统守卫 */
router.beforeEach((to,from,next) => {
  if(to.path.includes("/admin/article")) {
    getnotedetail('/user/adminIslogined').then((res:any) => {
      if(res.data.err === 0) {
        next()
      } else {
        router.push({ name: 'adminlogin'})
      }
    })
  }
  next()
})
// 以登陆状态
router.beforeEach((to, from, next) => {
  if(to.path.includes("/admin/login")) {
    getnotedetail('/user/adminIslogined').then((res:any) => {
      if(res.data.err === 0) {
        router.push({ name:'admin'})
      } else {
        router.push({ name: 'adminlogin'})
      }
    })
  }
  next()
})
export default router;
