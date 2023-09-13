import { useAuthStore } from "~/store/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();

  const token = useCookie("token").value;

  if (token) {
    // check if value exists
    const parsedToken = JSON.parse(atob(token.split(".")[1]));

    store.saveToken(token, parsedToken.id, parsedToken.username);
  }

  // if token exists and url is /login redirect to homepage
  if (token && (to?.name === "login" || to?.name === "register")) {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!token && to?.name == "todo") {
    abortNavigation();
    return navigateTo("/login");
  }
});
