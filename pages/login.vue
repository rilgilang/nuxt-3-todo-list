<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0"
  >
    <div class="w-full max-w-xs">
      <form
        class="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="onSubmit"
      >
        <div class="mb-4">
          <div class="p-4 text-center font-light">Login to your account</div>
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="falseCredential ? 'border-red-500' : null"
            id="username"
            v-model="formData.username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="falseCredential ? 'border-red-500' : null"
            id="password"
            type="password"
            v-model="formData.password"
            placeholder="******************"
          />
          <p class="text-red-500 text-xs italic">
            {{ falseCredential ? "Username or Password is wrong" : null }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="text-white font-Light py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            :class="isLoading ? 'bg-gray-200' : 'bg-gray-500 hover:bg-gray-700'"
            :disabled="isLoading"
          >
            Sign In
          </button>
          <NuxtLink
            to="/"
            class="inline-block align-baseline font-light text-sm text-gray-500 hover:text-gray-800"
          >
            Get back
          </NuxtLink>
        </div>
        <NuxtLink
          to="/register"
          class="inline-block align-baseline font-light text-sm text-gray-500 hover:text-gray-800 pt-5"
        >
          Create new account
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const formData = reactive({
  username: "",
  password: "",
});

import { useAuthStore } from "~/store/auth.store";
const store = useAuthStore();

const falseCredential = ref(false);
const isLoading = ref(false);

const onSubmit = async () => {
  falseCredential.value = false;
  isLoading.value = true;
  const { data } = await useLazyFetch("http://localhost:3002/api/login", {
    method: "post",
    body: {
      username: formData.username,
      password: formData.password,
    },
    onRequest() {
      isLoading.value = !isLoading.value;
    },
    onResponse({ request, response, options }) {
      if (response.status == 400) {
        falseCredential.value = true;
      }

      store.saveToken(
        response._data.data.token,
        response._data.data.id,
        response._data.data.username
      );
      navigateTo("/todo");
    },
  });
};
</script>

<style></style>
