<template>
  <Form ref="loginForm" @submit="handleSignUp" :validation-schema="schema" v-slot="{ errors }">
    <div>
      <input-field label="Nome" type="text" name="firstName" id="firstName" placeholder="Digite seu nome" :errors="errors"/>
      <input-field label="Sobrenome" type="text" name="lastName" id="elastNamemail" placeholder="Digite seu sobrenome" :errors="errors"/>
      <input-field label="Email" type="email" name="email" id="email" placeholder="Digite seu email" :errors="errors"/>
      <input-field label="Senha" type="password" name="password" id="password" placeholder="Digite sua senha" :errors="errors"/>
    </div>

    <button-auth type="submit" title="Criar" :loading="loading" />
    <router-link-auth class="mt-4" title="Já tem uma conta?" router-name="SignIn" subtitle="Faça login" />
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
      firstName: Yup.string()
        .required('Nome é obrigatório.'),
      lastName: Yup.string()
        .required('Sobrenome é obrigatório.'),
      email: Yup.string()
        .required('Email é obrigatório.')
        .email('Email é inválido.'),
      password: Yup.string()
        .min(8, 'A senha deve conter pelo menos 8 caracteres.')
        .required('Senha é obrigatória.')
    })

    const handleSignUp = (values: FormInterface) => {
      console.log('opa')
      console.log('login', values)
    }

    return {
      schema,
      loading,
      handleSignUp
    }
  }
})

</script>
