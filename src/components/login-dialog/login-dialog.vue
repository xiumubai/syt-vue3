<template>
  <div class="login_wrapper">


  <el-dialog
    v-model="userInfoStore.isShowLoginDialog"
    @close="handleClose"
    title="用户登陆"
    width="750px">
    <el-row class="login_main">
      <el-col :span="12" class="left_main">
        <el-card shadow="never">
          <div v-if="loginModeInfo.loginMode === 0">
            <el-form
              ref="userFormRef"
              :model="userForm"
              status-icon
              :rules="rules"
            >
              <el-form-item label="" prop="phone">
                <el-input
                  v-model.phone="userForm.phone"
                  :prefix-icon="User"
                  auto-complete
                  placeholder='请输入手机号码'
                />
              </el-form-item>
              <el-form-item label="" prop="code">
                <el-input
                  v-model.phone="userForm.code"
                  :prefix-icon="Lock"
                  :disabled="!isPhone"
                  placeholder='请输入手机验证码'
                />
              </el-form-item>
              <el-form-item>
                <el-button :disabled="!(isPhone && !showCountdown)" @click="getCode">
                  <span>获取验证码</span>
                  <Countdown v-if="showCountdown" title="" :countdown="5" format="(s)" @finish="countdownFinish"></CountDown>
                </el-button>
              </el-form-item>
            </el-form>
            <el-button type="primary" :disabled="!isAllowLogin" @click="submitForm(userFormRef)" :style="{width:'100%'}">用户登陆</el-button>
          </div>
          <div v-if="loginModeInfo.loginMode === 1">
            <div style="text-align: center;">
              <div id='weixinLogin'></div>
            </div>

          </div>

          <div @click="toggleLoginMode" class="login_mode m-t-10 finger">
            <span class="gray">{{ loginModeInfo.loginModeList[loginModeInfo.loginMode].loginModeText}}</span>
            <div class="login_mode_icon">
              <WechatOutlined  v-if="loginModeInfo.loginMode === 0"/>
              <MobileOutlined  v-if="loginModeInfo.loginMode === 1"/>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="right_main">
          <el-row>
            <el-col :span="12">
              <div style="text-align: center;">
                <img src='@/assets/images/code_login_wechat.png' class='code-image' />
                <div>
                  <WechatOutlined />
                </div>
                <div>
                  微信扫一扫关注
                  <br />
                  “快速预约挂号”
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="text-align: center;">
                <img src='@/assets/images/code_app.png' class='code-image' />
                <div>
                  <MobileOutlined />
                </div>
                <div>
                  扫一扫下载
                  <br />
                  “预约挂号”APP
                </div>
              </div>
            </el-col>
          </el-row>
          <div class='slogan'>
            <div style="text-align: center;">
              <p>xxxxxx官方指定平台</p>
              <p>快速挂号 安全放心</p>
            </div>
          </div>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="userInfoStore.hideLoginDialog">关闭窗口</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "login-dialog_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import {useUserInfoStore} from "@/store/modules/user";
