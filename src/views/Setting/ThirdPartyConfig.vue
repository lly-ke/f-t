<script setup lang="ts">
import { tauri } from '@tauri-apps/api';
import { appConfigDir } from '@tauri-apps/api/path';
import { readThirdConfig, writeThirdConfig } from '@utils/fs';


const thirdConfigIndex = ref(0)
const thirdConfigList = ref([
  {
    key: 'youdao',
    name: '网易有道翻译',
    config: {
      appKey: '',
      secretKey: '',
    }
  },
  {
    key: 'xiaoniu',
    name: '小牛翻译',
    config: {
      apiKey: '',
    }
  }
])

onMounted(async () => {
  const thirdConfig = await readThirdConfig()
  if (!!thirdConfig) {
    thirdConfigList.value = thirdConfig
  }
})

async function saveThridConfig() {
  writeThirdConfig(thirdConfigList.value)
}

async function openAppConfigDialog() {
  await tauri.invoke('show_in_folder', { path: await appConfigDir() })
}
</script>

<template>
  <div class="flex flex-row h-full">

    <div class="w-40 px-1  third-menus">
      <div v-for="thirdConfig, i in thirdConfigList" :key="i" class="my-1 h-14 third-menu"
        :class="{ 'activate': i === thirdConfigIndex }" @click="thirdConfigIndex = i">
        {{ thirdConfig.name }}
      </div>
    </div>
    <div class="flex-grow relative p-4">
      <div v-for="thirdConfig, i in thirdConfigList" :key="i" :class="i === thirdConfigIndex ? 'block' : 'hidden'">
        <a-typography-title :level="3">
          {{ thirdConfig.name }}
        </a-typography-title>

        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
          <a-form-item v-for="v, k, i in thirdConfig.config" :key="i" :label="k">
            <a-input v-model:value="thirdConfig.config[k]"></a-input>
          </a-form-item>
        </a-form>
      </div>

      <div style="position: absolute; right: 2rem; bottom: 2rem;">
        <a-button type="primary" @click="openAppConfigDialog" class="mr-4">打开配置文件夹</a-button>
        <a-button type="primary" @click="saveThridConfig">保存</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.third-menus {
  border: 1px solid #ccc;

  & .third-menu {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 10px;

    &.activate {
      background-color: #ccc;
    }
  }
}
</style>
