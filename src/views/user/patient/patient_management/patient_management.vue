<template>
  <div class="card_wrapper" >
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <h2>就诊人管理</h2>
          <el-button type="success" :icon="User" @click="goUpdateOrAddPatientInfo('')">添加就诊人</el-button>
        </div>
      </template>
      <a-row :gutter="[16,16]">
        <a-col :span="8" v-for="(item,index) in pageInfo.patientInfoList" :key="item.id">
          <el-card class="patient_card_wrapper">
            <template #header>
             <el-row class="patient_card_header">
               <el-col :span="16" class="patient_card_header_text_wrapper">
                 <span class="patient_card_header_text_left m-r-5">{{ item?.isInsure === 1 ? '医保' : '自费'}}</span>
                 <span class="patient_card_header_text_right gray">{{ item?.name }}</span>
               </el-col>
               <el-col :span="8">
                 <el-button type="primary" :icon="Edit" circle @click="goUpdateOrAddPatientInfo(item?.id,'edit')"/>
                 <el-popconfirm title="确定要删除吗?" @confirm="deletePatientInfo(item?.id)">
                   <template #reference>
                     <el-button type="danger" :icon="Delete" circle/>
                   </template>
                 </el-popconfirm>
<!--                 <el-button type="danger" :icon="Delete" circle @click="deletePatientInfo(item?.id)"/>-->
               </el-col>
             </el-row>
            </template>
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="证件类型：" >{{item?.param?.certificatesTypeString }}</el-descriptions-item>
              <el-descriptions-item label="证件号码：" >{{item?.certificatesNo }}</el-descriptions-item>
              <el-descriptions-item label="用户性别：" >{{item?.sex === 1 ? '男' : '女' }}</el-descriptions-item>
              <el-descriptions-item label="出生日期：" >{{item?.birthdate }}</el-descriptions-item>
              <el-descriptions-item label="手机号码：" >{{item?.phone }}</el-descriptions-item>
              <el-descriptions-item label="婚姻状况：" >{{item?.isMarry === 1 ? '男' : '女' }}</el-descriptions-item>
              <el-descriptions-item label="当前住址：" >
                {{`${item?.param?.provinceString}/${item?.param?.cityString}/${item?.param?.districtString}` }}
              </el-descriptions-item>
              <el-descriptions-item label="详细地址：" >{{item?.param?.fullAddress }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </a-col>
      </a-row>
    </el-card>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "patient_management_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {Delete, Edit, User} from "@element-plus/icons-vue";
import {deletePatientById, findAllPatientList} from "@/api/modules/user";
import {ElMessage} from "element-plus";
import {PatientInfoInterfaceRes} from "@/api/modules/user/interface";
const route = useRoute()
const router = useRouter()
const pageInfo = reactive({
  patientInfoList: [] as PatientInfoInterfaceRes[]
})
// 获取医院信息
// 获取所有患者信息
const getAllPatientList = async () => {
  try {
    const res = await findAllPatientList()
    pageInfo.patientInfoList = res  || []
  } catch (error) {
    console.log(error)
  }
}
// 去往更新患者信息页面
const goUpdateOrAddPatientInfo = (id: string | number,type = 'add') => {
  // type 为 edit 时为更新患者信息
  // type 为 add 时为添加患者信息
  router.push({ path: '/user/patient', query: { type,id } })
}
// 删除就诊人
const deletePatientInfo = async (id :string|number) => {
  try {
    const res = await deletePatientById(id)
    ElMessage.success("删除成功")
    pageInfo.patientInfoList.splice(pageInfo.patientInfoList.findIndex((item: any) => item.id + '' === id + ''), 1)
  } catch (error) {
    console.log(error)
  }
}

// 挂载
onMounted(() => {
  getAllPatientList()
})

</script>

<style lang="scss" scoped>
.card_wrapper {

}
.box_card{
  min-height: 600px;
}
.card_header{
  display: flex;
  justify-content: space-between;
  font-size:21px;
}
.patient_card_wrapper{
  :deep(.el-card__header){
    background-color: #e5e5e5;
  }
  :deep(.el-descriptions__label){
    margin-right:0 !important;
  }
  .patient_card_header{
    .patient_card_header_text_wrapper{
      display: flex;
      align-items: center;
      .patient_card_header_text_left{
        background-color: #ffffff;
        font-size:12px;
        padding: 0 5px;
      }
      .patient_card_header_text_right{
        font-size:16px;
      }
    }
  }
}

</style>
