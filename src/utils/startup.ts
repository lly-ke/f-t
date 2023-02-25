import { App } from 'vue'
import router from './../router'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

VMdEditor.use(vuepressTheme)

export default function (app: App<Element>): App {
  app.use(router).use(VMdEditor)
  
  return app
}
