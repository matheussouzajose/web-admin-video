<template>
  <auth-view
    title="Recuperar senha"
    subtitle="Informe seu e-mail para receber um link de recuperação."
    component="FormForgotPassword"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthView from '@/views/AuthView.vue'

export default defineComponent({
  components: {
    AuthView
  }
})
</script>
