import devtools from '@vue/devtools'
import { createApp } from 'vue'
import './utils/shortcut'
import router from './router'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
import './assets/main.postcss'

if (process.env.NODE_ENV === 'development') {
  devtools.connect('http://localhost', 8098)
}

createApp(App).use(router).mount('#app')
