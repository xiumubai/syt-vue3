import { defineStore } from "pinia"

import {getPayUrl, queryPayStatus} from "@/api/modules/order";
import {PayOrderInterfaceRes} from "@/api/modules/order/interface";
import {ElMessage} from "element-plus";


/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useOrderInfoStore = defineStore("orderInfo", {
  state: () => {
    return {
      isShowDialog: false, //是否显示登录弹窗
      payObj:{} as  PayOrderInterfaceRes,// 微信url支付对象
      orderId: "" ,// 订单id
      timer: null as any // 轮询定时器
    }
  },

  actions: {
    // 设置订单id
    setOrderId(orderId:string) {
      this.orderId = orderId
    },
    // 显示登陆弹窗
    showDialog() {
      this.isShowDialog = true
    },
    // 隐藏登陆弹窗
    hideDialog() {
      // 清空定时器
      clearInterval(this.timer)
      this.isShowDialog = false
    },
    // 请求微信支付接口url
    async getPayUrl(orderId?:string|number) {
      const res = await getPayUrl(orderId || this.orderId)
      this.payObj = res
    },
    // 轮询检测是否已经支付
    checkPayStatus(callback:()=>void) {
      this.timer = setInterval(async () => {
        const res = await queryPayStatus(this.orderId)
        console.log(res)
        if (res) {
          clearInterval(this.timer)
          this.clearAll()
          callback()
          ElMessage.success("支付成功")
        }
      }, 2000)

    },
    // 微信一键支付流程 callback支付成功回调,一般用于页面重新请求数据
    async payOrder(orderId:string,callback:()=>void = ()=>{}) {
      // 显示登陆弹窗
      this.showDialog()
      // 设置订单号
      await this.setOrderId(orderId)
      // 请求微信支付接口url
      await this.getPayUrl()
      // 轮询检测是否已经支付
      await this.checkPayStatus(callback)
    },
    // 清空所有信息
    clearAll() {
      this.isShowDialog = false
      this.payObj = {} as PayOrderInterfaceRes
      this.orderId = ""
    }

  }
})
