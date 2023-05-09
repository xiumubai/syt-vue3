import type { RouteRecordRaw } from "vue-router"
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单名称
 *      key：           菜单栏切换判断激活状态唯一标识
 *      needLogin；     静态路由中设置，是否需要登录才能访问
 * }
 */

// @ts-ignore
// @ts-ignore
/**
 * 静态路由（默认路由）(常量路由)
 * 我们的菜单就是通过遍历静态路由表得到的
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  //主页
  {
    path: "/",
    component: () => import("@/views/home/home.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "首页"
        }
      }
    ]
  },
  //404
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404"
    }
  },
  //home
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/home.vue"),
    meta: {
      keepAlive: true,
      title: "首页"
    }
  },
  // 微信登录回调页面
  {
    path: "/wxLoginCallBack",
    name: "wxLoginCallBack",
    component: () => import("@/views/wxLoginCallBack/wxLoginCallBack.vue"),
    meta: {
      keepAlive: true,
      title: "微信登陆"
    }
  },
  // 医院信息
  {
    path: "/hospital",
    name: "hospital",
    component: () => import("@/views/hospital/hospital.vue"),
    meta: {
      keepAlive: true,
      title: "医院信息"
    },
    children: [
      {
        path: "registration",
        name: "registration",
        component: () => import("@/views/hospital/registration/registration.vue"),
        meta: {
          title: "预约挂号",
          key: "registration"
        },
        children: [
          {
            path: "registration_step_1",
            name: "registration_step_1",
            component: () => import("@/views/hospital/registration/registration_step_1.vue"),
            meta: {
              title: "预约挂号",
              key: "registration",
              needLogin: true
            }
          },
          {
            path: "registration_step_2",
            name: "registration_step_2",
            component: () => import("@/views/hospital/registration/registration_step_2.vue"),
            meta: {
              title: "预约挂号",
              key: "registration",
              needLogin: true
            }
          }
        ]
      },
      {
        path: "detail",
        name: "detail",
        component: () => import("@/views/hospital/detail/detail.vue"),
        meta: {
          title: "医院详情",
          key: "detail"
        }
      },
      {
        path: "notice",
        name: "notice",
        component: () => import("@/views/hospital/notice/notice.vue"),
        meta: {
          title: "预约须知",
          key: "notice"
        }
      },
      {
        path: "suspend",
        name: "suspend",
        component: () => import("@/views/hospital/suspend/suspend.vue"),
        meta: {
          title: "停诊信息",
          key: "suspend"
        }
      },
      {
        path: "query",
        name: "query",
        component: () => import("@/views/hospital/query/query.vue"),
        meta: {
          title: "查询/取消",
          key: "query"
        }
      }
    ]
  },
]

/**
 * 定义动态路由(异步路由)
 * 专门 用来盛放需要权限控制才能展示的路由菜单
 * 未来用户登录以后,根据用户的权限信息,把用户权限对应的允许的路由信息交给静态路由表
 */
export const allAsyncRoutes: Array<RouteRecordRaw> = [
  // 用户相关
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/user.vue"),
    meta: {
      keepAlive: true,
      title: "会员中心"
    },
    children: [
      {
        path: "certification",
        name: "certification",
        component: () => import("@/views/user/certification/certification.vue"),
        meta: {
          title: "实名认证",
          key: "certification"
        }
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/user/order/order.vue"),
        meta: {
          title: "挂号订单",
          key: "order"
        },
      },
      {
        path: "patient",
        name: "patient",
        component: () => import("@/views/user/patient/patient.vue"),
        meta: {
          title: "就诊人管理",
          key: "patient"

        }
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/user/profile/profile.vue"),
        meta: {
          title: "帐号信息",
          key: "profile"

        }
      },
      {
        path: "feedback",
        name: "feedback",
        component: () => import("@/views/user/feedback/feedback.vue"),
        meta: {
          title: "意见反馈",
          key: "feedback"
        }
      }
    ]
  },
]

/**
 * 定义任意路由
 * ：这个路由是用户随意输入路径的时候要匹配的，最终重定向到404，这个路由在注册的时候，必须是注册在最后一个
 *  */

export const anyRoutes: Array<RouteRecordRaw> = [
  /* 匹配任意的路由 必须最后注册 */
  {
    path: "/:pathMatch(.*)",
    name: "Any",
    redirect: "/404",
    meta: {
      hidden: true
    }
  }
]
