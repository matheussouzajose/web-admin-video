<template>
  <div class="bg-gray-100 w-screen h-screen dark:bg-gray-900">
    <div class="absolute right-10 mt-10">
      <toggle-dark-mode />
    </div>
    <router-view/>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import ToggleDarkMode from '@/components/ToggleMode.vue'
export default defineComponent({
  name: 'App',
  components: { ToggleDarkMode }
})
</script>
