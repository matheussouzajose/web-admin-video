<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from '@/store/map-state'

export default defineComponent({
  setup () {
    const { 'auth/logout': logout } = mapActions()

    return { logout }
  }
})
</script>
