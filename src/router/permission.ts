import router from "@/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import {getToken} from "@/utils/tokens";
import {useUserInfoStore} from "@/store/modules/user";
import pinia from "@/store";
import {staticRoutes,allAsyncRoutes, anyRoutes} from "@/router/routes";
import {getTreeDataProperty} from "@/utils/utils";
NProgress.configure({ showSpinner: false })
const userInfoStore = useUserInfoStore(pinia)
const whiteList:string[] = []
// 所有异步权限路由的名字集合
const allAsyncRoutesNameList = getTreeDataProperty(allAsyncRoutes,'name')
// 所有静态路由和任意路由的名字集合
const staticRoutesAndAnyRoutesNameList = getTreeDataProperty([...staticRoutes,...anyRoutes],'name')
// 路由守卫
router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  // 设置网页标题名称
  document.title = `尚医通-${to.meta.title}` || '尚医通'
  // 判断该用户是否登录
  if (getToken()) {
    next()
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else if (staticRoutesAndAnyRoutesNameList.indexOf(to.name) !== -1 && !to.meta.needLogin) {
      // 如果去往的页面是没有访问权限的页面 或者页面是否必须需要登陆才能访问&& !to.meta.needLogin
      // 判断当前用户是否有访问该页面的权限
      // 如果有访问权限，则进入该页面
      next()
    }else{
      // 其他没有访问权限的页面将被重定向到登录页面
      next(`/home?redirect=${encodeURIComponent(to.fullPath)}`);
      // 调用登陆弹窗
      userInfoStore.showLoginDialog()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})



