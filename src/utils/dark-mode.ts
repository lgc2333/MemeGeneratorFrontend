import { usePreferredDark } from '@vueuse/core'
import { onMounted, watchEffect } from 'vue'

export const usedDark = usePreferredDark()

export function switchDark(dark: boolean) {
  if (dark) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

watchEffect(() => switchDark(usedDark.value))
onMounted(() => switchDark(usedDark.value))
