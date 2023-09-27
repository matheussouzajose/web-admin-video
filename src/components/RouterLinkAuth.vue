<template>
  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    {{ title }}
    <RouterLink :to="{ name: routerName }">
      <a class="font-medium text-blue-700 hover:underline dark:text-blue-500">
        {{ subtitle }}
      </a>
    </RouterLink>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String,
      required: true
    },
    routerName: {
      type: String,
      required: true
    }
  }
})
</script>
