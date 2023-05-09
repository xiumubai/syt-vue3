<template>
  <div class="wrapper" v-if="bookingScheduleRule?.baseMap?.hosname">
    <div class="page_header">
      <span class="pointer hosname" @click="router.back()">{{ bookingScheduleRule.baseMap.hosname }}</span>
      <span class="m-r-10 m-l-10">|</span>
      <span>{{ bookingScheduleRule.baseMap.bigname }}</span>
      <span class="m-r-10 m-l-10">·</span>
      <span>{{ bookingScheduleRule.baseMap.depname }}</span>
    </div>
    <!--    预约日程-->
    <div class="schedule_container">
      <div class="schedule_title">{{ bookingScheduleRule.baseMap.workDateString }}</div>
      <div class="schedule_list m-t-20 m-b-20">
        <div
          :class="{
          'schedule_item_blue': item.workDate === checkedBookingScheduleInfo.workDate,
          'schedule_item_gray': item.availableNumber === -1,

        }"
          class="schedule_item m-r-20 pointer"
          v-for="(item,index) in bookingScheduleRule.bookingScheduleList"
          @click="bookingScheduleDateClickHandle(item)"
          :key="item.workDateMd">
          <div class="date-wrapper m-b-10">
            <span>{{ item.workDate }}</span>
            <span class="week">{{ item.dayOfWeek }}</span>
          </div>
          <div v-if="item.status == 0">
            {{ item.availableNumber == -1 ? '无号' : item.availableNumber == 0 ? '约满' : '有号' }}
          </div>
          <div v-if="item.status == 1">即将放号</div>
          <div v-if="item.status == -1">停止挂号</div>
        </div>

      </div>
      <el-pagination
        layout="prev, pager, next"
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="pageInfo.total"/>
    </div>
    <!--    即将放号-->
    <div v-show="checkedBookingScheduleInfo.status === 1" class="future_queue_container m-t-30">
      <div class="future_queue_time">
        <span>
          {{ getNextDateTime(bookingScheduleRule.baseMap.releaseTime)  }}
        </span>
        放号
      </div>
    </div>
    <!--    预约号源-->
    <div v-show="checkedBookingScheduleInfo.status !== 1" class="queue_container">
      <!--      上午号源-->
      <div class="queue_item">

        <div class="queue_title">
          <el-icon color="#409EFC" size="20">
            <Sunny/>
          </el-icon>
          上午号源
        </div>
        <el-row class="queue m-t-20" v-for="item in morningScheduleList" :key="item.id">
          <el-col :span="18">
            <div class="queue_left">
              <div class="queue_left_top m-b-10">
                <span>{{ item.title }}</span>
                <span class="m-r-10 m-l-10">|</span>
                <span>{{ item.docname }}</span>
              </div>
              <div class="queue_left_bottom">
                <span>{{ item.skill }}</span>
              </div>
            </div>

          </el-col>
          <el-col :span="2">
            <div class="queue_center">￥{{ item.amount }}</div>

          </el-col>
          <el-col :span="4">
            <el-button @click="handleClickQueueItem(item)" :disabled="item.availableNumber == 0 || checkedBookingScheduleInfo.status === -1" type="primary"
                       style="width:100px" size="large">剩余{{ item.availableNumber }}
            </el-button>

          </el-col>
        </el-row>
      </div>
      <!--      下午号源-->
      <div class="queue_item m-t-30">

        <div class="queue_title">
          <el-icon color="#409EFC" size="20">
            <Sunrise/>
          </el-icon>
          下午号源
        </div>
        <el-row class="queue m-t-20" v-for="item in afternoonScheduleList" :key="item.id">
          <el-col :span="18">
            <div class="queue_left">
              <div class="queue_left_top m-b-10">
                <span>{{ item.title }}</span>
                <span class="m-r-10 m-l-10">|</span>
                <span>{{ item.docname }}</span>
              </div>
              <div class="queue_left_bottom">
                <span>{{ item.skill }}</span>
              </div>
            </div>

          </el-col>
          <el-col :span="2">
            <div class="queue_center">￥{{ item.amount }}</div>

          </el-col>
          <el-col :span="4">
            <el-button @click="handleClickQueueItem(item)" :disabled="item.availableNumber == 0 || checkedBookingScheduleInfo.status === -1" type="primary"
                       style="width:100px" size="large">剩余{{ item.availableNumber }}
            </el-button>

          </el-col>
        </el-row>
      </div>
    </div>


  </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRefs, computed, watch, onMounted} from "vue"
