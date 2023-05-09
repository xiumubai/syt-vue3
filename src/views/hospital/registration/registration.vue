<template>
  <div class="registration_wrapper"  v-if="pageInfo.hospitalInfo.hospital && route.name === 'registration'">
    <div class="title_container">
      <h2>{{pageInfo.hospitalInfo.hospital?.hosname}}</h2>
      <div class="level">
        <LikeOutlined class="level_icon m-r-5"/>
        <span>{{pageInfo.hospitalInfo.hospital?.param?.hostypeString}}</span>
      </div>
    </div>
    <div class='logo-route'>
      <img
        :src="`data:image/jpeg;base64,${pageInfo.hospitalInfo.hospital?.logoData}`"
        class='hospital-img'
        :alt="pageInfo.hospitalInfo.hospital.hosname"
      />

      <div class='m-20'>
        <h3>挂号规则</h3>
        <span class="m-r-10">
        预约周期：{{pageInfo.hospitalInfo.bookingRule.cycle}}天
        </span>
        <span class="m-r-10">
        放号时间：{{pageInfo.hospitalInfo.bookingRule.releaseTime}}
        </span>
        <span class="m-r-10">
        停挂时间：{{pageInfo.hospitalInfo.bookingRule.stopTime}}
        </span>
        <br />
        具体地址：{{pageInfo.hospitalInfo.hospital.param.fullAddress}}
        <br />
        规划路线：{{pageInfo.hospitalInfo.hospital.route}}
        <br />
        退号时间：
        {{
          pageInfo.hospitalInfo.bookingRule.quitDay == -1 ?
            `就诊前一工作日${pageInfo.hospitalInfo.bookingRule.quitTime}前取消`
            :
            `就诊前当天${pageInfo.hospitalInfo?.bookingRule?.quitTime}前取消`}}
        <h3>医院预约规则</h3>
        <ol>
          <li v-for="(item,index) in pageInfo.hospitalInfo?.bookingRule?.rule" :key="index">{{`${index+1}. ${item}`}}</li>
        </ol>
      </div>
    </div>
<!--    -->
    <hospital_departments v-if="route.query?.code" :code="route.query.code as string"></hospital_departments>
    <div style="margin-top:60px;"></div>
  </div>
  <div v-else-if="route.name !== 'registration'">
    <router-view />
  </div>
  <el-skeleton v-else :rows="9" animated />

</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "registration_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {getHospitalInfo} from "@/api/modules/hospital";
import { LikeOutlined, AimOutlined } from '@ant-design/icons-vue';
import {ElMessage} from "element-plus";
import {HospitalInfoInfoInterfaceRes} from "@/api/modules/hospital/interface";
import Hospital_departments from "@/views/hospital/registration/hospital_departments.vue";
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
  if (route.name === 'registration') {
    getHospitalPage()
  }
})

</script>

<style lang="scss" scoped>
.registration_wrapper {

}
.title_container{
  display:flex;
  h2 {
    font-size: 21px;
    color: rgba(0, 0, 0, 0.85);
  }
  .level{
    margin-left: 10px;
    margin-top: 5px;
  }
  .level_icon{

  }
}
.hospital-img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-left: 10px;
  transition: all .2s linear;
}
.logo-route {
  display: flex;
}


.intro {
  margin-top: 30px;
}

.depName {
  margin: 5px;
  padding: 5px;
}

</style>
