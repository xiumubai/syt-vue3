<template>
  <div>
    <div class="commodity">
      <!--// 左侧导航内容 -->
      <div class="leftNav" ref="leftNav">
        <ul>
          <li v-for="(item, index) in departmentList" :key="index"
              :class="{ typeStyle: index === currentIndex ,leftEventList: true}"
              ref="leftEventList"
              class="pointer"
              @click="onClickNav(index)">
            <span class="leftTit">{{ item.depname }}</span>
          </li>
        </ul>
      </div>
      <!--// 右侧商品内容 -->
      <div class="rightContent" ref="rightContent">
        <ul>
          <li
            class="rightEventList"
            ref="rightEventList"
            v-for="(item, index) in departmentList"
            :key="index">
            <div class="rightTtitle">{{ item.depname }}</div>
            <ul class="rightItemContainer">
              <li class="rightItem" v-for="(item2, index2) in item.children" :key="index">
                <span @click="handleItemClick(item2)" class="pointer">{{item2.depname}}</span>
              </li>
              <div style="height:1px"></div>
            </ul>
          </li>
          <li style="height:300px"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/*
* 左右联动组件
* */
import {defineComponent} from "vue";

export default defineComponent({
  name: "hospital_departments",
});
</script>
<script setup lang="ts">
import {ref, reactive, toRefs, computed, watch, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import BScroll from "better-scroll" //引入BScroll插件
import MouseWheel from '@better-scroll/mouse-wheel'
import {getDepartment} from "@/api/modules/hospital";
import {DepartmentInterfaceRes} from "@/api/modules/hospital/interface"; //引入BScroll滚动插件
BScroll.use(MouseWheel)

const props = defineProps({
  // 传入的数据
  code: {
    type: String,
    default: '',
    required: true,
  },
})
const router = useRouter()

const leftEventList = ref([])
const rightEventList = ref([])
const leftNav = ref()
const rightContent = ref()


// 数据对象
const scrollDataInfo = reactive({
  leftScrollY: 0, // 右侧滑动的时候距离顶部的值
  rightScrollY: 0, // 右侧滑动的时候距离顶部的值
  leftSide: [0], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化),
  leftNavItemIsVisibleList:[], // 左侧导航是否可见
  rightSide: [0], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
  leftScrollTarget: {}, // 左侧滚动对象
  rightScrollTarget: {}, // 右侧滚动对象

})
// 计算currentIndex
const currentIndex = computed(() => {
  const {
    rightScrollY,
    rightSide
  } = scrollDataInfo; //拿到每次滑动的值以及每一个分类的下标值
  //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置
  //获取数组rightSide中每一个下标值并筛选条件返回第一个元素索引位置
  let index = rightSide.findIndex((top, index) => {
    // rightScrollY>=当前top && rightScrollY<下一个top
    return rightScrollY >= top && rightScrollY < rightSide[index + 1];
  });
  // 判断index的临界值
  if (index < 0) {
    index = rightSide.length - 2;
  }

  // 返回结果
  return index;
})
// 医院科室列表数据
const departmentList = ref<DepartmentInterfaceRes[]>([])

// 请求初始渲染列表
const getShopList = async () => {
  const res =  await getDepartment(props.code);
  // console.log(data);
  // 将数据赋值给组件实例上的数据
  departmentList.value = res;
}
// item被点击
const handleItemClick = (item:DepartmentInterfaceRes) => {
  // 去往预约详情第二步
  router.push({
    name: 'registration_step_1',
    query: {
      code: props.code,
      hoscode: props.code,
      depcode: item.depcode,
    }
  })
}

