<template>
  <nav class="bg-white border-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <NuxtLink to="/todo" class="flex items-center">
        <img src="../public/logo/logo.png" class="h-8 mr-3" alt="Logo" />
        <span class="self-center text-2xl font-light">Simple Apps</span>
      </NuxtLink>
      <div class="w-full block w-auto" id="navbar-default">
        <ul class="font-light flex flex-row p-4 p-0 mt-4 border">
          <li>
            <NuxtLink to="/todo" class="text-gray-900 hover:text-gray-500"
              >Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/todo" class="hover:text-gray-500">Login </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
