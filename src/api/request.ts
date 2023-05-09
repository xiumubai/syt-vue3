import axios, { type AxiosRequestHeaders, type AxiosResponse } from "axios"
import { ElMessage, ElMessageBox } from "element-plus"
import pinia from "@/store/index"
import { useUserInfoStore } from "@/store/modules/user"
import { getToken } from "@/utils/tokens"

/* 定义response对象的data接口 */
interface ResponseData<T> {
  code: number
  data: T
  message: string
}

// 配置新建一个 axios 实例
const service = axios.create({
  //去环境变量中读取对应环境的axios请求前缀
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000
})
console.log('import.meta.env.VITE_API_URL',import.meta.env.VITE_BASE_API)
// 添加请求拦截器
service.interceptors.request.use((config) => {
  const token = useUserInfoStore().token || getToken()
  ;(config.headers as AxiosRequestHeaders).token = token
  return config
})

// 添加响应拦截器
service.interceptors.response.use(
  /* 约束一下response */
  async (response: AxiosResponse<ResponseData<any>>) => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code !== 200) {
      /* 成功数据的code值为20000/200 */
      // 统一的错误提示
      ElMessage({
        message: (typeof res.data == "string" && res.data) || res.message || "Error",
        type: "error",
        duration: 5 * 1000
      })
      if (response.status === 208) {
        const storeUserInfo = useUserInfoStore(pinia)
        storeUserInfo.showLoginDialog()
        ElMessageBox.alert("请登录", "提示", {})
          .then(() => {})
          .catch(() => {})
      }
      // `token` 过期或者账号已在别处登录
      if (response.status === 401) {
        const storeUserInfo = useUserInfoStore(pinia)
        await storeUserInfo.reset()
        storeUserInfo.showLoginDialog()
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => {})
          .catch(() => {})
      }
      return Promise.reject(service.interceptors.response)
    } else {
      return res.data /* 返回成功响应数据中的data属性数据 */
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时")
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误")
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText)
      else ElMessage.error("接口路径找不到")
    }
    return Promise.reject(error)
  }
)

export default service
