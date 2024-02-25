import store from "../index";
import router from "../../router";
import appAxios from "../../utils/appAxios";

export default {
  namespaced: true,
  state: {
    user: null,
    access_token: null,
    registerData: null,
  },
  mutations: {
    logout(state) {
      appAxios
        .get("/auth/logout")
        .then((res) => {
          localStorage.lastUserName = state?.user?.full_name;
          state.user = null;
          state.access_token = null;
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          router.push("/signin");
        })
        .catch((err) => {
          localStorage.lastUserName = state?.user?.full_name;
          state.user = null;
          state.access_token = null;
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          router.push("/signin");
        });
    },
  },
  actions: {
  },
  modules: {},
  getters: {
  },
};
