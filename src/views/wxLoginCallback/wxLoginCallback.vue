<template>
  <div class="wrapper"></div>
</template>
<script setup lang="ts">
import {ref, reactive, toRefs, computed, watch, onMounted} from "vue"
import { useRoute, useRouter } from "vue-router"
import {setToken} from "@/utils/tokens";

const route = useRoute()
let token = route.query.token as string
let name = route.query.name as string
const user = {
  token,
  name
}
// 保存到本地user
localStorage.setItem('user',JSON.stringify(user))
// 设置token
setToken(token)
// 动态设置页面隐藏
document.getElementsByTagName('html')[0].style.display = 'none'
</script>

<style lang="scss">
.wrap {
  width: 100%;
  height: 100vh;
  padding: 15px 0;
}
</style>
