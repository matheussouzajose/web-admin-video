<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <div class="form-group form-check">
        <Field name="remember" type="checkbox" id="remember" v-model="check" :value="true"
           :unchecked-value="false"
           class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-primary-300
           dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
        />
      </div>
    </div>
    <div class="ml-3 text-sm">
      <label for="remember" class="text-gray-500 dark:text-gray-300">Lembrar-me</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Field } from 'vee-validate'
export default defineComponent({
  components: { Field },
  props: {
    remember: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const check = ref(props.remember)
    return {
      check
    }
  }
})

</script>
