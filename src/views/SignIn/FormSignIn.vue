<template>
  <Form @submit="handleSignIn" :validation-schema="schema" v-slot="{ errors }">
    <input-field label="Email" type="email" name="email" id="email" placeholder="Digite seu email" :errors="errors"/>
    <input-field label="Senha" type="password" name="password" id="password" placeholder="Digite sua senha" :errors="errors"/>

    <div class="flex items-center justify-between">
      <remember-checkbox :remember="rememberField" />
      <router-link-auth router-name="ForgotPassword" subtitle="Esqueceu sua senha?" />
    </div>

    <button-auth type="submit" title="Entrar" :loading="loading"/>
    <router-link-auth class="mt-4"  title="Não tem uma conta ainda?" router-name="SignUp" subtitle="Inscrever-se" />
  </Form>

  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-gray-300"></div>
    </div>
    <div class="relative flex justify-center text-sm">
      <span class="px-2 bg-white text-neutral-600 dark:bg-gray-800 dark:text-gray-100"> Ou </span>
    </div>
  </div>

  <button
    type="submit"
    class="w-full bg-transparent border hover:bg-gray-100 focus:ring-1 focus:outline-none
    focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
    dark:hover:bg-gray-700 dark:focus:ring-primary-gray dark:text-gray-100"
  >
    <div class="flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6"
           viewBox="0 0 48 48">
        <defs>
          <path id="a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
        </defs>
        <clipPath id="b">
          <use xlink:href="#a" overflow="visible"></use>
        </clipPath>
        <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
        <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
        <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
        <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
      </svg>
      <span class="ml-4"> Logar com Google</span>
    </div>

  </button>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import InputField from '@/components/InputField.vue'
import ButtonAuth from '@/components/ButtonAuth.vue'
import RouterLinkAuth from '@/components/RouterLinkAuth.vue'
import RememberCheckbox from '@/views/SignIn/RememberCheckbox.vue'

interface FormInterface {
  email: string;
  password: string;
  remember: boolean;
}

export default defineComponent({
  components: {
    RememberCheckbox,
    RouterLinkAuth,
    ButtonAuth,
    InputField,
    Form
  },
  setup () {
    const rememberField = ref(false)
    const loading = ref(false)

    const schema = Yup.object().shape({
      email: Yup.string()
        .required('Email é obrigatório.')
        .email('Email é inválido.'),
      password: Yup.string()
        .min(8, 'A senha deve conter pelo menos 8 caracteres.')
        .required('Senha é obrigatória.')
    })
    const handleSignIn = (values: FormInterface) => {
      console.log('values', values)
    }

    return {
      schema,
      rememberField,
      loading,
      handleSignIn
    }
  }
})

</script>
