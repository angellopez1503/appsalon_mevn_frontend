<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue';
import AuthAPI from '@/api/AuthAPI';

const userStore = useUserStore()
const router = useRouter()

// onMounted(async()=>{
//   try {
//          await AuthAPI.auth()
        
//       } catch (error) {
//         console.log(error)
//          router.replace({ name: 'login' })
//       }
// })

const logout = () => {
  userStore.logout()
  router.replace({name:'login'})

}

</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">App Salon</h1>
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center">
        <p class="text-white text-right">Hola: {{ userStore.getUserName }}</p>
        <button
          @click="logout"
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
        >
          Cerrar sesion
        </button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <RouterLink
          :to="{ name: 'my-appointments' }"
          class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
          >Mis Citas</RouterLink
        >
        <RouterLink
          :to="{ name: 'appointment-new' }"
          class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700"
        >
          Nueva Cita
        </RouterLink>
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
