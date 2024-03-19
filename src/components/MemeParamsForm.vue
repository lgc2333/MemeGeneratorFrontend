<template>
  <el-form label-position="top">
    <div class="grid lg:grid-cols-2 lg:gap-x-16px">
      <template v-for="i in info.params.max_images" :key="`image${i}`">
        <el-form-item
          v-if="i == 1 || i <= info.params.min_images || model.images[i - 2]"
          :label="`Image ${i}`"
          :required="i <= info.params.min_images"
          class="w-100% md:w-fit"
        >
          <meme-params-image
            :on-change="(file) => (model.images[i - 1] = file)"
            :on-remove="() => (model.images[i - 1] = null)"
            :on-preview="handlePictureCardPreview"
          />
        </el-form-item>
      </template>
    </div>

    <div class="grid lg:grid-cols-2 lg:gap-x-16px">
      <template v-for="i in info.params.max_texts" :key="`text${i}`">
        <el-form-item
          v-if="i == 1 || i <= info.params.min_texts || model.texts[i - 2]"
          :label="`Text ${i}`"
          :required="i <= info.params.min_texts"
        >
          <el-input v-model="model.texts[i - 1]" type="textarea" autosize />
        </el-form-item>
      </template>
    </div>

    <el-form-item>
      <el-button type="primary" class="w-100%" @click="validateAndSubmit()"> Generate! </el-button>
    </el-form-item>

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

watchEffect(() => {
  const {
    max_images: maxImages,
    max_texts: maxTexts,
    default_texts: defaultTexts,
  } = props.info.params
  model.value = {
    images: new Array(maxImages).fill(null),
    texts: [...defaultTexts, ...new Array(maxTexts - defaultTexts.length).fill('')],
    args: {},
  }
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
