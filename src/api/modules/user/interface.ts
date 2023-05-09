// 获取用户实名信息接口
export interface UserInfoInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: object
  openid: string
  nickName: string
  phone: string
  name: string
  certificatesType: string
  certificatesNo: string
  certificatesUrl: string | null
  authStatus: number
  status: number
}

// 证件类型接口
export interface CertificatesTypeInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: object
  parentId: number
  name: string
  value: string
  dictCode: string
  hasChildren: boolean
}

// 就诊人信息接口
export interface PatientInfoInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    certificatesTypeString: null | string
    contactsCertificatesTypeString: null | string
    cityString: string
    fullAddress: string
    districtString: string
    provinceString: string
  }
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: null | string
  phone: string
  isMarry: number
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
  isInsure: number
  cardNo: null | string
  status: string
  checked?: boolean
}

// 分页接口
export interface PageInterfaceRes<T> {
  records: T
  total: number
  size: number
  current: number
  orders: []
  hitCount: boolean
  searchCount: boolean
  pages: number
}

//用户订单信息
export interface OrderInfoInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: null | string
  title: string
  reserveDate: string
  reserveTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}

// 订单类型
export interface StatusListInterfaceRes {
  comment: string
  status: number
}
// 地区地址接口
export interface AreaInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: object
  parentId: number
  name: string
  value: string
  dictCode: null
  hasChildren: boolean
}
// 微信登陆接口
export interface WxLoginInterfaceRes {
  redirectUri: string
  appid: string
  scope: string
  state: string
}

export interface MyInterface {
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  pageNumber: number,
  pageSize: number,
  offset: number,
  paged: boolean,
  unpaged: boolean
}
