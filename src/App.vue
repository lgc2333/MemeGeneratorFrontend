<template>
  <el-container class="h-100vh">
    <el-header
      class="flex items-center bg-[--el-color-primary-light-3] text-[--el-text-color-primary] shadow"
    >
      <site-header v-model="headerModel" class="mx-auto max-w-5xl" />
    </el-header>
    <el-scrollbar>
      <el-main>
        <router-view class="m-auto max-w-4xl" />
      </el-main>
    </el-scrollbar>
  </el-container>
  <setting-dialog v-model="settingsVisible" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElContainer, ElHeader, ElMain, ElScrollbar } from 'element-plus'

import SiteHeader from './components/SiteHeader.vue'
import SettingDialog from './components/SettingDialog.vue'

const settingsVisible = ref<boolean>(false)
const headerModel = reactive({ settingsVisible })
</script>
