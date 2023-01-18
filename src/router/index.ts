import { createRouter, createWebHashHistory } from 'vue-router'
import vRoutes from 'virtual:generated-pages'
import root from './root'


const router = createRouter({
  history: createWebHashHistory(),
  routes: root.concat(vRoutes),
})

export default router
