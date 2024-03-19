import { reactive, watch } from 'vue'

export interface Settings {
  backendBaseURL: string
}

const defaultSettings: Settings = {
  backendBaseURL: 'http://localhost:23333',
}

export const settings = reactive<Settings>({
  ...defaultSettings,
  ...JSON.parse(localStorage.getItem('settings') || '{}'),
})
watch(settings, () => {
  localStorage.setItem('settings', JSON.stringify(settings))
})
