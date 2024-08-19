import { ref, onMounted, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import AuthAPI from '@/api/AuthAPI'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const authStatus = ref(false)

  //   onMounted(async () => {
  //     try {
  //       const { data } = await AuthAPI.auth()
  //       user.value = data
  //     } catch (error) {
  //       console.log(error)
  //     //   router.replace({ name: 'login' })
  //     }
  //   })

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    user.value = {}
    authStatus.value = false
    // router.replace({ name: 'login' })
  }

  const getUserName = computed(() => user.value.name ?? '')

  const checkAuthStatus = async () => {
    try {
      
      const { data } = await AuthAPI.auth()
      user.value = data
      authStatus.value = true
   
    } catch (error) {
      authStatus.value = false
      
    }
  }
  return {
    user,
    getUserName,
    logout,
    checkAuthStatus,
    authStatus
  }
})
