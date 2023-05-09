<template>
  <div class="wrapper">
  <el-dialog
    :before-close="handleBeforeClose"
    v-model="useOrderInfo.isShowDialog"
    title="微信支付"
    width="450px">
    <div class="container">
      <QrcodeVue :value="useOrderInfo.payObj.codeUrl" :size="220"/>
      <div style="text-align: center;line-height: 25px;margin-top: 20px;">
        请使用微信扫一扫<br/>
        扫描二维码支付
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useOrderInfo.hideDialog">关闭窗口</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import {useOrderInfoStore} from "@/store/modules/order";
import QrcodeVue from 'qrcode.vue'
const useOrderInfo = useOrderInfoStore()


const route = useRoute()
const router = useRouter()

const handleBeforeClose = (done: any) => {
  useOrderInfo.hideDialog()
  done()
}

</script>

<style lang="scss" scoped>
.wrapper{
  :deep(.el-dialog__body) {
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
}
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


</style>
