import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.ts";

const routes = [
  {
    path: "/",
    name: "主页",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/callback",
    name: "回调",
    component: () => import("../pages/Callback.vue"),
    props: (route) => ({ code: route.query.code, state: route.query.state }),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "仪表板",
    component: () => import("../pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/community",
    name: "社区",
    component: () => import("../pages/community/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/resources",
    name: "资源",
    component: () => import("../pages/Resources.vue"),
  },
  {
    path: "/about",
    name: "关于",
    component: () => import("../pages/About.vue"),
  },
  {
    path: "/privacy",
    name: "隐私政策",
    component: () => import("../pages/Privacy.vue"),
  },
  {
    path: "/terms",
    name: "服务条款",
    component: () => import("../pages/Terms.vue"),
  },
  {
    path: "/help",
    name: "帮助",
    component: () => import("../pages/Help.vue"),
  },
  {
    path: '/community/post/:id',
    name: 'post-detail',
    component: () => import('../pages/community/PostDetail.vue'),
    meta: { requiresAuth: false },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 尝试从 localStorage 恢复用户状态
  if (!userStore.isAuthenticated) {
    userStore.restoreUser()
  }

  // 需要认证的路由
  if (to.meta.requiresAuth) {
    if (!userStore.isAuthenticated) {
      // 保存目标路径，登录后跳转回来
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
