<template>
  <div class="flex w-100% items-center">
    <div class="flex justify-left">
      <h1>MemeGeneratorFrontend</h1>
    </div>
    <div class="flex justify-right items-center ml-auto">
      <button
        class="i-carbon-sun dark:i-carbon-moon text-3xl ml2 hover:text-[--el-text-color-secondary] transition"
        @click="usedDark = !usedDark"
      ></button>
      <button
        class="i-carbon-settings text-3xl ml2 hover:text-[--el-text-color-secondary] transition"
        @click="model.settingsVisible = !model.settingsVisible"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { onMounted, watchEffect } from 'vue'

const model = defineModel<{ settingsVisible: boolean }>({ required: true })

const usedDark = usePreferredDark()

function switchDark(dark: boolean) {
  if (dark) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

watchEffect(() => switchDark(usedDark.value))
onMounted(() => switchDark(usedDark.value))
</script>
