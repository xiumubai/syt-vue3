<template>
  <div class="card_wrapper" >
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <h2>意见反馈</h2>
        </div>
      </template>
      <el-empty description="暂无数据" />
    </el-card>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "feedback_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {getHospitalInfo} from "@/api/modules/hospital";
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
  background: skyblue;
}
.box_card{
  min-height: 600px;
}
.card_header{
  font-size:21px;
}
</style>