import type { FormInstance, FormRules } from 'element-plus'
import {sendCode} from "@/api/modules/sms";
import {
  DownOutlined,
  LockOutlined,
  WechatOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { User,Lock,Search } from '@element-plus/icons-vue'
import { mobile,code } from "@/utils/validate";
import Countdown from "@/components/countdown/countdown.vue";
import {getLoginParam} from "@/api/modules/user";
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()
const userInfoStore = useUserInfoStore()

const userFormRef = ref<FormInstance>()
const userForm = reactive({
  phone: '', // 手机号
  code:'' // 验证码
})
// 是否显示倒计时
let showCountdown = ref(false)
// 登陆模式
let loginModeInfo = reactive({
  loginMode: 0,  // 0 手机验证码 1 微信扫码
  loginModeList: [
    {
      // 手机验证码登陆时候文字显示微信扫码登陆
      loginMode: 0,
      loginModeText: '微信扫码登陆'
    },
    {
      loginMode: 1,
      loginModeText: '手机短信验证码登录'

    }
  ]
})

// 计算手机号是否正确
const isPhone = computed(() => {
  return mobile(userForm.phone)
})
// 计算是否允许登陆
const isAllowLogin = computed(() => {
  return mobile(userForm.phone) && code(userForm.code,6)
})
const checkPhone = (rule: any, value: string, callback: any) => {
  console.log(value)
  if (value.trim().length === 0) {
    callback(new Error('请输入手机号码'));
  } else if (mobile(value)) {
    callback();
  } else {
    callback(
      new Error('请输入正确手机号码')
    );
  }
}
const checkCode = (rule: any, value: string, callback: any) => {
  if(!value){
    callback(new Error('请输入验证码'));
  } else if (value.trim().length === 0) {
    callback(new Error('请输入验证码'));
  } else if (code(value,6)) {
    callback()
  } else {
    callback(
      new Error('请输入正确验证码')
    );
  }
}
const rules = reactive<FormRules>({
  phone: [{ validator: checkPhone, trigger: 'change' }],
  code: [{ validator: checkCode, trigger: 'change' }],
})
// 发送验证码
const getCode = async () => {
  try {
    showCountdown.value = true
    const res = await sendCode(userForm.phone)
    userForm.code = res
  } catch (error) {
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
// 倒计时结束
const countdownFinish = () => {
  showCountdown.value = false
}
// 切换登陆模式
const toggleLoginMode = () => {
  loginModeInfo.loginMode = loginModeInfo.loginMode === 0 ? 1 : 0
  if (loginModeInfo.loginMode === 1) {
    wechatLogin()
  }
}
// 用户微信登陆
const wechatLogin = async () => {
  try {
    // 微信回调地址拼接
    console.log(route.path)
    const wxRedirectUri = encodeURIComponent(`${window.location.origin}/wxLoginCallBack`)
    const res = await getLoginParam(wxRedirectUri)
    // /index中已经以cdn的方式引入了微信登陆的js文件
    const obj = new WxLogin({
      self_redirect: true,
      id: 'weixinLogin', // 需要显示的容器id
      appid: res.appid, // 公众号appid wx*******
      scope: res.scope, // 网页默认即可
      redirect_uri:decodeURIComponent(res.redirectUri), // 授权成功后回调的url
      state: res.state, // 可设置为简单的随机数加session用来校验
      style: 'black', // 提供"black"、"white"可选。二维码的样式
      href: '', // 外部css文件url，需要https
    })
    resetForm(userFormRef.value)
  } catch (error) {
    ElMessage.error((error as any)?.message || 'Has Error')
  }

}
// 用户手机登录
const loginHandler = async () => {
  try {
    const res = await userInfoStore.login(userForm.phone,userForm.code)
    if (route.query && (route.query.redirect as string)) {
      console.log('redirect',route.query.redirect)
      await router.replace(decodeURIComponent(route.query.redirect as string))
    }
  } catch (error) {
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loginHandler()
    } else {
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 关闭的回调
const handleClose = () => {
  console.log('handleClose')
  // 重置登陆模式
  loginModeInfo.loginMode = 0
  // 重置所有信息
  resetForm(userFormRef.value)
  // 清空定时器
  userInfoStore.clearTimer()
}
// 监视属性
watch(() => loginModeInfo.loginMode, (newVal) => {
  if (newVal === 1) {
    userInfoStore.queryLoginStatus()
  }else {
    userInfoStore.clearTimer()
  }
})
</script>

<style lang="scss" scoped>
.login_wrapper{
  :deep(.el-dialog__body) {
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
}

.code-image {
  width: 130px;
  height: 130px;
}

.slogan {
  margin-top: 50px;
}

.slogan p {
  font-style: italic;
  font-size: 20px;
  font-weight: normal;
}

.login_mode{
  display:flex;
  flex-direction: column;
  align-items:center;
  .login_mode_icon{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:50%;
    color: #fff;
    border-color: #ff4d4f;
    background: #ff4d4f;
    height: 30px;
    width:30px;
    font-size:16px;
  }
}

</style>
