<template>
  <el-dialog
    v-model="model.visible"
    title="Settings"
    width="80%"
    :before-close="
      () => {
        Object.assign(settingsInForm, model.settings)
        model.visible = false
      }
    "
  >
    <el-form :model="settingsInForm">
      <el-form-item label="Backend Base URL">
        <el-input v-model="settingsInForm.backendBaseURL" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          plain
          @click="
            () => {
              Object.assign(model.settings, settingsInForm)
              model.visible = false
            }
          "
        >
          Change
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'

const model = defineModel<{ settings: Settings; visible: boolean }>({
  required: true,
})

export interface Settings {
  backendBaseURL: string
}

const settingsInForm = reactive({ ...model.value.settings })

onMounted(() => {
  const storedBackendBaseURL = localStorage.getItem('backendBaseURL')
  if (storedBackendBaseURL) model.value.settings.backendBaseURL = storedBackendBaseURL
})

watch(model.value.settings, (v) => {
  Object.assign(settingsInForm, v)
  localStorage.setItem('backendBaseURL', v.backendBaseURL)
})
</script>
