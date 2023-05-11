<template>
  <div class="card_wrapper">
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <h2>添加就诊人</h2>
        </div>
      </template>
      <div class="form_container">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="200px"
          class="user_ruleForm"
          status-icon
        >
          <el-divider content-position="left">
            <span class="gray"> 就诊人信息 </span>
          </el-divider>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入真实姓名全称" />
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select v-model="ruleForm.certificatesType" placeholder="请选择证件类型" clearable>
              <el-option
                v-for="(item, index) in pageInfo.certificatesTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input v-model="ruleForm.certificatesNo" placeholder="请输入证件号码" />
          </el-form-item>
          <el-form-item label="用户性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="0" size="large">女</el-radio>
              <el-radio :label="1" size="large">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthdate">
            <el-date-picker
              v-model="ruleForm.birthdate"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-divider content-position="left">
            <span class="gray"> 建档信息（完善后部分医院首次就诊不排队建档） </span>
          </el-divider>
          <el-form-item label="婚姻状况" prop="isMarry">
            <el-radio-group v-model="ruleForm.isMarry">
              <el-radio :label="0" size="large">未婚</el-radio>
              <el-radio :label="1" size="large">已婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保" prop="isInsure">
            <el-radio-group v-model="ruleForm.isInsure">
              <el-radio :label="0" size="large">自费</el-radio>
              <el-radio :label="1" size="large">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前住址" prop="addressSelected">
            <el-cascader v-model="ruleForm.addressSelected" :props="cascaderProps" />
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="应公安机关要求，请填写现真实住址" />
          </el-form-item>
          <el-divider content-position="left">
            <span class="gray"> 联系人信息（选填） </span>
          </el-divider>
          <el-form-item label="用户姓名" prop="contactsName">
            <el-input v-model="ruleForm.contactsName" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="证件类型" prop="contactsCertificatesType">
            <el-select v-model="ruleForm.contactsCertificatesType" placeholder="请选择证件类型" clearable>
              <el-option
                v-for="(item, index) in pageInfo.certificatesTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="证件号码" prop="contactsCertificatesNo">
            <el-input v-model="ruleForm.contactsCertificatesNo" placeholder="请输入证件号码" />
          </el-form-item>
          <el-form-item label="手机号码" prop="contactsPhone">
            <el-input v-model="ruleForm.contactsPhone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
            <el-button @click="resetForm(ruleFormRef)">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "patient_updata_or_add_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { CascaderProps, FormInstance, FormRules } from "element-plus"
import {ElMessage} from "element-plus";
import {
  addPatient,
  findByParentId,
  getCertTypeList,
  getPatientById,
  updatePatientById
} from "@/api/modules/user"
import {CertificatesTypeInterfaceRes} from "@/api/modules/user/interface";
const route = useRoute()
const router = useRouter()
const pageInfo = reactive({
  certificatesTypeOptions: [] as CertificatesTypeInterfaceRes[], // 证件类型信息
  addressSelectedOptions: [] as any // 证件类型信息
})
const cascaderProps: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { level } = node
    const res = await findByParentId(node?.data?.id as string || 86)
    let result = res.map((item:any) => {
        return{
          id: item.id,
          value: item.name,
          label: item.name,
          leaf: !item.hasChildren,
        }
    })
    resolve(result)
  },
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: "鲁大海", // 用户姓名
  certificatesType: "10", // 证件类型
  certificatesNo: "123456789123456789", // 用户姓名
  sex: 1, // 用户性别 0女 1男
  birthdate: "1989-01-27T16:00:00.000Z", // 出生日期
  phone: "15712345678", // 手机号码
  isMarry: 0, // 婚姻状况 0未婚 1已婚
  isInsure: 1, // 自费/医保 0自费 1医保
  addressSelected: ["北京市", "市辖区", "西城区"], // 当前住址
  address: "同人医院", // 详细地址
  contactsName: "李涛", // 联系人信息 用户姓名
  contactsCertificatesType: "10", // 联系人信息 证件类型：
  contactsCertificatesNo: "123456789123456789", //联系人信息 证件号码
  contactsPhone: "15712345678", // 联系人信息 手机号码
  // id: 0 // 就诊人id
  // name: "", // 用户姓名
  // certificatesType: "", // 证件类型
  // certificatesNo: "", // 用户姓名
  // sex: null, // 用户性别 0女 1男
  // birthdate: "", // 出生日期
  // phone: "", // 手机号码
  // isMarry: null, // 婚姻状况 0未婚 1已婚
  // isInsure: null, // 自费/医保 0自费 1医保
  // addressSelected: [], // 当前住址
  // address: "", // 详细地址
  // contactsName: "", // 联系人信息 用户姓名
  // contactsCertificatesType: "", // 联系人信息 证件类型：
  // contactsCertificatesNo: "", //联系人信息 证件号码
  // contactsPhone: "", // 联系人信息 手机号码
  id: null // 就诊人id
})
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入真实姓名全称", trigger: "blur" }],
  certificatesType: [{ required: true, message: "请选择证件类型", trigger: "change" }],
  certificatesNo: [{ required: true, message: "请输入证件号码", trigger: "blur" }],
  sex: [{ required: true, message: "请选择用户性别", trigger: "change" }],
  birthdate: [{ required: true, message: "请选择用户出生日期", trigger: "change" }],
  phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],

  isMarry: [{ required: true, message: "请选择婚姻状况", trigger: "change" }],
  isInsure: [{ required: true, message: "请选择自费/医保", trigger: "change" }],
  addressSelected: [{ required: true, message: "请选择当前住址区域", trigger: "change" }],
  address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],



})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      route?.query?.id ? updatePatientInfo() : addPatientInfo()
    } else {
      console.log("error submit!", fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
// 获取就诊人信息
const getPatientInfo = async () => {
  try {
    const res = await getPatientById(route.query.id as string)
    const addressSelected = [] as any
    res.param?.provinceString && addressSelected.push(res.param?.provinceString)
    res.param?.cityString && addressSelected.push(res.param?.cityString)
    res.param?.districtString && addressSelected.push(res.param?.districtString)
    ruleForm.addressSelected= addressSelected
    Object.assign(ruleForm, res)
  } catch (error) {
    console.log(error)
  }
}
// 更新就诊人信息
const updatePatientInfo = async () => {
  try {
    const res = await updatePatientById(ruleForm)
    ElMessage.success("更新成功")
    setTimeout(() => {
      // router.push({ path: "/user/patient" })
      router.back()
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}
// 添加就诊人
const addPatientInfo = async () => {
  try {
    const res = await addPatient(ruleForm)
    ElMessage.success("添加成功")
    setTimeout(() => {
      // router.push({ path: "/user/patient" })
      router.back()
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

// 挂载
onMounted(() => {
  getCertificatesTypeOptions()
  route.query.id && getPatientInfo()

})
</script>

<style lang="scss" scoped>
.box_card {
  min-height: 600px;
}
.card_header {
  font-size: 21px;
}
.form_container {
  display: flex;
  flex-direction: column;
  .user_ruleForm {
    :deep(.el-form-item) {
      width: 70%;
      align-items: center;
      .el-select{
        width: 100%;
      }
    }
  }
}
</style>
