<template>
  <h1>MemeGeneratorFrontend</h1>
  <div class="grow"></div>
  <button
    class="i-carbon-sun dark:i-carbon-moon text-3xl ml2 hover:text-[var(--el-text-color-secondary)] transition"
    @click="darkMode = !darkMode"
  ></button>
  <button
    class="i-carbon-settings text-3xl ml2 hover:text-[var(--el-text-color-secondary)] transition"
    @click="model.settingsVisible = !model.settingsVisible"
  ></button>
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { onMounted, watch } from 'vue'

const model = defineModel<{ settingsVisible: boolean }>({ required: true })

const darkMode = usePreferredDark()

function switchDark() {
  if (darkMode.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}
watch(darkMode, switchDark)
onMounted(switchDark)
</script>
