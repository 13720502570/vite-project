// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  // @ts-ignore
  presets: [presetUno(), presetRemToPx({ baseFontSize: 4 }), presetAttributify()]
})
