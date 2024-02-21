import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
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
    children: [
      {
        path: "/name_info",
        component: () => import("../views/auth/signin/SigninNameInfo.vue"),
      },
    ],
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
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  let user,
    access_token = null;
  const authenticatedPages = ["Home", "Profile"];
  // Are there any Users on LocalStorage?

  if (localStorage?.user) {
    user = JSON.parse(localStorage?.user);
  }
  if (localStorage?.access_token) {
    access_token = localStorage?.access_token;
  }

  // If there is a User on LocalStorage, update the Store
  if (user && access_token) {
    store.commit("users/setUser", user);
    store.commit("users/setAccessToken", access_token);
  }
  // Get isAuthenticated information from Store..
  const isAuth = store.getters["users/isAuth"];

  // Rules...
  // If he is not logged in and wants to enter the User-related sections... Block and redirect to the Login page.
  if (!isAuth && authenticatedPages.indexOf(to.name) > -1) return next({ name: "Signin" });

  if (isAuth && (to.name === "Signin"))  return next({ name: "Home" });

  next();
});

export default router;
