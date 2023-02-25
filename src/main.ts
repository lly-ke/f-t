import devtools from '@vue/devtools'
import { createApp } from 'vue'
import './utils/shortcut'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import './assets/main.postcss'
import startup from './utils/startup'

if (process.env.NODE_ENV === 'development') {
  devtools.connect('http://localhost', 8098)
}

startup(createApp(App)).mount('#app')
