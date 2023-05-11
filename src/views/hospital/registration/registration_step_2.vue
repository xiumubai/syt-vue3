<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <div class="header">
          确认挂号信息
        </div>
      </el-header>
      <el-main>
        <!--        选择就诊人-->
        <check_patient ref="checkPatientRef"></check_patient>
        <!--        挂号信息-->
        <div class="descriptions">
          <el-card  :body-style="{'min-width':'920px'}">
            <template #header>
              <div class="card_header">
                <h2>挂号信息</h2>
              </div>
            </template>
            <div class="descriptions_content" v-if="scheduleInfo.docname">
              <el-descriptions :column="2" border >
                <el-descriptions-item  label="就诊日期：" >{{ scheduleInfo.workDate }} {{ scheduleInfo.param.dayOfWeek }} {{ scheduleInfo.workTime == 0 ? '上午' : '下午' }}</el-descriptions-item>
                <el-descriptions-item  label="就诊医院：" >{{scheduleInfo.param.hosname }}</el-descriptions-item>
                <el-descriptions-item  label="就诊科室：" >{{scheduleInfo.param.depname }}</el-descriptions-item>
                <el-descriptions-item  label="医生姓名：" >{{scheduleInfo.docname }}</el-descriptions-item>
                <el-descriptions-item  label="医生职称：" >{{scheduleInfo.title }}</el-descriptions-item>
                <el-descriptions-item  label="医生专长：" >{{scheduleInfo.skill }}</el-descriptions-item>
                <el-descriptions-item  label="医事服务费：" ><span style="color:red;">{{scheduleInfo.amount }}</span></el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </div>
        <!--        确认挂号-->
        <div class="confirm">
          <el-button
            @click="handleClickConfirm"
            :disabled="!checkedPatient.id"
            type="primary"
            size="large"
            style="width: 200px">确认挂号</el-button>
        </div>


      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {ref, computed, onMounted} from "vue"
import { useRoute, useRouter } from "vue-router"
import {getScheduleInfo} from "@/api/modules/hospital";
import {ScheduleListInterfaceRes} from "@/api/modules/hospital/interface";
import Check_patient from "@/views/hospital/registration/check_patient.vue";
import {submitOrder} from "@/api/modules/order";
const router = useRouter()
const route = useRoute()

// 医院信息
const scheduleInfo = ref({} as ScheduleListInterfaceRes)
const checkPatientRef = ref<InstanceType<typeof Check_patient>>()
// 选择的就诊人
const checkedPatient = computed(() => {
  return  checkPatientRef.value?.checkedPatient || {} as any
})
// 确认挂号
const handleClickConfirm = async () => {
  try {
    // hoscode: string,     scheduleId: string,     patientId: string
    const res = await submitOrder(scheduleInfo.value.hoscode, route.query.scheduleId as string, checkedPatient.value.id)
    await router.push( `/user/order?id=${res}`)
  } catch (error) {
    console.log(error)
  }
}

/** 方法 **/
// 获取日程信息
const getScheduleInfoHandle = async () => {
  try {
    const res = await getScheduleInfo(route.query.scheduleId as string)
    scheduleInfo.value = res
  } catch (error) {
    console.log(error)
  }
}

/*  生命周期 */
onMounted(() => {
  getScheduleInfoHandle()
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100vh;
  padding: 15px 0;
}
.header{
  font-size: 20px;
  color: #333;
  font-weight: bold;
}
.descriptions{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  .box_card{
    min-height: 600px;
  }

    :deep(.el-descriptions__label){
    margin-right:0 !important;
  }

}
.confirm{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
</style>
