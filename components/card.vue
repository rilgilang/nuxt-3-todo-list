<template>
  <div class="border p-4 rounded bg-gray-100 flex items-center justify-between">
    <div class="flex flex-col">
      <p :class="todo.status ? 'line-through' : null">{{ todo.title }}</p>
      <span class="text-sm text-gray-400"
        >created at : {{ dayjs(todo.created_at).format("DD MMM YYYY") }}</span
      >
    </div>
    <div>
      <button
        @click="changeStatus()"
        class="bg-transparent hover:bg-teal-500 text-teal-700 font-light hover:text-white p-1 border border-teal-500 hover:border-transparent rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </button>
      <button
        class="bg-transparent hover:bg-rose-500 text-rose-700 font-light hover:text-white p-1 border border-rose-500 hover:border-transparent rounded-full ml-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
import dayjs from "dayjs";
const props = defineProps(["todo"]);
const { todo } = props;

import { useAuthStore } from "~/store/auth.store";
const store = useAuthStore();
const token = store.getToken();

const emit = defineEmits(["update", "delete"]);

async function changeStatus() {
  const {} = await useFetch(`${config.public.apiBase}/api/todo`, {
    method: "PUT",
    body: {
      id: todo.id,
      status: !todo.status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onResponse({ request, response, options }) {
      if (response.status == 200) {
        emit("update");
      }
    },
  });
}
</script>

<style></style>
