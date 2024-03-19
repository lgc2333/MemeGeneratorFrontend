<template>
  <el-upload
    ref="elRef"
    class="meme-form m-auto md:m-0"
    action="#"
    drag
    :limit="1"
    :auto-upload="false"
    list-type="picture-card"
    :on-change="onChange"
    :on-exceed="onExceed"
    :on-preview="onPreview"
  >
    <p class="i-carbon-add text-4xl" />
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElUpload, UploadFile, UploadInstance, UploadUserFile } from 'element-plus'

defineProps<{
  onPreview: (file: UploadFile) => void
  onChange: (file: UploadFile) => void
}>()

const elRef = ref<UploadInstance | null>(null)

function onExceed(files: File[], uploadFiles: UploadUserFile[]) {
  elRef.value!.handleRemove(uploadFiles[0] as any)
  elRef.value!.handleStart(files[0] as any)
}
</script>

<style lang="scss">
.meme-upload-image {
  .el-upload--picture-card.is-drag {
    border: none;

    .el-upload-dragger {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
