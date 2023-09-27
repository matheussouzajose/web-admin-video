<template>
  <div class="bg-transparent transition-colors duration-300">
    <label class="flex cursor-pointer relative" for="toggle">
      <input id="toggle" type="checkbox" class="sr-only peer" v-model="toggle" @click="handleToggle"/>
      <div
        class="peer after:animate-moon after:bg-[length:16px_16px] after:bg-no-repeat after:bg-center after:bg-[url('../img/dark.svg')]
        peer-checked:after:bg-[url('../img/light.svg')] after:transition-all after:duration-300 after:relative
        after:left-0 peer-checked:after:left-7 peer-checked:bg-gray-300 w-16 h-8 dark:bg-zinc-700 rounded-full flex
        items-center px-1 after:rounded-full after:flex after:content=[''] after:w-7 after:h-7 after:bg-gray-100
        dark:after:bg-gray-900 after:rotate-0 after:peer-checked:rotate-180 shadow-inner
        after:animate-moon after:peer-checked:animate-sun"
      ></div>
    </label>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ToggleDarkMode',
  setup () {
    const toggle = ref(false)

    onMounted(() => {
      if (isDark()) {
        darkMode()
        return
      }
      lightMode()
    })

    const isDark = (): boolean => {
      return (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    }
    const darkMode = (): void => {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      toggle.value = false
    }

    const lightMode = (): void => {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      toggle.value = true
    }

    const handleToggle = () => {
      if (toggle.value) {
        darkMode()
        return
      }
      lightMode()
    }

    return {
      toggle,
      handleToggle
    }
  }
})
</script>
