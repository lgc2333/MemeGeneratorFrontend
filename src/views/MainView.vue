<template>
  <div class="flex flex-col md:flex-row gap-20px">
    <div class="flex flex-col gap-20px">
      <meme-selector v-model="selectedMemeKey" />
      <meme-preview :url="preview" :filename="selectedMemeKey" />
    </div>
    <pre v-if="info" class="m-0">{{ JSON.stringify(info, null, 2) }}</pre>
    <p v-else class="text-center text-[var(--el-text-color-secondary)] m-0">No meme selected</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'

import MemeSelector from '../components/MemeSelector.vue'
import MemePreview from '../components/MemePreview.vue'
import { backend, MemeInfo } from '../utils/meme-api'

const selectedMemeKey = ref<string>('')

const info = ref<MemeInfo | null>(null)
const preview = ref<string | null>(null)

async function loadInfo() {
  info.value = null
  const loadingSv = ElLoading.service()
  try {
    const data = await backend.value.getInfo(selectedMemeKey.value)
    info.value = data
  } catch (e) {
    ElMessage.error(`${e}`)
    console.error(e)
  }
  loadingSv.close()
}

async function loadPreview() {
  preview.value = null
  try {
    const blob = await backend.value.getPreview(selectedMemeKey.value)
    preview.value = URL.createObjectURL(blob)
  } catch (e) {
    ElMessage.error(`${e}`)
    console.error(e)
  }
}

watch(info, () => {
  preview.value = null
})

watch(preview, (_, old) => {
  if (old) URL.revokeObjectURL(old)
})

watch(selectedMemeKey, async (v) => {
  if (!v) {
    info.value = null
    preview.value = null
    return
  }
  await Promise.all([loadInfo(), loadPreview()])
})
</script>
