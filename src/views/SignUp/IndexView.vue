<template>
  <auth-view
    title="Crie sua conta"
    subtitle="Comece a gerenciar seus videos"
    component="FormSignUp"
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
