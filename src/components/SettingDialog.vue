<template>
  <el-dialog v-model="visible" title="Settings" width="80%">
    <el-form :model="settingsInForm">
      <el-form-item label="Backend Base URL">
        <el-input v-model="settingsInForm.backendBaseURL" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" plain @click="applyAndClose">Change</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'

import { settings } from '../utils/settings'

const visible = defineModel<boolean>({ required: true })

const settingsInForm = reactive({ ...settings })

function applyAndClose() {
  Object.assign(settings, settingsInForm)
  visible.value = false
}

watchEffect(() => {
  if (!visible.value) {
    Object.assign(settingsInForm, settings)
  }
})
</script>
