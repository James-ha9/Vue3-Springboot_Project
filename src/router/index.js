import { createRouter, createWebHistory } from "vue-router";
import charitableProjectsRoutes from "./charitableProjects";
import communityRoutes from "./community";
import informationRoutes from "./information";
import aboutUsRoutes from "./aboutUs";
import personalCenterRoutes from "./personalCenter";
import VerifyEmail from '@/views/auth/VerifyEmail.vue';

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/signIn",
    name: "signIn",
    component: () => import("@/components/signIn/signIn.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login/login.vue"),
  },
  {
    path: "/main", // 主页面的路径
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      // {
      //   path: "",
      //   name: "home",
      //   component: () =>
      //     import("@/views/home/index.vue"),
      // },
      {
        path: "",
        component: () => import("@/views/charitableProjects/components/PlatformCharity.vue"),
      },
      {
        path: "charitable-projects",
        name: "charitable-projects",
        component: () => import("@/views/charitableProjects/index.vue"),
        children: charitableProjectsRoutes,
        redirect: { name: "platform-charity" },
      },
      {
        path: "community",
        name: "community",
        component: () => import("@/views/community/index.vue"),
        children: communityRoutes,
        redirect: { name: "forum" },
      },
      {
        path: "information",
        name: "information",
        component: () => import("@/views/Information/index.vue"),
        children: informationRoutes,
        redirect: { name: "activity-news" },
      },
      {
        path: "about-us",
        name: "about-us",
        component: () => import("@/views/aboutUs/index.vue"),
        children: aboutUsRoutes,
        redirect: { name: "foundation-introduction" },
      },
    ],
  },
  {
    path: "/personal-center",
    component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: "",
        name: "personal-center",
        component: () => import("@/views/personalCenter/index.vue"),
        children: personalCenterRoutes,
        redirect: { name: "personal-data" },
      },
    ],
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: VerifyEmail
  },
  {
    path: ""
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的滚动位置，使用它 (例如浏览器后退操作)
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否则滚动到页面顶部
      return { top: 0 };
    }
  },
});

export default router;
