<template>
  <div class="wrapper">
    <div class="title_wrapper">
      <div class="left_title">
        <ClusterOutlined :style="{ color: '#a14c4c' }"></ClusterOutlined>
        <span class="left_title_text">常见科室</span>
      </div>
      <div class="right_title">
        <span class="right_title_text">全部</span>
        <RightOutlined />
      </div>
    </div>
    <ul class="list_container">
      <li v-for="(item, index) in list" class="list_item" :key="item.id">{{ item.value }}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "link_card_departments_page"
})
</script>
<script setup lang="ts">
import {  reactive} from "vue"
import {
  RightOutlined,
  ClusterOutlined
} from "@ant-design/icons-vue"
const list = reactive([
  {
    value: "神经内科",
    id: "神经内科"
  },
  {
    value: "消化内科",
    id: "消化内科"
  },
  {
    value: "呼吸内科",
    id: "呼吸内科"
  },
  {
    value: "内科",
    id: "内科"
  },
  {
    value: "神经外科",
    id: "神经外科"
  },
  {
    value: "妇科",
    id: "妇科"
  },
  {
    value: "产科",
    id: "产科"
  },
  {
    value: "儿科 ",
    id: "儿科 "
  }
])
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  color: #7f7f7f;
  .title_wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left_title_text {
      margin-left: 5px;
    }
    .right_title{
      cursor: pointer;
    }
    .right_title_text {
      margin-right: 5px;
    }
  }
  .list_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .list_item {
      width: 100px;
      height: 22px;
      margin-bottom: 5px;
      cursor: pointer;
    }
  }
}
</style>
