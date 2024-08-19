<script setup>
import { useAppointmentStore } from '@/stores/appointment'
import SelectedService from '@/components/SelectedService.vue'
import { formatCurrency } from '@/helpers'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { ref } from 'vue'

const appointmentstore = useAppointmentStore()


</script>

<template>
  <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
  <p class="text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>
  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
  <p
    v-if="appointmentstore.notServicesSelected"
    class="text-white text-2xl font-semibold text-center"
  >
    No hay servicios seleccionados
  </p>
  <div v-else class="grid gap-5">
    <SelectedService
      v-for="service in appointmentstore.services"
      :key="service._id"
      :service="service"
    />
    <p class="text-white text-right text-2xl">
      Total a pagar:
      <span class="font-black">{{ formatCurrency(appointmentstore.totalAmount) }}</span>
    </p>
  </div>

  <div class="space-y-8" v-if="!appointmentstore.notServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y hora</h3>
    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <vue-tailwind-datepicker
          :disable-date="appointmentstore.disableDate"
          i18n="es-mx"
          as-single
          no-input
          v-model="appointmentstore.date"
          :formatter=" appointmentstore.formatter"
          disable-in-range
        />
      </div>
      <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
        <button
          v-for="hour in appointmentstore.hours"
          :key="hour"
          class="block text-blue-500 rounded-lg text-xl font-black p-3"
          :class="appointmentstore.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
          @click="appointmentstore.time = hour"
        >
          {{ hour }}
        </button>
      </div>
    </div>
    <div v-if="appointmentstore.isValidReservation" class="flex justify-end">
      <button 
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
        @click="appointmentstore.createAppointment"
      >
        Confirmar reservacion
      </button>
    </div>
  </div>
</template>

<style scoped></style>
