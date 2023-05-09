import request from "@/api/request"
import {
  AreaInterfaceRes,
  HospitalInfoInterface,
  HospitalLevelInterfaceRes,
  HospitalListInterfaceRes
} from "@/api/modules/home/interface";

export const getPageList = (page:number, limit:number, searchObj:{
  hostype: string,
  districtCode: string
}) => {
  return request<null, HospitalListInterfaceRes>({
    url: `/api/hosp/hospital/${page}/${limit}`,
    method: "get",
    params: searchObj
  })
}
// 获取医院等级
export const findByDictCode = (dictCode:string) => {
  return request<null, HospitalLevelInterfaceRes[]>({
    url: `/api/cmn/dict/findByDictCode/${dictCode}`,
    method: "get"
  })
}
// 获取地区请求
export const getAreaList = (dictCode:string) => {
  return request<null, AreaInterfaceRes[]>({
    url: `/api/cmn/dict/findByDictCode/${dictCode}`,
    method: "get"
  })
}
// 搜索，获取医院列表
export const getByHosname = (hosname:string) => {
  return request<null, HospitalInfoInterface[]>({
    url: `/api/hosp/hospital/findByHosname/${hosname}`,
    method: "get"
  })
}