import {useRoute, useRouter} from "vue-router"
import {getBookingScheduleRule, findScheduleList} from "@/api/modules/hospital"
import {
  BookingScheduleDateInterface,
  BookingScheduleRuleInterfaceRes,
  ScheduleListInterfaceRes
} from "@/api/modules/hospital/interface";
import {usePage} from "@/hooks/usePagination";
import { dayjs } from 'element-plus'
const router = useRouter()
const route = useRoute()
const hoscode = ref(route.query.hoscode as string)
const depcode = ref(route.query.depcode as string)
// 分页hooks
const {pageInfo, sizeChange, currentChange} = usePage({
  callback: () => {
    getBookingScheduleRuleHandle()
  }
})
pageInfo.pageSize = 6

// 当前预约的日期
const checkedBookingScheduleInfo = ref({} as BookingScheduleDateInterface)
// 预约详情
const bookingScheduleRule = ref({} as BookingScheduleRuleInterfaceRes)
// 日程列表
const scheduleList = ref<ScheduleListInterfaceRes[]>([])
// 计算出上午号源
const morningScheduleList = computed(() => {
  return scheduleList.value.filter(item => item.workTime === 0)
})
// 计算出下午号源
const afternoonScheduleList = computed(() => {
  return scheduleList.value.filter(item => item.workTime === 1)
})


/* 方法 */
// 获取预约详情
const getBookingScheduleRuleHandle = async () => {
  try {
    // (page:number, limit:number, hoscode:string, depcode:string)
    const res = await getBookingScheduleRule(pageInfo.currentPage, pageInfo.pageSize, hoscode.value, depcode.value)
    bookingScheduleRule.value = res
    pageInfo.total = res.total

  } catch (error) {
    console.log(error)
  }
}
// 获取日程列表
const getScheduleListHandle = async () => {
  // (hoscode:string, depcode:string, workDate:string)
  try {
    const res = await findScheduleList(hoscode.value, depcode.value, checkedBookingScheduleInfo.value.workDate)
    scheduleList.value = res
  } catch (error) {
    console.log(error)
  }
}
// 预约日期被点击
const bookingScheduleDateClickHandle = (item: BookingScheduleDateInterface) => {
  checkedBookingScheduleInfo.value = item
  getScheduleListHandle()
}
// 点击号源预约
const handleClickQueueItem = (item: ScheduleListInterfaceRes) => {
  console.log('item',item)
  // 跳转到预约确认页面
  router.push({
    name: 'registration_step_2',
    query:{scheduleId:item.id}
  })
}

function getNextDateTime(timeString: string): string {
  const now = new Date();
  const [hour, minute] = timeString.split(':').map((value) => parseInt(value, 10));
  let date:Date
  if (now.getHours() > hour || (now.getHours() === hour && now.getMinutes() >= minute)) {
    // 当前时间已经过了今天的时间点，返回明天的对应日期对象
    date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute)
  } else {
    // 当前时间还未到达今天的时间点，返回今天的对应日期对象
    date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)
  }
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');

}
/* 生命周期 */
// 挂载
onMounted(async () => {
  await getBookingScheduleRuleHandle()
  // 设置初始预约日期
  checkedBookingScheduleInfo.value = bookingScheduleRule.value.bookingScheduleList[0]
  await getScheduleListHandle()
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100vh;
  padding: 15px 0;
}

.page_header {

  .hosname:hover {
    cursor: pointer;
    color: #1890ff;
  }
}

.schedule_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  .schedule_title {
    font-size: 14px;
    font-weight: bold;
  }

  .schedule_list {
    display: flex;
    width: 100%;

    .schedule_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 10px;
      border: 1px solid #409EFF;
      transition: all 0.3s ease-out;

      .date-wrapper {
        display: flex;
        align-items: center;
        background-color: #e8f2ff;
        width: 100%;
        height: 30px;
        padding: 10px;

        span {
          font-size: 14px;
          font-weight: bold;
          margin-right: 5px;
        }

        .week {
          font-size: 12px;
        }
      }
    }

    .schedule_item_blue {
      border: 2px solid #409EFF;
      color: #409EFF;
      font-weight: bold !important;
      transform: scale(1.1);
    }

    .schedule_item_gray {
      border: 2px solid #ccc;
      font-weight: bold !important;
      color: #7f7f7f;

      .date-wrapper {
        background-color: #ccc;
      }
    }

  }

}

.queue_container {
  display: flex;
  flex-direction: column;


  .queue_item {
    .queue_title {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 16px;
    }

    .queue {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;

      .queue_left {
        display: flex;
        flex-direction: column;

        .queue_left_top {
          display: flex;
          width: 100%;
          font-size: 16px;
          color: #409EFF;
        }

      }
    }

  }

}
.future_queue_container{
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 20px;
  .future_queue_time{
    span{
      color: #409EFF;
      font-weight: bold;
    }

  }
}
</style>
