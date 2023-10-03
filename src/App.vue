<template>
  <div class="bg-gray-100 w-screen h-screen dark:bg-gray-900">
    <div v-if="false" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div class="flex items-center justify-center space-x-2">
        <div class="w-4 h-4 rounded-full animate-pulse bg-blue-600 dark:bg-gray-100"></div>
        <div class="w-4 h-4 rounded-full animate-pulse bg-blue-600 dark:bg-gray-100"></div>
        <div class="w-4 h-4 rounded-full animate-pulse bg-blue-600 dark:bg-gray-100"></div>
      </div>
    </div>

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
