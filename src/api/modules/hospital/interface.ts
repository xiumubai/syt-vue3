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
  logoData: string
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
}
// 医院预约规则接口
export interface BookingRuleInterface {
  cycle: number
  releaseTime: string
  stopTime: string
  quitDay: number
  quitTime: string
  rule: string[]
}
export interface HospitalInfoInfoInterfaceRes {
  bookingRule: BookingRuleInterface
  hospital: HospitalInfoInterface
}
// 医院科室信息接口
export interface DepartmentInterfaceRes {
  depcode: string
  depname: string
  children: DepartmentInterfaceRes[]
}
// 预约详情接口
export interface BookingScheduleRuleInterfaceRes {
  baseMap: {
    workDateString: string
    releaseTime: string
    bigname: string
    stopTime: string
    depname: string
    hosname: string
  }
  bookingScheduleList: BookingScheduleDateInterface[]
  total:number
}
// 预约日期接口
export interface BookingScheduleDateInterface {
  workDate: string
  workDateMd: string
  dayOfWeek: string
  docCount: number
  reservedNumber: number
  availableNumber: number
  status: number
  curClass?:string
}
// 日程列表接口
export interface ScheduleListInterfaceRes {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

