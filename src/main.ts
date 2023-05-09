import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPageStackRouter } from "vue-page-stack-router"
import pinia from "./store"
import "@/router/permission"
// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "@/styles/index.scss"
//引入element-plus
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// 引入 ant-design-vue
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import * as Icons from "@ant-design/icons-vue"
const app = createApp(App)
//从 @element-plus/icons-vue 中导入所有图标并进行全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}
// pageStackRouter
const pageStackRouter = createPageStackRouter({ router })
app.use(ElementPlus)
app.use(Antd)
app.use(router)
app.use(pageStackRouter)
app.use(pinia)
// 路由加载完成后挂载
router.isReady().then(() => {
  app.mount("#app")
})
