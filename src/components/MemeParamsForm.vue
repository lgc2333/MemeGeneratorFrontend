<template>
  <el-form label-position="top" class="meme-form flex gap-20px flex-col">
    <div v-if="info.params.max_images">
      <h2 class="mt-0">Images</h2>
      <meme-params-image
        v-model="model.images"
        :limit="info.params.max_images"
        :on-preview="handlePictureCardPreview"
      />
    </div>

    <div v-if="info.params.max_texts" class="flex gap-10px flex-col">
      <h2 class="mt-0">Texts</h2>
      <el-form-item
        v-for="index in Math.min(info.params.max_texts, model.texts.length + 1)"
        :key="index"
        :label="`Text ${index}`"
        :required="index <= info.params.min_texts"
      >
        <el-input v-model="model.texts[index - 1]" type="textarea" autosize />
      </el-form-item>
    </div>

    <el-button type="primary" class="w-100%" @click="validateAndSubmit()">Generate!</el-button>

    <el-dialog v-model="imagePreviewVisible">
      <img class="w-100%" :src="imagePreviewImage" alt="Preview Image" />
    </el-dialog>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  UploadFile,
} from 'element-plus'

import MemeParamsImage from './MemeParamsImage.vue'
import { MemeGenerateParams, MemeInfo } from '../utils/meme-api'

const model = defineModel<MemeGenerateParams>({ required: true })
const props = defineProps<{ info: MemeInfo; handleGenerate: () => any }>()

const imagePreviewVisible = ref(false)
const imagePreviewImage = ref('')

function arrangeArray<T>(arr: T[]) {
  const arranged = arr.filter(Boolean)
  arr.splice(0, arr.length, ...arranged)
}

watchEffect(() => {
  // arrangeArray(model.value.images)
  arrangeArray(model.value.texts)
})

function handlePictureCardPreview(file: UploadFile) {
  imagePreviewImage.value = file.url!
  imagePreviewVisible.value = true
}

function validateAndSubmit() {
  const { images, texts } = model.value
  const { min_images: minImages, min_texts: minTexts } = props.info.params
  if (images.filter((x) => x).length < minImages) {
    ElMessage.error(`Minimal ${minImages} images required`)
    return
  }
  if (texts.filter((x) => x).length < minTexts) {
    ElMessage.error(`Minimal ${minTexts} texts required`)
    return
  }
  props.handleGenerate()
}
</script>

<style lang="scss">
.meme-form {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
