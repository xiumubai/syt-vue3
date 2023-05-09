<template>
  <div class="query_wrapper" v-if="pageInfo.hospitalInfo.hospital">
    <div class='m-l-30 m-r-30'>
      <div style="text-align: center;">
        <h2>{{pageInfo.hospitalInfo.hospital?.hosname}}查询取消信息</h2>
        <el-empty description="暂无信息" />
      </div>
    </div>
  </div>
  <el-skeleton v-else :rows="9" animated />
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "query_page"
})
</script>
<script setup lang="ts">
import {ref, reactive, toRefs, computed, watch, onMounted} from "vue"
import { useRoute, useRouter } from "vue-router"
import {getHospitalInfo} from "@/api/modules/hospital";
import {ElMessage} from "element-plus";
import {HospitalInfoInfoInterfaceRes} from "@/api/modules/hospital/interface";
const route = useRoute()
const pageInfo = reactive({
  hospitalInfo: {} as HospitalInfoInfoInterfaceRes
})
// 获取医院信息
const getHospitalPage = async () => {
  try {
    const res = await getHospitalInfo(route.query.code as string)
    pageInfo.hospitalInfo = res
  } catch (error) {
    console.log(error)
  } finally {
  }
}
// 挂载
onMounted(() => {
  getHospitalPage()
})
</script>

<style lang="scss" scoped>
.query_wrapper {

}
h2{
  font-size: 21px;
}
</style>
