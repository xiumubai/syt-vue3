import request from "@/api/request"
import {
  BookingScheduleRuleInterfaceRes,
  DepartmentInterfaceRes,
  HospitalInfoInfoInterfaceRes, ScheduleListInterfaceRes
} from "@/api/modules/hospital/interface";

export const getHospitalInfo = (hoscode: string) => {
  return request<null, HospitalInfoInfoInterfaceRes>({
    url: `/api/hosp/hospital/${hoscode}`,
    method: "get"
  })
}
// 请求医院科室信息
export const getDepartment = (hoscode: string) => {
  return request<null, DepartmentInterfaceRes[]>({
    url: `api/hosp/hospital/department/${hoscode}`,
    method: "get"
  })
}
// 请求预约详情
export const  getBookingScheduleRule = (page:number, limit:number, hoscode:string, depcode:string) =>{
  return request<any,BookingScheduleRuleInterfaceRes>({
    url: `api/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
    method: 'get'
  })
}
// 获取日程列表
export const findScheduleList = (hoscode:string, depcode:string, workDate:string) => {
  return request<any,ScheduleListInterfaceRes[]>({
    url: `api/hosp/hospital/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`,
    method: 'get'
  })
}
// 根据日期获取医院详情
export const getScheduleInfo = (scheduleId:string) => {
  return request<any,ScheduleListInterfaceRes>({
    url: `/api/hosp/hospital/getSchedule/${scheduleId}`,
    method: 'get'
  })
}
