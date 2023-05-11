<template>
  <div class="card_wrapper" >
    <OrderDetails v-if="route.query && route.query.id"/>
    <OrderData v-else/>
  </div>
  <!--  <el-skeleton v-else :rows="9" animated />-->
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "order_page"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import OrderData from "@/views/user/order/order_data/order_data.vue";
import OrderDetails from "@/views/user/order/order_details/order_details.vue";
const route = useRoute()

// 挂载
onMounted(() => {

})

</script>

<style lang="scss" scoped>
.box_card{
  min-height: 600px;
}
.card_header{
  font-size:21px;
}
</style>
