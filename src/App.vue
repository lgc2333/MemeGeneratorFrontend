<template>
  <el-container>
    <el-header
      class="flex items-center bg-[var(--el-color-primary-light-3)] text-[var(--el-text-color-primary)] shadow"
    >
      <site-header v-model="headerModel" />
    </el-header>

    <el-main>
      <router-view class="m-auto w-100% md:w-70%" />
    </el-main>
  </el-container>

  <setting-dialog v-model="settingsVisible" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElContainer, ElHeader, ElMain } from 'element-plus'

import SiteHeader from './components/SiteHeader.vue'
import SettingDialog from './components/SettingDialog.vue'

const settingsVisible = ref<boolean>(false)
const headerModel = reactive({ settingsVisible })
</script>
