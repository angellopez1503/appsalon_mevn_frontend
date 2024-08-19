import { useUserStore } from '@/stores/user'

export const isAuthenticatedGuard = async (to, from) => {
  const userStore = useUserStore()
  await userStore.checkAuthStatus()
  if (userStore.authStatus) {
    return true
  } else {
    return { path: '/auth', force: true }
  }
}

export const isValidLoginAuthenticatedGuard = async (to, from) => {
  const userStore = useUserStore()
  await userStore.checkAuthStatus()
  if (!userStore.authStatus) {
    return true
  } else {
    return { path: '/reservaciones', force: true }
  }
}
