<template>
  <el-upload
    ref="elRef"
    v-model:file-list="model"
    action="#"
    class="meme-upload-image"
    drag
    multiple
    list-type="picture"
    :auto-upload="false"
    :limit="limit"
    :on-exceed="onExceed"
    :on-preview="onPreview"
  >
    <el-icon class="text-32px!"><span class="i-carbon-cloud-upload" /></el-icon>
    <div class="el-upload__text align-text-bottom">Drop file here or <em>click to upload</em></div>
  </el-upload>
</template>

<script setup lang="ts">
import { ElIcon, ElMessage, ElUpload, UploadFile, UploadUserFile } from 'element-plus'

const model = defineModel<UploadUserFile[]>({ required: true })
const props = defineProps<{
  limit: number
  onPreview: (file: UploadFile) => void
}>()

function onExceed() {
  ElMessage.warning(`Maximum number of images is ${props.limit}`)
}
</script>

<style lang="scss">
.meme-upload-image {
  .el-upload {
    height: 90px;

    .el-upload-dragger {
      height: 100%;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
  }
}
</style>
