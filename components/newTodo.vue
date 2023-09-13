<template>
  <form @submit.prevent="onSubmit" class="flex justify-between font-light">
    <input
      class="bg-transparent text-gray-700 py-2 px-4 border rounded flex-1 w-64 mr-5"
      placeholder="Your todo"
      v-model="formData.title"
      :disabled="isLoading ? true : false"
      :class="isError ? 'border-red-500' : 'border-gray-500'"
    />
    <button
      class="bg-transparent hover:bg-gray-300 text-gray-700 hover:text-white py-2 px-4 border border-gray-500 rounded"
    >
      Add New
    </button>
  </form>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.store";
const store = useAuthStore();
const token = store.getToken();

const formData = reactive({
  title: "",
});

const emit = defineEmits(["created"]);

const isLoading = ref(false);
const isError = ref(false);

const onSubmit = async () => {
  isError.value = false;
  isLoading.value = true;
  const { data } = await useFetch("http://localhost:3002/api/todo", {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      title: formData.title,
    },
    onRequest() {
      isLoading.value = !isLoading.value;
    },
    onResponse({ request, response, options }) {
      if (response.status == 400) {
        isError.value = true;
      }

      formData.title = "";

      //emit
      emit("created");
    },
  });
};
</script>

<style></style>
