import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export const useAppointmentStore = defineStore('appointment', () => {
  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')

  const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMMM'
  })

  onMounted(() => {
    generateHours()
  })

  const generateHours = () => {
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++) {
      const newHour = hour + ':00'
      hours.value.push(newHour)
    }
  }

  const onServiceSelected = (service) => {
    if (services.value.some((item) => item._id === service._id)) {
      services.value = services.value.filter((item) => item._id !== service._id)
    } else {
      if (services.value.length === 2) {
        alert('Maximo 2 servicios por cita')
        return
      }
      services.value.push(service)
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id)
  })

  const notServicesSelected = computed(() => services.value.length === 0)

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const isValidReservation = computed(
    () => services.value.length && date.value.length && time.value.length
  )

  const disableDate = (date) => {
    const today = new Date()
    return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
  }

  const createAppointment = () => {
     const appointment = {
      services:services.value.map(service => service._id),
      date:date.value,
      time:time.value,
      totalAmount:totalAmount.value
     }

     console.log(appointment)
  }

  return {
    date,
    hours,
    services,
    time,
    onServiceSelected,
    isServiceSelected,
    notServicesSelected,
    totalAmount,
    formatter,
    isValidReservation,
    disableDate,
    createAppointment
  }
})
