<template>
  <div v-if="url">
    <el-image
      class="h-48 w-100% md:h-auto md:w-64"
      :src="url"
      fit="contain"
      :preview-src-list="[url]"
    />
    <p class="m-0 p-0 text-center">
      <el-link type="info" @click="savePicture">
        <span class="i-carbon-download"></span> Save Picture
      </el-link>
    </p>
  </div>
  <div
    v-else
    class="flex justify-center items-center bg-[var(--el-fill-color)] h-48 w-48 m-auto md:h-64 md:w-64 md:m-0 rounded-md overflow-hidden"
  >
    <span
      v-if="filename"
      class="i-carbon-document-unknown text-[var(--el-text-color-secondary)] text-4xl"
    ></span>
    <el-empty v-else description=" " style="padding: 0px !important"></el-empty>
  </div>
</template>

<script setup lang="ts">
import { ElEmpty, ElImage, ElLink } from 'element-plus'

const props = defineProps<{
  url: string | null
  filename: string | null
}>()

function savePicture() {
  if (!props.url) return
  const a = document.createElement('a')
  a.href = props.url
  a.download = `meme_${props.filename}_${Math.round(Date.now() / 1000)}.png`
  a.click()
  a.remove()
}
</script>