// 初始化滚动
const initializeRoll = () => {
  // new一个类的实例，前提必须确保父元素和子元素的内容已经正确渲染了，不然不会生效
  scrollDataInfo.leftScrollTarget = new BScroll(".leftNav", {
    click: true,
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300,
      discreteTime: 400,
      throttleTime: 0,
      dampingFactor: 0.1,
    }
  });
  // 组件实例上挂属性
  scrollDataInfo.rightScrollTarget = new BScroll(".rightContent", {
    probeType: 2, // 因为惯性滑动不会触发
    click: true,
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300,
      discreteTime: 400,
      throttleTime: 0,
      dampingFactor: 0,
    }
  });

  // 给右侧列表绑定scroll监听
  (scrollDataInfo.rightScrollTarget as any).on("mousewheelMove", ({x, y}) => {
    scrollDataInfo.rightScrollY = Math.abs(y);
    leftNavBackToViewport();
  });
  // 给右侧列表绑定scroll结束的监听
  (scrollDataInfo.rightScrollTarget as any).on("scrollEnd", ({x, y}) => {
    console.log("操作结束的下标值" + x, y);
    scrollDataInfo.rightScrollY = Math.abs(y);
  });
}
// 初始化rightSide和leftSide
const initializeOwn = () => {
  // 初始化rightSide
  const leftSide: Array<any> = [];
  const rightSide: Array<any> = [];
  let leftTop = 0;
  let rightTop = 0;
  leftSide.push(leftTop);
  rightSide.push(rightTop);
  // 获取右侧元素可滚动距离
  const rightScrollDistance = getScrollDistance(rightContent.value);
  // slice() 方法返回一个新的数组对象
  Array.prototype.slice.call(rightEventList.value).forEach(li => {
    rightTop += li.clientHeight; //相当于top = top + li.clientHeight
    if (Math.abs(rightScrollDistance) < rightTop){
      rightTop = rightScrollDistance
    }
    rightSide.push(rightTop);
  });
  Array.prototype.slice.call(leftEventList.value).forEach(li => {
    leftTop += li.clientHeight; //相当于top = top + li.clientHeight
    leftSide.push(leftTop);
  });

  //更新数据
  scrollDataInfo.leftSide = [...leftSide];
  scrollDataInfo.rightSide = [...rightSide];
  console.log("每一个分类的下标" + scrollDataInfo.rightSide);
}
//左侧点击事件
const onClickNav = (index:number) => {
  console.log(index);
  //拿到目标位置的rightScrollY，点击左侧导航，右侧列表滑动到对应的位置
  const rightScrollY = scrollDataInfo.rightSide[index];
  // // 点击的分类成为当前分类，索引当前选中的导航标题
  scrollDataInfo.rightScrollY = rightScrollY;
  // 平滑滑动右侧列表
  (scrollDataInfo.rightScrollTarget as any).scrollTo(0, -rightScrollY, 1000);
}
// 当右侧滚动式 左侧选中的导航不是视口内时，将导航滚动到视口内
const leftNavBackToViewport = () => {
  const currentActiveIsView = isElementInView(leftEventList.value[currentIndex.value],leftNav.value)
  // 上方不可见，向上滚动
  if (!currentActiveIsView.topIsView) {
    (scrollDataInfo.leftScrollTarget as any).scrollTo(0, -scrollDataInfo.leftSide[currentIndex.value], 300);
  }
  // 下方不可见，向下滚动
  if (!currentActiveIsView.bottomIsView) {
    (scrollDataInfo.leftScrollTarget as any).scrollTo(0, -scrollDataInfo.leftSide[currentIndex.value + 1] + leftNav.value.clientHeight, 400);
  }
}
// 点击左侧时候，右边窗口是否在时候内，是的话不滚动
// 判断元素在父元素内是否可见
const isElementInView = (el: any, container: any) => {
  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    topIsView: elRect.top >= containerRect.top,
    bottomIsView: elRect.bottom <= containerRect.bottom,
    topDistance: elRect.top - containerRect.top,
    bottomDistance: elRect.bottom - containerRect.bottom,
  }
}
// 获取元素可滚动距离
const getScrollDistance = (el: any) => {
  const {scrollHeight, clientHeight} = el;
  console.log("可滚动距离", scrollHeight - clientHeight)
  return scrollHeight - clientHeight;
}
//组件挂载
onMounted(async () => {
  await getShopList(); //获取数据
  initializeRoll(); //滑动初始化方法
  initializeOwn(); //初始化rightSide方法
})


</script>
<style scoped lang="scss">
.commodity {
  /* 最大的盒子样式 */
  display: flex;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
}

.leftNav {
  /* 左侧大盒子的整体样式 */
  width: 80px;
  height: 500px;
  overflow: hidden;
  background: rgb(248, 248, 248);
}

.typeStyle {
  /* 左侧导航选中的样式 */
  background: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: rgb(255, 94, 121);
  justify-content: center;
  border-left: 2px solid rgb(255, 94, 121);
}

.leftTit {
  /* 左侧导航标题默认样式 */
  display: flex;
  height: 40px;
  justify-content: center;
  font-size: 12px;
  align-items: center;
}

.rightContent {
  /* 右侧大盒子的整体样式 */
  flex: 1;
  height: 500px;
  overflow: hidden;
}

.rightTtitle {
  /* 右侧标题样式 */
  padding-left: 12px;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(147, 153, 159);
  background: rgb(248, 248, 248);
  margin: 0;
}

.rightItemContainer{
  /* 右侧每一个的样式 */
  display: flex;
  flex-wrap: wrap;
  width: 880px;
  .rightItem {
    width: 33%;
    padding: 10px 20px;
  }
}





</style>
