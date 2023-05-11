<template>
  <div class="registration_wrapper" v-if="pageInfo.hospitalInfo.hospital">
    <div class="title_container">
      <h2>{{pageInfo.hospitalInfo.hospital?.hosname}}</h2>
      <div class="level">
        <LikeOutlined class="level_icon m-r-5"/>
        <span>{{pageInfo.hospitalInfo.hospital?.param?.hostypeString}}</span>
      </div>
    </div>
    <div class="address_container">
      <div class='logo-route'>
        <img
          :src="`data:image/jpeg;base64,${pageInfo.hospitalInfo.hospital?.logoData}`"
          class='hospital-img'
          :alt="pageInfo.hospitalInfo.hospital?.hosname"
        />
        <AimOutlined class='logo-route-icon' />
        <p>
          具体地址：{{pageInfo.hospitalInfo.hospital?.param?.fullAddress}}
          <br />
          规划路线：{{ pageInfo.hospitalInfo.hospital?.route}}
        </p>
      </div>
    </div>
    <div class='intro'>
      <h3>医院介绍</h3>
      <div class='intro-text'>{{pageInfo.hospitalInfo.hospital?.intro}}</div>
    </div>
  </div>
  <el-skeleton v-else :rows="9" animated />
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "detail_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {getHospitalInfo} from "@/api/modules/hospital";
import { LikeOutlined, AimOutlined } from '@ant-design/icons-vue';
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
    console.log(res)
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

.logo-route-icon {
  margin: 5px 10px;
}
.intro {
  margin-top: 30px;

}

.intro-text {
  line-height: 28px;
}
</style>
