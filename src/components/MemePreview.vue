<template>
  <div v-if="url" class="mx-auto md:m-0">
    <el-image
      class="h-48 w-fit md:h-fit md:w-64"
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
    v-else-if="filename"
    class="h-48 w-48 m-auto md:h-64 md:w-64 md:m-0 rounded-md overflow-hidden"
  >
    <el-skeleton animated class="w-100% h-100%">
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
      </template>
    </el-skeleton>
  </div>
  <div
    v-else
    class="flex justify-center items-center bg-[--el-fill-color] h-48 w-48 m-auto md:h-64 md:w-64 md:m-0 rounded-md overflow-hidden"
  >
    <el-empty description=" " style="padding: 0px !important"></el-empty>
  </div>
</template>

<script setup lang="ts">
import { ElEmpty, ElImage, ElLink, ElSkeleton, ElSkeletonItem } from 'element-plus'

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
