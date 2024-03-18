<template>
  <ElContainer>
    <ElHeader
      class="flex items-center bg-[var(--el-color-primary-light-3)] text-[var(--el-text-color-primary)] shadow"
    >
      <h1 class="">MemeGeneratorFrontend</h1>
      <div class="grow"></div>
      <button
        class="i-carbon-sun dark:i-carbon-moon text-3xl ml2 hover:text-[var(--el-text-color-secondary)] transition"
        @click="dark = !dark"
      ></button>
      <button
        class="i-carbon-settings text-3xl ml2 hover:text-[var(--el-text-color-secondary)] transition"
        @click="settingsVisible = !settingsVisible"
      ></button>
    </ElHeader>

    <ElMain>
      <ElSelect
        placeholder="Select a meme"
        filterable
        clearable
        remote
        :remote-method="fetchMemeList"
        :loading="loadingMemeList"
        v-model="selectedMemeKey"
      >
        <ElOption v-for="x of activeMemeKeys" :value="x"></ElOption>
      </ElSelect>
      <p v-if="!selectedMemeKey" class="text-center color-gray font-size-sm">
        No meme selected
      </p>
      <div v-else>
        <p class="text-center">Selected {{ selectedMemeKey }}</p>
      </div>
    </ElMain>

    <ElDialog
      v-model="settingsVisible"
      title="Settings"
      width="80%"
      :before-close="
        () => {
          Object.assign(settingValueInForm, settingsValue)
          settingsVisible = false
        }
      "
    >
      <ElForm :model="settingValueInForm">
        <ElFormItem label="Backend Base URL">
          <ElInput v-model="settingValueInForm.backendBaseURL" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="primary"
            plain
            @click="
              () => {
                Object.assign(settingsValue, settingValueInForm)
                settingsVisible = false
              }
            "
          >
            Change
          </el-button>
        </div>
      </template>
    </ElDialog>
  </ElContainer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

const dark = usePreferredDark()

const loadedMemeKeys = ref<string[]>([])
const activeMemeKeys = ref<string[]>([])
const selectedMemeKey = ref<string>('')
const loadingMemeList = ref(false)

const settingsVisible = ref(false)
const defaultSettings = {
  backendBaseURL: 'http://localhost:23333',
}
const settingValueInForm = reactive({ ...defaultSettings })
const settingsValue = reactive({ ...defaultSettings })

function switchDark() {
  if (dark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

onMounted(() => {
  const storedBackendBaseURL = localStorage.getItem('backendBaseURL')
  if (storedBackendBaseURL) settingsValue.backendBaseURL = storedBackendBaseURL
  switchDark()
})

watch(dark, switchDark)

watch(settingsValue, (v) => {
  Object.assign(settingValueInForm, v)
  localStorage.setItem('backendBaseURL', v.backendBaseURL)
  loadedMemeKeys.value = []
  activeMemeKeys.value = []
  selectedMemeKey.value = ''
})

async function fetchMemeList(query: string) {
  loadingMemeList.value = true
  let ls: string[]
  if (loadedMemeKeys.value.length) {
    ls = loadedMemeKeys.value
  } else {
    try {
      ls = await fetch(new URL('/memes/keys', settingsValue.backendBaseURL), {
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

<style scoped></style>
