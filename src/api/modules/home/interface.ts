// 医院等级接口
export interface HospitalLevelInterfaceRes {
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

// 获取地区接口
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

// 获取医院列表接口
export interface HospitalListInterfaceRes {
  content: HospitalInfoInterface[]
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalPages:number
  totalElements: number
  last: boolean
  first: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}
// 医院信息接口
export interface HospitalInfoInterface {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    hostypeString: string
    fullAddress: string
  }
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData:string
  intro: string
  route: string
  status: number
  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[]
  }
  value?: string
}
// 右边导航
export interface ILinkCardInfo {
  leftTitle: string
  rightTitle: string
  titleLink: string
  dotColor: string
  list: { value: string; id: string; url: string }[]
}
