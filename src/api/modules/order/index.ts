import request from "@/api/request"
import {PayOrderInterfaceRes} from "@/api/modules/order/interface";

export const submitOrder = (hoscode:string, scheduleId:string, patientId:string) => {
  return request({
    url: `/api/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`,
    method: 'post'
  })
}
// 微信支付接口
export const getPayUrl = (orderId:string | number) => {
  return request<any,PayOrderInterfaceRes>({
    url: `/api/order/weixin/createNative/${orderId}`,
    method: 'get'
  })
}
// 轮询查询支付状态
export const queryPayStatus = (orderId:string | number) => {
  return request({
    url: `/api/order/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}
