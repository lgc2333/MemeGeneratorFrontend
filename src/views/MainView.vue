<template>
  <div class="flex flex-col md:flex-row gap-20px">
    <div class="flex flex-col gap-20px">
      <meme-selector v-model="selectedMemeKey" />
      <meme-preview :url="preview" :filename="selectedMemeKey" />
    </div>
    <meme-params-form
      v-if="info"
      v-model="generateParams"
      class="w-100%"
      :info="info"
      :handle-generate="generate"
    />
    <div v-else>
      <el-text type="info" class="text-center m-0">No meme selected</el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElLoading, ElMessage, ElText } from 'element-plus'

import MemeSelector from '../components/MemeSelector.vue'
import MemePreview from '../components/MemePreview.vue'
import MemeParamsForm from '../components/MemeParamsForm.vue'
import { backend, MemeGenerateParams, MemeInfo } from '../utils/meme-api'

const selectedMemeKey = ref<string>('')

const info = ref<MemeInfo | null>(null)
const preview = ref<string | null>(null)

let lastPreviewLoadSignal = new AbortController()

const generateParams = ref<MemeGenerateParams>({ images: [], texts: [], args: {} })

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

async function changePreview(callback: () => Promise<Blob>, setNull = true) {
  lastPreviewLoadSignal.abort()
  const abort = new AbortController()
  lastPreviewLoadSignal = abort
  if (setNull) preview.value = null
  try {
    const img = await callback()
    if (!abort.signal.aborted) preview.value = URL.createObjectURL(img)
  } catch (e) {
    ElMessage.error(`${e}`)
    console.error(e)
  }
}

async function loadPreview() {
  await changePreview(() => backend.value.getPreview(selectedMemeKey.value))
}

async function generate() {
  const sv = ElLoading.service()
  await changePreview(
    () => backend.value.generate(selectedMemeKey.value, generateParams.value),
    false
  )
  sv.close()
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
  generateParams.value = { images: [], texts: [], args: {} }
  await Promise.all([loadInfo(), loadPreview()])
})
</script>
