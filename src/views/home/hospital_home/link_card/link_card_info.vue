<template>
  <div class="wrapper" v-if="props.data.leftTitle">
    <div class="title_wrapper">
      <div class="left_title">
        <slot>
          <ClusterOutlined :style="{ color: '#a14c4c' }" />
        </slot>
        <span class="left_title_text">{{ props.data.leftTitle }}</span>
      </div>
      <div class="right_title">
        <span class="right_title_text">{{ props.data.rightTitle }}</span>
        <RightOutlined />
      </div>
    </div>
    <ul class="list_container">
      <li v-for="(item, index) in props.data.list" class="list_item" :key="item.id">
        <div class="dot" :style="{ background: `${props.data.dotColor}` }"></div>
        <div class="text">
          {{ item.value }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "link_card_info_page"
})
</script>
<script setup lang="ts">
import { defineProps } from "vue"
import { RightOutlined, ClusterOutlined } from "@ant-design/icons-vue"
import {ILinkCardInfo} from "@/api/modules/home/interface";
const props = defineProps<{
  data: ILinkCardInfo
}>()
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
    .right_title {
      cursor: pointer;
    }
    .right_title_text {
      margin-right: 5px;
    }
  }

  .list_container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    .list_item {
      display: flex;
      align-items: center;
      height: 22px;
      margin-bottom: 5px;
      cursor: pointer;
      .dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* * 多行文本溢出... */
        overflow: hidden;
      }
    }
  }
}
</style>
