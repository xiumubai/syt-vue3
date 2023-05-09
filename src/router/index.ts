import { createRouter, createWebHistory } from "vue-router"
import { staticRoutes,allAsyncRoutes,anyRoutes } from "@/router/routes"

const router = createRouter({
  history: createWebHistory(),
  //一旦路由器创建,则映射关系已经确定,将来改变这个staticRoutes是无效的了,是无法添加映射关系了
  //但是router对象有一个addRoute方法,可以给已经确定映射关系的router 添加新的路由映射关系
  routes: [...staticRoutes,...allAsyncRoutes,...anyRoutes],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

// 导出路由
export default router
