// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  app: {
    head: {
      title: "Simple Todo List App",
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3002",
    },
  },
});
