<template>
  <!-- component -->
  <nav
    class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full"
  >
    <div class="mb-2 sm:mb-0 flex flex-row">
      <div class="h-10 w-10 self-center mr-2">
        <img class="h-10 w-10 self-center" src="../public/logo/logo.png" />
      </div>
      <div>
        <NuxtLink
          to="/todo"
          class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold"
          >Todos</NuxtLink
        ><br />
        <span class="text-xs text-grey-dark">A simple todo list app</span>
      </div>
    </div>

    <div class="sm:mb-0 self-center">
      <!-- <div class="h-10" style="display: table-cell, vertical-align: middle;"> -->
      <NuxtLink
        to="/todo"
        class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1"
        >My Todo</NuxtLink
      >
      <!-- <NuxtLink
        to="/todo"
        class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1"
        >Link2</NuxtLink
      > -->
      <!-- <a href="/two" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About Us</a> -->

      <NuxtLink
        v-if="!token"
        to="/login"
        class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1"
        >Login</NuxtLink
      >

      <!-- </div> -->
    </div>
  </nav>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.store";
const token = useAuthStore().getToken();
</script>

<style></style>
