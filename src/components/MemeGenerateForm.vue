<template>
  <div class="flex flex-col md:flex-row gap-20px">
    <div class="flex flex-col gap-20px">
      <MemeSelector v-model="selected" :settings="settings" />
      <ElImage
        v-if="preview"
        class="h-48 w-100% md:h-auto md:w-64 xl:w-96"
        :src="preview"
        fit="contain"
        :preview-src-list="[preview]"
      />
      <div
        v-else
        class="flex justify-center items-center bg-[var(--el-fill-color)] h-48 w-48 m-auto md:h-64 md:w-64 md:m-0 xl:h-96 xl:w-96 rounded-md overflow-hidden"
      >
        <ElEmpty description=" " style="padding: 0px !important"></ElEmpty>
      </div>
    </div>
    <pre v-if="info">{{ JSON.stringify(info, null, 2) }}</pre>
    <p v-else class="text-center text-[var(--el-text-color-secondary)] m-0">
      No meme selected
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Settings } from './SettingDialog.vue'

const selected = defineModel<string>({ required: true })
const props = defineProps<{ settings: Settings }>()

interface MemeParamArg {
  name: string
  type: string
  description: string | null
  default: string | null
  enum: string[] | null
}

interface MemeParams {
  min_images: number
  max_images: number
  min_texts: number
  max_texts: number
  default_texts: string[]
  args: MemeParamArg[]
}

interface MemeInfo {
  key: string
  keywords: string[]
  patterns: string[]
  params: MemeParams
}

const info = ref<MemeInfo | null>(null)
const preview = ref<string | null>(null)

async function getMemeInfo(key: string) {
  const res = await fetch(
    new URL(`/memes/${key}/info`, props.settings.backendBaseURL),
    { method: 'GET' }
  )
  return await (res.json() as Promise<MemeInfo>)
}

async function getMemePreview(key: string) {
  const res = await fetch(
    new URL(`/memes/${key}/preview`, props.settings.backendBaseURL),
    { method: 'GET' }
  )
  return await res.blob()
}

async function loadInfo() {
  info.value = null
  const loadingSv = ElLoading.service()
  try {
    const data = await getMemeInfo(selected.value)
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
    const blob = await getMemePreview(selected.value)
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

watch(selected, async (v) => {
  if (!v) {
    info.value = null
    preview.value = null
    return
  }
  await Promise.all([loadInfo(), loadPreview()])
})
</script>
