<template>
  <div class="home_wrapper">
    <!--    轮播-->
    <el-carousel :interval="5000" class="img_wrapper card">
      <el-carousel-item v-for="item in 4" :key="item">
        <el-image src="http://syt.atguigu.cn/_nuxt/img/web-banner1.b91d1a1.png">
          <template #error>
            <div class="image-slot">
              <el-icon><IconPicture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <!--    搜索-->
    <div class="search_wrapper card">
      <div class="search">
        <el-autocomplete
          hide-loading
          :trigger-on-focus="false"
          :style="{ width: '100%', height: '45px' }"
          v-model.trim="searchInfo.keyWord"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入医院名称"
          @select="handleSelect"
        />
        <el-button :icon="Search" type="primary" class="search_btn" />
      </div>
    </div>
    <!--    医院-->
    <HospitalHome />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "home_page"
})
</script>
<script setup lang="ts">
import { Picture as IconPicture, Search } from "@element-plus/icons-vue"
import { ref, reactive, toRefs, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
// 使用paina
import { useAppStore } from "@/store/modules/app"
import HospitalHome from "@/views/home/hospital_home/hostpital_home.vue"
import { getByHosname } from "@/api/modules/home"
import {HospitalInfoInterface} from "@/api/modules/home/interface";
const router = useRouter()

const searchInfo = reactive({
  keyWord: "",
  loading: false,
  suggestionsOptions: [] as HospitalInfoInterface[]
})
const appStore = useAppStore()
const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
  console.log("queryString", queryString.trim() !== "")
  if (queryString.trim() !== "") {
    getByHosname(searchInfo.keyWord).then((res: any) => {
      console.log('res---',res)
      searchInfo.suggestionsOptions = (res).map((item: HospitalInfoInterface) => {
        return {
          ...item,
          value: item.hosname,
        }
      })
      cb(searchInfo.suggestionsOptions)
    })
  } else {
    searchInfo.suggestionsOptions = []
  }
}
const handleSelect = (item:HospitalInfoInterface) => {
  router.push(`/hospital/registration?code=${item.hoscode}`)
}
</script>

<style lang="scss" scoped>
.card {
  width: 1200px;
}
.home_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  :deep .el-carousel__item {
    width: 1200px;
    height: 350px;
  }
}
.img_wrapper {
  width: 1200px;
  height: 350px;
}
el-image {
  width: 1200px;
  height: 350px;
}
.search_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  .search {
    display: flex;
    justify-content: center;
    width: 800px;
    height: 50px;
    :deep(.el-input__inner) {
      height: 43px;
    }
    .search_btn {
      height: 45px;
      width: 60px;
      transform: translateX(-3px);
    }
    .search_btn:focus {
      background-color: var(--el-color-primary);
    }
  }
}
</style>
