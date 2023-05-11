<template>
  <div class="card_wrapper">
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <h2>挂号订单</h2>
        </div>
      </template>
      <el-row>
        <el-col :span="8">
          <span>就诊人</span>
          <el-select
            @change="selectChange"
            v-model="searchInfo.patientId"
            clearable placeholder="请选择">
            <el-option
              v-for="item in [{id:'',name:'选择所有患者'},...orderInfo.patientList]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>订单状态</span>
          <el-select
            @change="selectChange"
            v-model="searchInfo.orderStatus"
            clearable placeholder="请选择">
            <el-option
              v-for="item in [{status:'',comment:'选择所有订单状态'},...orderInfo.orderStatusList]"
              :key="item.status"
              :label="item.comment"
              :value="item.status"
            />
          </el-select>
        </el-col>
      </el-row>
      <div>
        <el-table :data="orderInfo.orderList" style="width: 100%" size="default" >
          <el-table-column prop="reserveDate" label="就诊时间"  width="130">
            <template #default="{ row }">
              <span>{{ `${row.reserveDate} ${row.reserveTime === 0 ? '上午' : '下午'}`}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="hosname" label="医院"  />
          <el-table-column prop="depname" label="科室" width="150" />
          <el-table-column prop="title" label="医生"  />
          <el-table-column prop="amount" label="医事服务费"  />
          <el-table-column prop="patientName" label="就诊人" />
          <el-table-column prop="orderStatusString" label="订单状态" >
            <template #default="{ row }">
              <span>{{ `${row.param.orderStatusString}`}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template #default="{ row }">
              <el-button link type="primary" size="small"  @click="handleDetails(row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页-->
        <el-pagination
          v-model:current-page="pageInfo.currentPage"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="prev, pager, next,sizes,total"
          :total="pageInfo.total"
          :style="{ marginTop: '20px' }"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </el-card>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "order_data_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {findAllPatientList, getOrderInfoPageList, getStatusList} from "@/api/modules/user";
import { usePage } from "@/hooks/usePagination"
import {OrderInfoInterfaceRes, PatientInfoInterfaceRes, StatusListInterfaceRes} from "@/api/modules/user/interface";

const route = useRoute()
const router = useRouter()
const orderInfo = reactive({
  orderList: [] as OrderInfoInterfaceRes[],
  patientList: [] as PatientInfoInterfaceRes[],
  orderStatusList: [] as StatusListInterfaceRes[],
})
const searchInfo = reactive({
  patientId: '',
  orderStatus: '',
})
// 获取搜索方法
const getOrderList = async () => {
  try {
    const res = await getOrderInfoPageList(pageInfo.currentPage, pageInfo.pageSize, searchInfo)
    orderInfo.orderList = res.records
    pageInfo.currentPage = res.current
    pageInfo.pageSize = res.size
    pageInfo.total = res.total
  } catch (error) {
    console.log(error)
  }
}
// 分页hooks
const { pageInfo, sizeChange, currentChange } = usePage({ callback: getOrderList })

// 获取所有患者信息
const getAllPatientList = async () => {
  try {
    const res = await findAllPatientList()
    orderInfo.patientList = res
  } catch (error) {
    console.log(error)
  }
}
// 获取订单类型
const getOrderStatusList = async () => {
  try {
    const res = await getStatusList()
    orderInfo.orderStatusList = res
  } catch (error) {
    console.log(error)
  }
}
// select选项发生变化
const selectChange = () => {
  getOrderList()
}
// 查看详情
const handleDetails = (id:string | number) => {
    router.push({path: '/user/order',query:{id: id}})
}
// 挂载
onMounted(() => {
  getAllPatientList()
  getOrderList()
  getOrderStatusList()
})

</script>

<style lang="scss" scoped>
.box_card{
  min-height: 600px;
}
.card_header{
  font-size:21px;
}
.content_container{
  display:flex;
  align-items:center;
  width: 100%;
}
.el-col {
  display: flex;
  align-items:center;
  span{
    margin-right: 10px;
  }
}
</style>

