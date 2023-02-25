<script setup lang="ts">
import mdContent from '../../../CHANGELOG.md?raw'
</script>

<template>
  <div>
    <v-md-editor v-model="mdContent" mode="preview"></v-md-editor>
  </div>
</template>
