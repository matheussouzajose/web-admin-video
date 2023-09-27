<template>
  <Form ref="loginForm" @submit="handleForgotPassword" :validation-schema="schema" v-slot="{ errors }">
    <input-field label="Email" type="email" name="email" id="email" placeholder="Digite seu email" :errors="errors"/>
    <button-auth type="submit" title="Recuperar" :loading="loading"/>
    <router-link-auth class="mt-4 flex justify-end" router-name="SignIn" subtitle="Voltar e logar?"/>
  </Form>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import InputField from '@/components/InputField.vue'
import ButtonAuth from '@/components/ButtonAuth.vue'
import RouterLinkAuth from '@/components/RouterLinkAuth.vue'

interface FormInterface {
  email: string;
}

export default defineComponent({
  components: {
    RouterLinkAuth,
    ButtonAuth,
    InputField,
    Form
  },
  setup () {
    const loading = ref(false)

    const schema = Yup.object().shape({
      email: Yup.string()
        .required('Email é obrigatório.')
        .email('Email é inválido.')
    })

    const handleForgotPassword = (values: FormInterface) => {
      console.log('login', values)
    }

    return {
      schema,
      loading,
      handleForgotPassword
    }
  }
})

</script>
