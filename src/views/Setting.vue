<script setup lang="ts">
const leftBtnIndex = ref(0)
const leftBtns = [
  {
    text: '翻译配置',
    path: '/setting/thirdpartyconfig'
  },
  {
    text: '更新历史',
    path: '/setting/changelog'
  },
  {
    text: '关于',
    path: '/setting/about'
  }
]
</script>

<template>
  <div class="flex flex-row" style="height: 100vh;">
    <!-- left -->
    <div class="w-60 border-2 px-2">
      <div class="py-2">
        <router-link
v-for="btn, i in leftBtns" :key="i" :to="btn.path" class="left-btn cursor-pointer"
          :class="{ 'activate': i === leftBtnIndex }" @click="leftBtnIndex = i">
          <div class="text">{{ btn.text }}</div>
        </router-link>
      </div>
    </div>
    <!-- right -->
    <div class="flex-grow border-2">
      <router-view />
    </div>
  </div>
</template>

<style style scoped lang="postcss">
.left-btn {
  height: 4rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;

  &.activate {
    border: 1px solid;
    border-radius: 10px;
    background-color: #302f30
  }
}
</style>
