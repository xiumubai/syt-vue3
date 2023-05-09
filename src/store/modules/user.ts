import { defineStore } from "pinia"
import { getToken, removeToken, setToken } from "@/utils/tokens"
import { staticRoutes, allAsyncRoutes, anyRoutes } from "@/router/routes"
import { reqLogin} from "@/api/modules/user"
import type { RouteRecordRaw } from "vue-router"
import router from "@/router"
// @ts-ignore
import { cloneDeep } from "lodash"
import {queryPayStatus} from "@/api/modules/order";
import {ElMessage} from "element-plus";

//因为添加新的路由映射关系只有addRoute方法,每次只能添加一个,所以我们可以封装一个addRoutes方法,每次能添加多个
//该方法接受一个参数,就是要添加到路由映射上的路由表数组
function addRoutes(routes: Array<RouteRecordRaw>) {
  routes.forEach((item) => {
    router.addRoute(item)
  })
}

//3.封装一个函数，当退出登录的时候，对动态路由清理。
function resetRoutes() {
  //排他法，先清理掉所有的映射关系，然后再添加常量路由的映射关系
  //路由对象有一个removeRoute方法,用来删除某个映射关系,参数是当前路由的name属性值
  //路由对象有一个getRoutes方法,用来得到所有的映射关系
  const routes = router.getRoutes() //当前所有的映射关系
  //遍历删除
  routes.forEach((item) => {
    router.removeRoute(item.name as string)
  })

  //然后把静态路由和任意路由重新添加给路由对象
  // addRoutes(staticRoutes)
  addRoutes([...staticRoutes, ...allAsyncRoutes, ...anyRoutes])

  //不能在退出登录排他的时候 重新添加任意路由,因为任意路由只能最后添加,我们如果现在添加了,则未来再去添加异步路由的时候,异步路由就在后边了,匹配就会出现问题
  // addRoutes(anyRoutes);
}

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    isShowLoginDialog: false, //是否显示登录弹窗
    token: getToken() as string,
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    menuRoutes: staticRoutes,
    timer: null as any // 轮询定时器
  }),

  actions: {
    // 显示登陆弹窗
    showLoginDialog() {
      this.isShowLoginDialog = true
    },
    // 隐藏登陆弹窗
    hideLoginDialog() {
      this.isShowLoginDialog = false
    },
    //登录的方法
    /*
      分析login登录需要做的事情
        - 发送请求,得到token
        - 把token保存在state中
        - token是要做数据持久化的,所以在localStorage中也保存一份token
    */
    async login(phone: string, code: string) {
      const result = await reqLogin(phone, code)
      this.token = result.token
      setToken(result.token)
      //登录成功以后,把登录弹窗隐藏
      this.isShowLoginDialog = false
      this.user = result
      localStorage.setItem('user',JSON.stringify(result))
    },
    // 轮询查询是否已经登陆
    async queryLoginStatus() {
      this.timer = setInterval(async () => {
        console.log('queryLoginStatus')
        if (getToken()) {
          this.clearTimer()
          await this.getUserInfoHandle()
          ElMessage.success("登录成功")
        }
      }, 2000)
    },
    // 清除定时器
    clearTimer() {
      clearInterval(this.timer)
    },
    // 获取用户信息
    async getUserInfoHandle() {
      const result = JSON.parse(localStorage.getItem('user') as string)
      this.token = result.token
      setToken(result.token)
      //登录成功以后,把登录弹窗隐藏
      this.isShowLoginDialog = false
      this.user = result
      localStorage.setItem('user',JSON.stringify(result))
    },

    reset() {
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ""
      //退出登录的时候,我们也要重置一下路由映射关系
      resetRoutes()
      this.user = null
      localStorage.removeItem('user')
    },
  }
})
