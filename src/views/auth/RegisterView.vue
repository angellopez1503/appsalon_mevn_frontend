<script setup>
import { inject } from 'vue'
import { reset } from '@formkit/vue'
import AuthAPI from '@/api/AuthAPI'

const toast = inject('toast')

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthAPI.register(formData)
    toast.open({
      message: data.msg,
      type: 'success'
    })
    reset('registerForm')
  } catch (error) {
    console.log(error)
    const { data } = error.response
    toast.open({
      message: data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crear cuenta</h1>
  <p class="text-2xl text-white text-center my-5">Crear cuenta en AppSalon</p>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    :incomplete-message="false"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El Nombre es obligatorio',
        length: 'El nombre es muy corto'
      }"
    />
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
      validation="required|length:8"
      :validation-messages="{
        required: 'El Password es obligatorio',
        length: 'El password debe contener al menos 8 caracteres'
      }"
    />

    <FormKit
      type="password"
      label="Repetir password"
      name="password_confirm"
      placeholder="Repite el password"
      validation="required|confirm"
      :validation-messages="{
        required: 'El Password repetido es obligatorio',
        confirm: 'Los password no son iguales'
      }"
    />

    <FormKit type="submit">Crear cuenta</FormKit>
  </FormKit>
</template>

<style scoped></style>
