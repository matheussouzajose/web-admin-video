<template>
  <div class="flex flex-col items-center justify-center px-8 mx-auto md:h-screen lg:py-0">

    <a href="#" class="flex items-center mb-6 text-2xl text-gray-900 dark:text-white">
      <img class="w-8 h-8 mr-2" src="../assets/img/light.svg" alt="logo">
      Nome da empresa
    </a>

    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800
        dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
          {{ title }}
        </h1>
        <span class="text-sm leading-tight tracking-tight text-gray-600 dark:text-white">
           {{ subtitle }}
        </span>
        <component :is="component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import FormSignIn from '@/views/SignIn/FormSignIn.vue'
import FormSignUp from '@/views/SignUp/FormSignUp.vue'
import FormForgotPassword from '@/views/ForgotPassword/FormForgotPassword.vue'

export default defineComponent({
  name: 'AuthView',
  components: {
    FormSignIn,
    FormSignUp,
    FormForgotPassword
  },
  props: {
    component: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
})
</script>
