import request from "@/api/request"
import {
  AreaInterfaceRes,
  CertificatesTypeInterfaceRes,
  OrderInfoInterfaceRes,
  PageInterfaceRes,
  PatientInfoInterfaceRes,
  StatusListInterfaceRes,
  UserInfoInterfaceRes,
  WxLoginInterfaceRes
} from "@/api/modules/user/interface"

//登录请求的返回值类型
export interface loginTokenType {
  token: string
  name: string
}

//获取用户信息的返回值类型
export interface userInfoType {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
  token?: string
}

//1.登录
export const reqLogin = (phone: string, code: string) => {
  return request.post<null, loginTokenType>("/api/user/login", {
    phone,
    code
  })
}

export const getLoginParam = (wxRedirectUri: string) => {
  return request<any, WxLoginInterfaceRes>({
    url: `/api/user/weixin/getLoginParam?wxRedirectUri=${wxRedirectUri}`,
    method: `get`
  })
}

// 获取用户实名信息
export const reqUserInfo = () => {
  return request.get<null, UserInfoInterfaceRes>("/api/user/auth/getUserInfo")
}
// 获取用户订单信息
export const getOrderInfoPageList = (
  page: number | string,
  limit: number | string,
  searchObj: {
    patientId: string
    orderStatus: string
  }
) => {
  return request<null, PageInterfaceRes<OrderInfoInterfaceRes[]>>({
    url: `/api/order/orderInfo/auth/${page}/${limit}`,
    method: "get",
    params: searchObj
  })
}
// 获取订单类型
export const getStatusList = () => {
  return request<null, StatusListInterfaceRes[]>({
    url: `/api/order/orderInfo/auth/getStatusList`,
    method: "get"
  })
}
// 获取证件类型列表
export const getCertTypeList = () => {
  return request.get<null, CertificatesTypeInterfaceRes[]>(
    "api/cmn/dict/findByDictCode/CertificatesType"
  )
}
//  获取所有就诊人信息
export const findAllPatientList = () => {
  return request<any, PatientInfoInterfaceRes[]>({
    url: `/api/user/patient/auth/findAll`,
    method: `get`
  })
}
export const getOrderInfo = (orderId: number | string) => {
  return request<null, OrderInfoInterfaceRes>({
    url: `/api/order/orderInfo/auth/getOrderInfo/${orderId}`,
    method: "get"
  })
}
// 取消预约
export const cancelOrder = (orderId: number | string) => {
  return request<null, any>({
    url: `/api/order/orderInfo/auth/cancelOrder/${orderId}`,
    method: "get"
  })
}
// 获取地区地址
export const findByParentId = (parentId: string | number) => {
  return request<null, AreaInterfaceRes[]>({
    url: `/api/cmn/dict/findByParentId/${parentId}`,
    method: "get"
  })
}
// 获取就诊人信息
export const getPatientById = (id: string | number) => {
  return request<null, PatientInfoInterfaceRes>({
    url: `/api/user/patient/auth/get/${id}`,
    method: "get"
  })
}
// 添加就诊人
export const addPatient = (patient: object) => {
  return request<null, any>({
    url: `/api/user/patient/auth/save`,
    method: "post",
    data: patient
  })
}
// 更新就诊人
export const updatePatientById = (patient: object) => {
  return request<null, any>({
    url: `/api/user/patient/auth/update`,
    method: "put",
    data: patient
  })
}
// 删除就诊人
export const deletePatientById = (id: string | number) => {
  return request<null, any>({
    url: `/api/user/patient/auth/remove/${id}`,
    method: "delete"
  })
}
//3. 退出登录
export const reqLogout = () => {
  return request.post<null, null>(`/admin/acl/index/logout`)
}
// 实名认证
export const userAuth = (userInfo: {
  certificatesNo: string
  certificatesType: string
  certificatesUrl: string
  name: string
}) => {
  return request<null, any>({
    url: `/api/user/auth/userAuah`,
    method: "post",
    data: userInfo
  })
}
