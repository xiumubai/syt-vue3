<template>
  <div class="registration_wrapper" v-if="pageInfo.hospitalInfo.hospital">
    <div className='m-l-30 m-r-30'>
      <div style="text-align: center;">
        <h2>{{pageInfo.hospitalInfo.hospital?.hosname}}预约挂号须知</h2>
      </div>
      <p>为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
      <p>
        <strong>一、预约实名制：</strong>
      </p>
      <p>
        统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。
      </p>
      <p>
        <strong>二、预约挂号： </strong>
      </p>
      <p>按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
      <ul>
        <li>
          在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；
        </li>
        <li>在同一自然周，同一就诊人，可以预约最多8个号源；</li>
        <li>在同一自然月，同一就诊人，可以预约最多12个号源；</li>
        <li>在同一自然季度，同一就诊人，可以预约最多24个号源。</li>
      </ul>
      <p>
        <strong> 三、取消预约：</strong>
      </p>
      <p>
        已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。
      </p>
      <p>
        <strong> 四、爽约处理：</strong>
      </p>
      <p>
        如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：
      </p>
      <ul>
        <li>
          累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；
        </li>
        <li>
          累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。
        </li>
      </ul>
    </div>
  </div>
  <el-skeleton v-else :rows="9" animated />
</template>
<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "notice_page"
})
</script>
<script setup lang="ts">
import {ref, reactive, toRefs, computed, watch, onMounted} from "vue"
import {useRoute, useRouter} from "vue-router"
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
h2 {
  font-size:21px;
}
</style>
