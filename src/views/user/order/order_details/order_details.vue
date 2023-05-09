<template>
  <div class="card_wrapper">
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <h2>挂号详情</h2>
        </div>
      </template>
      <el-row justify="space-between">
        <el-col :span="8">
          <el-tag effect="dark" type="success">
            <el-icon><Select /></el-icon>
            {{ pageInfo.orderDetailsInfo?.param?.orderStatusString }}
          </el-tag>
        </el-col>
        <el-col :span="8">
          <div class="tips_wrapper">
            <div class="m-r-5">
              <img class="wx_img" src="@/assets/images/code_login_wechat.png" />
            </div>
            <div>
              <div>
                微信 <WechatOutlined :style="{ color: 'green' }" /> 关注 “北京114预约挂号”
                <br />
                “快速预约挂号”
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row justify="space-between">
        <el-col :span="10" class="main_wrapper">
          <div>
            <el-descriptions title="" :column="1" border :width="200">
              <el-descriptions-item label="就诊人信息" label-align="right">{{
                pageInfo.orderDetailsInfo?.patientName
              }}</el-descriptions-item>
              <el-descriptions-item label="就诊日期" label-align="right">
                {{
                  `${pageInfo.orderDetailsInfo?.reserveDate} ${
                    pageInfo.orderDetailsInfo?.reserveTime == 0 ? "上午" : "下午"
                  }`
                }}
              </el-descriptions-item>
              <el-descriptions-item label="就诊医院" label-align="right">{{
                pageInfo.orderDetailsInfo?.hosname
              }}</el-descriptions-item>
              <el-descriptions-item label="就诊科室" label-align="right">{{
                pageInfo.orderDetailsInfo?.depname
              }}</el-descriptions-item>
              <el-descriptions-item label="医生职称" label-align="right">{{
                pageInfo.orderDetailsInfo?.title
              }}</el-descriptions-item>
              <el-descriptions-item label="医事服务费" label-align="right">
                <span :style="{ color: 'red', fontWeight: 'bold' }"
                  >{{ pageInfo.orderDetailsInfo?.amount }}元</span
                >
              </el-descriptions-item>
              <el-descriptions-item label="挂号单号" label-align="right">{{
                pageInfo.orderDetailsInfo?.outTradeNo
              }}</el-descriptions-item>
              <el-descriptions-item label="挂号时间" label-align="right">{{
                pageInfo.orderDetailsInfo?.updateTime
              }}</el-descriptions-item>
            </el-descriptions>
            <div
              class="m-t-10"
              v-if="
                pageInfo.orderDetailsInfo?.orderStatus == 0 ||
                pageInfo.orderDetailsInfo?.orderStatus == 1
              "
            >
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确认取消预约？"
                @confirm="cancelOrderReserve"
              >
                <template #reference>
                  <el-button>取消预约</el-button>
                </template>
              </el-popconfirm>
              <el-button @click="handlePay" v-if="pageInfo.orderDetailsInfo?.orderStatus == 0" type="primary">
                支付
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <el-card header="注意事项" shadow="never">
            <ol>
              <li>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</li>
              <li :style="{ color: 'red' }">
                2.【取号】就诊当天需在{{ pageInfo.orderDetailsInfo?.fetchTime }}
                在医院取号，未取号视为爽约，该号不退不换；
              </li>
              <li>
                3.【退号】在{{ pageInfo.orderDetailsInfo?.quitTime }}前可在线退号
                ，逾期将不可办理退号退费；
              </li>
              <li>
                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
              </li>
              <li>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</li>
            </ol>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script setup lang="ts">
import {ref, reactive, toRefs, computed, watch, onMounted, onUnmounted} from "vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { cancelOrder, getOrderInfo } from "@/api/modules/user"
import { WechatOutlined } from "@ant-design/icons-vue"
import { InfoFilled } from "@element-plus/icons-vue"
import {OrderInfoInterfaceRes} from "@/api/modules/user/interface";
import {useOrderInfoStore} from "@/store/modules/order";
const route = useRoute()
const useOrderInfo = useOrderInfoStore()
console.log("route", route)
const pageInfo = reactive({
  orderDetailsInfo: {} as OrderInfoInterfaceRes
})
// 获取医院信息
const getOrderDetailsInfo = async () => {
  try {
    const res = await getOrderInfo(route.query.id as string)
    console.log(res)
    pageInfo.orderDetailsInfo = res
  } catch (error) {
    console.log(error)
  }
}
// 取消预约
const cancelOrderReserve = async () => {
  try {
    const res = await cancelOrder(route.query.id as string)
    // 取消成功 重新请求页面信息
    await getOrderDetailsInfo()
    ElMessage.success("取消成功")
  } catch (error) {
    console.log(error)
  }
}
// 支付接口
const handlePay = () => {
  useOrderInfo.payOrder(route.query.id as string,getOrderDetailsInfo)
}
// 挂载
onMounted(() => {
  getOrderDetailsInfo()
  // cancelOrder(27)
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
.tips_wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
  .wx_img {
    width: 40px;
    height: 40px;
  }
}
.main_wrapper {
  :deep(.el-descriptions__label) {
    width: 100px;
  }
}
</style>
