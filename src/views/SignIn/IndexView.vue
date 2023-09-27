<template>
  <auth-view
    title="Faça login na sua conta"
    subtitle="Comece a gerenciar seus videos"
    component="FormSignIn"
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
