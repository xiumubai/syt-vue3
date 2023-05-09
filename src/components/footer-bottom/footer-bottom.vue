<template>
  <div class="foot_wrapper">
    <div class="footer_content">
      <div class="footer_content_left">
        <span class="left_item">京ICP备 13018369号</span>
        <span class="left_item">电话挂号010-56253825</span>
      </div>
      <div class="footer_content_right">
        <el-link :underline="false" class="link_item">联系我们</el-link>
        <el-link :underline="false" class="link_item">合作伙伴</el-link>
        <el-link :underline="false" class="link_item">用户协议</el-link>
        <el-link :underline="false" class="link_item">隐私协议</el-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'footer_page'
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
</script>

<style lang="scss" scoped>
.foot_wrapper {
  position: absolute;
  bottom: 0;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
}
.footer_content {
  display: flex;
  justify-content: space-between;
  //align-items: center;
  width: 1200px;
  height: 50px;

  .footer_content_left {
    display: flex;
    align-items: center;
    height: 100%;
    color: #7f7f7f;
    .left_item {
      margin-left: 5px;
    }
  }

  .footer_content_right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #a1a1a1;
    .link_item {
      margin-left: 5px;
    }
  }
}
</style>
