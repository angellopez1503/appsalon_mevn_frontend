<script setup>
import { formatCurrency } from '@/helpers'
import { useAppointmentStore } from '@/stores/appointment'

const props = defineProps({
  service: {
    type: Object
  }
})

const appointmentstore = useAppointmentStore()
</script>

<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer"
    :class="appointmentstore.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
    @click="appointmentstore.onServiceSelected(service)"
  >
    <p
      class="text-2xl font-semibold"
      :class="appointmentstore.isServiceSelected(service._id) ? 'text-white' : 'text-gray-700'"
    >
      {{ service.name }}
    </p>
    <p
      class="text-4xl font-black"
      :class="appointmentstore.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>

<style scoped></style>
