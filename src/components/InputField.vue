<template>
  <div class="mb-5">
    <label :for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <Field
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1
      focus:outline-none focus:ring-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="[{'border-red-300 dark:border-red-600': errors[name] }]"/>
    <div class="text-red-500 text-sm mb-1">{{ errors[name] }}</div>
  </div>
</template>

<style scoped>

</style>
<script lang="ts">

import { defineComponent } from 'vue'
import { Field } from 'vee-validate'

export default defineComponent({
  components: { Field },
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    errors: {
      type: Object,
      required: true
    }
  }
})
</script>
