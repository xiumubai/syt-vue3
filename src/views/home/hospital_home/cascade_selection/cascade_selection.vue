<template>
  <div class="wrapper">
    <div class="title">{{ props.title }}</div>
    <div class="list-group" v-if="props.data">
      <div
        v-for="(item, index) in props.data"
        :class="{ active: item.value == activeId }"
        class="list_item"
        :key="item.id"
        @click="changeActiveId(item.value)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "cascade_selection"
})
</script>
<script setup lang="ts">
import { PropType } from "vue"
import {AreaInterfaceRes, HospitalLevelInterfaceRes} from "@/api/modules/home/interface";

const props = defineProps({
  data: {
    type: Array as PropType<HospitalLevelInterfaceRes[] | AreaInterfaceRes[]>,
    default: () => [],
  },
  title: {
    type: String
  },
  activeId: {
    type: String,
    default: ""
  },
  needChangeAttr: {
    type: String,
    default: ""
  },
  changeCheckedActiveIdHandler: {
    type: Function,
    default: () => {}
  }
})
// 单击改变单选项的选中状态
const changeActiveId = (id: string) => {
  if (props.needChangeAttr) {
    props.changeCheckedActiveIdHandler(props.needChangeAttr, id)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding: 0;
  margin-bottom: 15px;
  display: flex;
  color: #7f7f7f;

  .title {
    width: 40px;
    margin-right: 10px;
  }

  .list-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    .active {
      color: #55a6fe;
    }

    .list_item {
      margin-right: 20px;
      margin-bottom: 10px;
      // 修改鼠标样式
      cursor: pointer;
    }

    .list_item:hover {
      color: #55a6fe;
    }
  }
}
</style>
