<template>
  <el-container>
    <el-header
      class="flex items-center bg-[var(--el-color-primary-light-3)] text-[var(--el-text-color-primary)] shadow"
    >
      <site-header v-model="headerModel" />
    </el-header>

    <el-main>
      <meme-generate-form v-model="selectedMemeKey" :settings="settings" />
    </el-main>
  </el-container>

  <setting-dialog v-model="settingsDialogModel"></setting-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Settings } from './components/SettingDialog.vue'

const defaultSettings: Settings = {
  backendBaseURL: 'http://localhost:23333',
}
const settings = reactive({ ...defaultSettings })
const settingsVisible = ref<boolean>(false)
const headerModel = ref({ settingsVisible })
const settingsDialogModel = ref({ settings, visible: settingsVisible })

const selectedMemeKey = ref('')
</script>
