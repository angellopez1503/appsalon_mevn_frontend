<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const authRoutes = [
  { name: 'register', text: 'Crear una cuenta' },
  { name: 'login', text: 'Iniciar sesion' }
]

const route = useRoute()
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-20">
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-end lg:space-y-0"
    >
      <RouterLink
        v-for="authRoute in authRoutes"
        :key="authRoute.name"
        class="uppercase font-bold text-white"
        :to="{ name: authRoute.name }"
      >
        <div v-if="route.name!==authRoute.name && route.name!=='confirm-account'">
          {{ authRoute.text }}
        </div>
      </RouterLink>
    </nav>
    <RouterView />
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:space-y-0"
      :class="route.name === 'confirm-account' ? 'lg:justify-between' : 'lg:justify-end'"
      v-if="route.name==='confirm-account'"
    >
      <RouterLink
        v-for="authRoute in authRoutes"
        :key="authRoute.name"
        class="uppercase font-bold text-white"
        :to="{ name: authRoute.name }"
      >
        <div v-if="route.name!==authRoute.name">
          {{ authRoute.text }}
        </div>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped></style>
