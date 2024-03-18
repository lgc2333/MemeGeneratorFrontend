<template>
  <ElDialog
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
    <ElForm :model="settingsInForm">
      <ElFormItem label="Backend Base URL">
        <ElInput v-model="settingsInForm.backendBaseURL" />
      </ElFormItem>
    </ElForm>
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
  </ElDialog>
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
