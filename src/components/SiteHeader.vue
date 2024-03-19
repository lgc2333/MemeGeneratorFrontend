<template>
  <h1>MemeGeneratorFrontend</h1>
  <div class="grow"></div>
  <button
    class="i-carbon-sun dark:i-carbon-moon text-3xl ml2 hover:text-[var(--el-text-color-secondary)] transition"
    @click="usedDark = !usedDark"
  ></button>
  <button
    class="i-carbon-settings text-3xl ml2 hover:text-[var(--el-text-color-secondary)] transition"
    @click="model.settingsVisible = !model.settingsVisible"
  ></button>
</template>

<script setup lang="ts">
import { usedDark } from '../utils/dark-mode'

const model = defineModel<{ settingsVisible: boolean }>({ required: true })
</script>
