import { useUserStore } from '@/stores/user'

const isValidLoginAuthenticatedGuard = async (to, from, next) => {
  const userStore = useUserStore()
   await userStore.checkAuthStatus()

  if (!userStore.authStatus) {
    return next()
    
  }
   return next({name:'my-appointments',replace:true})
   
}

export default isValidLoginAuthenticatedGuard