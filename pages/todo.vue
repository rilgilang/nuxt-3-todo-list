<template>
  <div class="grid grid-cols-1 gap-4 pt-8 px-5">
    <NewTodo @created="refresh()" />
    <div v-for="t in todos.data">
      <!-- <Card :todo="t" :key="t.id" @update="updateTodo" /> -->
      <div
        class="border p-4 rounded bg-gray-100 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <p :class="t.status ? 'line-through' : null">{{ t.title }}</p>
          <span class="text-sm text-gray-400"
            >created at : {{ dayjs(t.created_at).format("DD MMM YYYY") }}</span
          >
        </div>
        <div>
          <button
            @click="changeStatus(t.id, t.status)"
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
            @click="deleteTodo(t.id)"
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
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
import dayjs from "dayjs";
import { useAuthStore } from "~/store/auth.store";
const store = useAuthStore();
const token = store.getToken();

definePageMeta({
  layout: "navbar",
  middleware: "auth",
});

const { data: todos, refresh } = await useFetch(
  `${config.public.apiBase}/api/todos`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

async function changeStatus(id, status) {
  const {} = await useFetch(`${config.public.apiBase}/api/todo`, {
    method: "PUT",
    body: {
      id: id,
      status: !status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onResponse({ request, response, options }) {
      if (response.status == 200) {
        refresh();
      }
    },
  });
}

async function deleteTodo(id) {
  const {} = await useFetch(`${config.public.apiBase}/api/todo`, {
    method: "DELETE",
    body: {
      id: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onResponse({ request, response, options }) {
      if (response.status == 200) {
        refresh();
      }
    },
  });
}
</script>

<style></style>
