<script setup lang="ts">
import { translateText as translateTextByXiaoniu } from '@apis/xiaoniu';
import { translateText } from '@apis/youdao';
import { createWin } from '@utils/window';
import { message } from 'ant-design-vue';

const text = ref<string>('pig')
const fyList = reactive<any>({
  youdao: {},
  xiaoniu: {},
})

const { youdao, xiaoniu } = toRefs(fyList)

function handleEnter(e) {
  // mac平台 meta+enter windows平台 ctrl+enter
  if (e.metaKey || e.ctrlKey) {
    handleTranslation()
  }
}

async function handleTranslation() {
  if (!text.value.trim()) return

  const youdoaRes = await translateText({
    q: text.value,
    // from: 'auto',
    from: 'auto',
    // to: 'zh-CHS',
    to: 'auto',
  })

  const xiaoniuRes = await translateTextByXiaoniu({
    from: 'en',
    to: 'zh',
    src_text: text.value
  });


  let errMsg = '';
  if (youdoaRes?.errorCode != 0) {
    errMsg += '有道云翻译失败, 请请检查配置 '
  } else {
    fyList.youdao = youdoaRes
  }
  if (xiaoniuRes?.error_code) {
    errMsg += '小牛翻译失败, 请请检查配置 '
  } else {
    fyList.xiaoniu = xiaoniuRes
  }
  if (errMsg) {
    message.error(errMsg)
  }

  console.log(fyList, '翻译完成')
}

function openSettingWin() {
  createWin('设置', {
    title: '设置',
    url: '/#/setting/thirdpartyconfig',
  })
}

</script>

<template>
  <div class="flex flex-col px-5" data-tauri-drag-region>
    <div class="my-2 select-none" data-tauri-drag-region>
      <h1 class="text-3xl font-bold" data-tauri-drag-region>f-t</h1>
    </div>
    <div class="flex flex-col">
      <!-- 监听回车 -->
      <!-- <textarea
id="text" v-model="text" class="text" rows="5" autocomplete="off"
        @keyup.enter.stop.prevent="handleEnter">
      </textarea> -->
      <a-textarea v-model:value="text" :rows="4" />
      <div class="mx-auto mt-3 select-none">
        <a-button type="primary" class="mx-4" @click="handleTranslation">
          翻译
        </a-button>
        <a-button type="primary" @click="openSettingWin">
          打开设置
        </a-button>
      </div>
      <div class="mt-5">
        <hr>
        <div class="select-none">
          有道云翻译
        </div>
        <div v-if="youdao.isWord">
          <div v-for="(item, i) in youdao.basic.explains" :key="i">
            {{ item }}
          </div>
          <div class="my-2">
            <div v-for="(item, i) in youdao.basic.exam_type" :key="i" class="inline text-neutral-500">{{ item }}/</div>
          </div>
          <div>
            <div v-for="(item, i) in youdao.basic.wfs" :key="i">
              <span class="text-neutral-600">{{ item.wf.name }}</span> : {{ item.wf.value }}
            </div>
          </div>
        </div>
        <div v-else>
          {{ youdao.translation }}
        </div>
      </div>
      <div class="mt-5">
        <hr>
        <div class="select-none">
          小牛翻译
        </div>
        <div>
          {{ xiaoniu.tgt_text }}
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang="postcss">
.text {
  padding: 12px;
  border: none;
  font-size: large;
  border-radius: 4px;
  box-shadow: 0px 3px 10px 2px rgb(0, 0, 0, 0.3);
  outline: none;
  color: lightblue;
  background-color: transparent;

  &::placeholder {
    color: lightblue;
  }
}
</style>
