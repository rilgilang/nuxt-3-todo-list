import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: { id: 0, username: "" } }),
  actions: {
    saveToken(tokenSource, user_id, username) {
      const parsedToken = JSON.parse(atob(tokenSource.split(".")[1]));

      const tokenExp = dayjs(new Date(parsedToken.exp * 1000)); //TODO find better way to use dayjs instead new Date

      const token = useCookie("token", {
        maxAge: tokenExp.diff(dayjs(), "second"),
      });

      token.value = tokenSource;
      this.user.id = user_id;
      this.user.username = username;
    },
    getToken() {
      return useCookie("token").value;
    },
    removeStateAndCookie() {
      this.user.id = null;
      this.user.username = null;
    },
  },
});
