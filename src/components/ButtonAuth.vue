<template>
  <button :type="type"
          class="mt-4 bg-gray-600 hover:bg-gray-700 border border-gray-700 text-white sm:text-sm rounded-lg
          focus:outline-none focus:ring-gray-100 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600
          dark:text-gray-900 dark:focus:ring-gray-500 dark:focus:border-gray-700 dark:hover:bg-gray-200">
    <spinner-loading v-if="loading"/>
    <span v-else>{{ title }}</span>
  </button>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import SpinnerLoading from '@/components/Spinner.vue'
export default defineComponent({
  name: 'ButtonAuth',
  components: { SpinnerLoading },
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>
