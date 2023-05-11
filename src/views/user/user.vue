<template>
  <div class="wrapper">
    <nav class="title">
      <HomeOutlined />
      <span>/</span>
      <span>会员中心</span>
    </nav>
    <el-container class="main_wrapper">
      <el-aside class="main_menu">
        <el-menu
          :default-active="route.meta.key as string"
          class="el-menu-vertical-demo"
          @select="handleSelect">
          <el-menu-item index="certification">
            <el-icon><Postcard /></el-icon>
            <span>实名认证</span>
          </el-menu-item>
          <el-menu-item index="order">
            <el-icon><Memo /></el-icon>
            <span>挂号订单</span>
          </el-menu-item>
          <el-menu-item index="patient">
            <el-icon><User /></el-icon>
            <span>就诊人管理</span>
          </el-menu-item>
          <el-menu-item index="profile">
            <el-icon><document /></el-icon>
            <span>帐号信息</span>
          </el-menu-item>
          <el-menu-item index="feedback">
            <el-icon><ChatDotRound /></el-icon>
            <span>意见反馈</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main_content hospital_main_content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "hostpital_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { HomeOutlined } from "@ant-design/icons-vue"
import { Document, Postcard, Memo, User, ChatDotRound } from "@element-plus/icons-vue"
const router = useRouter()
const route = useRoute()
// 默认激活路由
const handleSelect = (key: string, keyPath: string[]) => {
  router.push({ path: `/user/${key}`, query: { code: route.query.code } })
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 1200px;
  min-height: 700px;
  padding: 15px 0;
  color: #7f7f7f;
}
.title {
  padding: 0 25px;
  span {
    margin: 0 5px;
  }
}
.main_wrapper {
  display: flex;
  min-height: 700px;
  .main_menu {
    width: 200px;
    //background: pink;
  }
  .main_content {
    flex-grow: 1;
    //background: yellowgreen;
  }
}
</style>
