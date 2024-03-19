<template>
  <pre v-if="info" class="m-0">{{ JSON.stringify(info, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { MemeGenerateParams, MemeInfo } from '../utils/meme-api'

const model = defineModel<MemeGenerateParams>({ required: true })
const props = defineProps<{ info: MemeInfo }>()
</script>
