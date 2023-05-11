<template>
  <div class="wrapper">
    <nav class="title">
      <HomeOutlined />
      <span>/</span>
      <span>医院信息</span>
    </nav>
    <el-container class="main_wrapper">
      <el-aside class="main_menu">
        <el-menu
          :default-active="route.meta.key as string"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-menu-item index="registration">
            <el-icon><Calendar /></el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="detail">
            <el-icon><document /></el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="notice">
            <el-icon><Bell /></el-icon>
            <span>预约须知</span>
          </el-menu-item>
          <el-menu-item index="suspend">
            <el-icon><Warning /></el-icon>
            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="query">
            <el-icon><Search /></el-icon>
            <span>查询/取消</span>
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
import {
  HomeOutlined
} from "@ant-design/icons-vue"
import { Document, Setting,Calendar,Bell,Warning,Search } from "@element-plus/icons-vue"
const router = useRouter()
const route = useRoute()
// 默认激活路由
const handleSelect = (key: string) => {
  router.push({ path: `/hospital/${key}`, query: { code: route.query.code } })
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
  }
  .main_content {
    flex-grow: 1;
  }
}
</style>
