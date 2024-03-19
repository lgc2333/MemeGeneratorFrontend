<template>
  <el-select
    placeholder="Select a meme"
    filterable
    clearable
    remote
    :remote-method="fetchMemeList"
    :loading="loadingMemeList"
    v-model="selected"
  >
    <el-option v-for="x of activeMemeKeys" :value="x"></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Settings } from './SettingDialog.vue'

const selected = defineModel<string>({ required: true })
const props = defineProps<{ settings: Settings }>()

const loadedMemeKeys = ref<string[]>([])
const activeMemeKeys = ref<string[]>([])
const loadingMemeList = ref(false)

watch(props.settings, () => {
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
      ls = await fetch(new URL('/memes/keys', props.settings.backendBaseURL), {
        method: 'GET',
      }).then((res) => res.json())
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
