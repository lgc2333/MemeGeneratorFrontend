import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
})
