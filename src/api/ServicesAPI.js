import api from '@/lib/axios'

const all = () => {
  return api.get('/services')
}

export default {
  all
}
