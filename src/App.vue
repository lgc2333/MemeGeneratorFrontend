<template>
  <ElContainer>
    <ElHeader
      class="flex items-center bg-[var(--el-color-primary-light-3)] text-[var(--el-text-color-primary)] shadow"
    >
      <SiteHeader v-model="headerModel" />
    </ElHeader>

    <ElMain>
      <MemeSelector
        v-model="selectedMemeKey"
        :settings="settings"
      ></MemeSelector>
      <p v-if="!selectedMemeKey" class="text-center color-gray font-size-sm">
        No meme selected
      </p>
      <div v-else>
        <p class="text-center">Selected {{ selectedMemeKey }}</p>
      </div>
    </ElMain>
  </ElContainer>

  <SettingDialog v-model="settingsDialogModel"></SettingDialog>
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
