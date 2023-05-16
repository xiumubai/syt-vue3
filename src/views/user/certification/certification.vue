<template>
  <div class="card_wrapper">
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <h2>实名信息</h2>
        </div>
      </template>
      <div style="text-align: center" class="gray">
        <p>
          <InfoCircleOutlined className="m-r-5" />
          完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
        </p>
      </div>
      <div v-if="pageInfo.userRealNameInfo?.authStatus === 0" class="user_ruleForm_wrapper">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="user_ruleForm"
          status-icon
        >
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select v-model="ruleForm.certificatesType" placeholder="请选择证件类型" clearable>
              <el-option
                v-for="(item,index) in pageInfo.certificatesTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input v-model="ruleForm.certificatesNo" placeholder="请输入证件号码" />
          </el-form-item>
          <el-form-item label="上传证件" prop="fileList">
            <UpLoadImg
              ref="upLoadImgRef"
              :limit="1"
              :samplePicture="samplePicture"
              :updateUpLoadFileListHandler="updateUpLoadFileListHandler"
            ></UpLoadImg>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
            <el-button @click="resetForm(ruleFormRef)">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="descriptions_wrapper">
        <el-descriptions title="" :column="1" border :width="200" size="large">
          <el-descriptions-item label-align="right" label="用户姓名">{{ pageInfo.userRealNameInfo?.name }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="证件类型">{{ certificatesTypeName }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="证件号码">{{ pageInfo.userRealNameInfo?.certificatesNo }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "certification_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import {getCertTypeList, reqUserInfo, userAuth} from "@/api/modules/user"
import type { FormInstance, FormRules } from "element-plus"
import UpLoadImg from "@/components/upload-img/upload-img.vue"
import samplePicture from "@/assets/images/auth_example.png"
import {CertificatesTypeInterfaceRes, UserInfoInterfaceRes} from "@/api/modules/user/interface";
import {ElMessage} from "element-plus";
const route = useRoute()
const pageInfo = reactive({
  userRealNameInfo: {} as UserInfoInterfaceRes,
  certificatesTypeOptions:[] as CertificatesTypeInterfaceRes[]
})
// 计算证据类型
const certificatesTypeName = computed(() => {
  return (pageInfo.certificatesTypeOptions.find((item: any) => {
    return item.value === pageInfo.userRealNameInfo.certificatesType
  }) as any)?.name
})
// 图片上传相关
const upLoadImgRef = ref('') as any // 获取子组件ref
// 图片上传 更新图片列表
const updateUpLoadFileListHandler = (newFileList: any) => {
  ruleForm.fileList = newFileList
}
// 表单相关
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: "", // 姓名
  certificatesNo: "", // 证件号码
  certificatesType: "", // 证件类型
  fileList: [] as any[]// 上传证件
})
const checkFile = (rule: any, value: string, callback: any) => {
  console.log('rule',rule)
  console.log('value',value)
  if (value.length === 0) {
    callback(new Error('请上传证件'));
  }  else {
    callback();
  }
}
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入联系人姓名全称", trigger: "blur" }],
  certificatesNo: [{ required: true, message: "请输入联系人证件号码", trigger: "blur" }],
  certificatesType: [{ required: true, message: "请选择证件类型", trigger: "change" }],
  fileList: [{ required: true,validator: checkFile, trigger: 'change' }],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!")
      const params = {
        name: ruleForm.name,
        certificatesNo: ruleForm.certificatesNo,
        certificatesType: ruleForm.certificatesType,
        certificatesUrl: ruleForm.fileList[0].response.data
      }
      await userAuth(params)
      ElMessage.success('提交成功')
      // 更新信息
      getUserRealNameInfo()
    } else {
      console.log("error submit!", fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  upLoadImgRef.value.init()
}

// 获取用户认证信息
const getUserRealNameInfo = async () => {
  try {
    const res = await reqUserInfo()
    console.log(res)
    pageInfo.userRealNameInfo = res || {}
  } catch (error) {
    console.log(error)
  }
}
// 获取证据类型信息
const getCertificatesTypeOptions = async () => {
  try {
    const res = await getCertTypeList()
    pageInfo.certificatesTypeOptions = res || []
  } catch (error) {
    console.log(error)
  }
}

// 挂载
onMounted(() => {
  getUserRealNameInfo()
  getCertificatesTypeOptions()
})
</script>

<style lang="scss" scoped>
.box_card{
  min-height: 600px;
}
.card_header {
  font-size: 21px;
}
.user_ruleForm_wrapper {
  display: flex;
  justify-content: center;
  .user_ruleForm {
    width: 500px;
  }
  :deep(.el-select){
    flex:1;
  }
}
.descriptions_wrapper{
  :deep(.el-descriptions__label){
    width: 100px;
  }
}

</style>
