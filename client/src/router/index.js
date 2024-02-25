import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/auth/signin/Signin.vue"),
    /*children: [
      {
        path: "/name_info",
        component: () => import("../views/auth/signin/SigninNameInfo.vue"),
      },
    ],*/
  },
  {
    path: "/name_info",
    name: "nameInfo",
    component: () => import("../views/auth/signin/SigninNameInfo.vue"),
  },
  {
    path: "/user/:slug",
    name: "User",
    component: () => import("../views/user/User.vue"),
  },
  {
    path: "/company/:slug",
    name: "Company",
    component: () => import("../views/Company.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import("../views/Job/Jobs.vue"),
  },
  {
    path: "/job/:id",
    name: "Job",
    component: () => import("../views/Job/JobDetail.vue"),
  },
  {
    path: "/saved-jobs",
    name: "SavedJobs",
    component: () => import("../views/Job/SavedJobs.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("../views/Notifications.vue"),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
