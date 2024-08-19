<script setup>
import { useServiceStore } from '@/stores/service'
import ServiceItem from '@/components/ServiceItem.vue';

const servicestore = useServiceStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Servicios</h2>
  <p class="text-white text-lg mt-5">
    A continuacion elige al menos un servicio para tu cita
  </p>
  <div class="grid grid-cols-2 gap-5 mt-5">
    <ServiceItem
        v-for="service in servicestore.services"
        :key="service._id"
        :service="service"
    />
  </div>
</template>

<style scoped></style>
