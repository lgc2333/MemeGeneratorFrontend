<template>
  <el-select-v2
    v-model="selected"
    placeholder="Select a meme"
    filterable
    clearable
    remote
    :options="activeMemeKeys.map((x) => ({ value: x, label: x }))"
    :remote-method="fetchMemeList"
    :loading="loadingMemeList"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage, ElSelectV2 } from 'element-plus'

import { settings } from '../utils/settings'
import { backend } from '../utils/meme-api'

const selected = defineModel<string>({ required: true })

const loadedMemeKeys = ref<string[]>([])
const activeMemeKeys = ref<string[]>([])
const loadingMemeList = ref(false)

watch(settings, () => {
  loadedMemeKeys.value = []
  activeMemeKeys.value = []
  selected.value = ''
})

async function fetchMemeList(query: string) {
  loadingMemeList.value = true
  let ls: string[]
  if (loadedMemeKeys.value.length) {
    ls = loadedMemeKeys.value
  } else {
    try {
      ls = await backend.value.getKeys()
      loadedMemeKeys.value = ls
    } catch (e) {
      console.error(e)
      ElMessage.error(`${e}`)
      ls = []
    }
  }
  if (query) {
    query = query.toLowerCase()
    ls = ls.filter((x) => x.toLowerCase().includes(query))
  }
  activeMemeKeys.value = ls
  loadingMemeList.value = false
}
</script>
