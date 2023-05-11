<!--
 * @Author: cqq 945327638@qq.com
 * @Date: 2023-03-31 12:16:14
 * @LastEditors: cqq 945327638@qq.com
 * @LastEditTime: 2023-05-11 11:41:07
 * @FilePath: \syt-vue3\src\views\user\patient\patient.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="card_wrapper">
    <PatientUpdataOrAddPage v-if="route.query && route.query.type"/>
    <PatientManagementPage v-else/>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "patient_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getHospitalInfo } from "@/api/modules/hospital"
import PatientManagementPage from "@/views/user/patient/patient_management/patient_management.vue"
import PatientUpdataOrAddPage from "@/views/user/patient/patient_updata_or_add/patient_updata_or_add.vue"
import {HospitalInfoInfoInterfaceRes} from "@/api/modules/hospital/interface";
const route = useRoute()
const pageInfo = reactive({
  hospitalInfo: {} as HospitalInfoInfoInterfaceRes
})
// 获取医院信息
const getHospitalPage = async () => {
  try {
    const res = await getHospitalInfo(route.query.code as string)
    console.log(res)
    pageInfo.hospitalInfo = res
  } catch (error) {
    console.log(error)
  }
}
// 挂载
onMounted(() => {
  // getHospitalPage()
})
</script>

<style lang="scss" scoped>
.card_wrapper {

}
.box_card {
  min-height: 600px;
}
.card_header {
  font-size: 21px;
}
</style>
