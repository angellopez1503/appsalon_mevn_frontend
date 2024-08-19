<script setup>
import { useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';
import { inject, onMounted } from 'vue';

const toast = inject('toast')
const router = useRouter()

onMounted(async()=>{
  try {
    await AuthAPI.auth()
    router.replace({name:'my-appointments'})
  } catch (error) {
    
  }
})

const handleSubmit = async (formData) => {
    try {
        const { data:{ token } } = await AuthAPI.login(formData)
        localStorage.setItem('AUTH_TOKEN',token)
        router.replace({name:'my-appointments'})
     
      } catch (error) {
        console.log(error.response.data.msg)
        toast.open({
            message:error.response.data.msg,
            type:'error'
        })
    }
}

</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar sesion</h1>
    <p class="text-2xl text-white text-center my-5">Si tienes una cuenta inicia sesion</p>
    <FormKit
      id="loginForm"
      type="form"
      :actions="false"
      :incomplete-message="false"
      @submit="handleSubmit"
    >
      <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Email"
        validation="required|email"
        :validation-messages="{
          required: 'El Email es obligatorio',
          email: 'Email no valido'
        }"
      />
      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Password"
        validation="required"
        :validation-messages="{
          required: 'El Password es obligatorio'
        }"
      />
      <FormKit type="submit">Iniciar sesion</FormKit>
    </FormKit>
  </div>
</template>

<style scoped></style>
