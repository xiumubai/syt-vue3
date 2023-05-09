<template>
  <el-affix class="affix_container">
    <div class="header_wrapper">
      <div class="header_content">
        <div class="header_content_left finger" @click="goHomeHandler">
          <img class="logo" src="@/assets/images/logo.png" />
          <span class="logo_title">尚医通 预约挂号统一平台</span>
        </div>
        <div class="header_content_right">
          <span class="helper">帮助中心</span>
          <div v-if="!token" class="login finger" @click="loginHandler">登陆/注册</div>
          <el-dropdown v-else @command="handleCommand" class="finger">
              <span class="el-dropdown-link">
                {{name}}
                <el-icon><ArrowDown /></el-icon>
              </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="dropdown_item" command="certification">实名认证</el-dropdown-item>
                <el-dropdown-item class="dropdown_item" command="order">挂号订单</el-dropdown-item>
                <el-dropdown-item class="dropdown_item" command="patient">就诊人管理</el-dropdown-item>
                <el-dropdown-item class="dropdown_item" command="logOut">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-affix>
</template>
<script lang="ts">
import { defineComponent, toRef } from "vue"

export default defineComponent({
  name: "header_top_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ArrowDown } from "@element-plus/icons-vue"
import {useUserInfoStore} from "@/store/modules/user";
import {getToken} from "@/utils/tokens";
const userInfoStore = useUserInfoStore()
const route = useRoute()
const router = useRouter()
//计算属性
const token = computed(() => {
  return userInfoStore.user?.token
})
const name = computed(() => {
  return userInfoStore.user?.name
})
// 回到首页
const goHomeHandler = () => {
  router.push("/")
}
// 登陆
const loginHandler = async () => {
  await userInfoStore.showLoginDialog()
}
// 处理下拉菜单
const handleCommand = (command: string | number | object) => {
  if (command === "logOut") {
    userInfoStore.reset()
    router.push({ path: "/" })
  } else {
    router.push({ path: `/user/${command}`})
  }
}
</script>

<style lang="scss" scoped>
.affix_container {
  width: 100%;
  height: 70px;
  z-index: 999;
}

.header_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 3px 0 #f7f7f7;
  margin-bottom: 3px;
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: none;
  }
  .el-dropdown-link:hover {
    color: var(--el-color-primary);
  }
}

.header_content {
  display: flex;
  justify-content: space-between;
  //align-items: center;
  width: 1200px;
  height: 70px;

  .header_content_left {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 10px;
    .logo {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    .logo_title {
      color: #55a6fe;
      font-size: 22px;
    }
  }

  .header_content_right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;

    .helper {
      margin-right: 10px;
      color: #7f7f7f;
    }

    .login {
      color: #999;
    }

    .login:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
