<template>
  <div class="hospital_wrapper card">
    <div class="hospital_left">
      <CascadeSelection title="医院" />
      <CascadeSelection
        :data="pageData.levelDataList"
        :activeId="checkedInfo.hostype"
        needChangeAttr="hostype"
        :changeCheckedActiveIdHandler="changeCheckedActiveIdHandler"
        title="等级:"
      />
      <CascadeSelection
        :data="pageData.districtDataList"
        :activeId="checkedInfo.districtCode"
        needChangeAttr="districtCode"
        :changeCheckedActiveIdHandler="changeCheckedActiveIdHandler"
        title="地区:"
      />
      <!--      医院列表-->
      <div class="hospital_List">
        <template v-for="(item, index) in pageData.hospitalList" :key="item.id">
          <HospitalCard :data="item" />
        </template>
      </div>
      <el-empty v-if="pageData.hospitalList.length === 0" :image-size="200" />
      <!--        分页-->
      <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="prev, pager, next,sizes,total"
        :total="pageInfo.total"
        :style="{ marginTop: '20px' }"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
    <div class="hospital_right">
      <LinkCardDepartments />
      <LinkCardInfo :data="pageData.platformAnnouncementInfo">
        <AlertOutlined :style="{ color: '#7eacff' }" />
      </LinkCardInfo>
      <LinkCardInfo :data="pageData.discontinuationNotice">
        <BellOutlined :style="{ color: '#ffab51' }" />
      </LinkCardInfo>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "hospital_home"
})
</script>
<script setup lang="ts">
import { ref, reactive, toRefs, computed, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import CascadeSelection from "@/views/home/hospital_home/cascade_selection/cascade_selection.vue"
import HospitalCard from "@/views/home/hospital_home/hospital_card/hospital_card.vue"
import {getPageList, findByDictCode, getByHosname, getAreaList} from "@/api//modules/home"
import { usePage } from "@/hooks/usePagination"
import LinkCardDepartments from "@/views/home/hospital_home/link_card/link_card_departments.vue"
import LinkCardInfo from "@/views/home/hospital_home/link_card/link_card_info.vue"
import {
  AlertOutlined,
  BellOutlined,
} from "@ant-design/icons-vue"
import {AreaInterfaceRes, HospitalInfoInterface, HospitalLevelInterfaceRes} from "@/api/modules/home/interface";

const pageData = reactive({
  levelDataList: [] as HospitalLevelInterfaceRes[],
  districtDataList: [] as AreaInterfaceRes[],
  hospitalList: [] as HospitalInfoInterface[],
  platformAnnouncementInfo: {
    leftTitle: "平台公告",
    rightTitle: "全部",
    titleLink: "",
    dotColor: "#7eacff",
    list: [
      {
        value: "关于延长北京大学国际医院放假的通知",
        id: "关于延长北京大学国际医院放假的通知",
        url: ""
      },
      {
        value: "北京中医药大学东方医院部分科室医生门诊医",
        id: "北京中医药大学东方医院部分科室医生门诊医",
        url: ""
      },
      {
        value: "武警总医院号源暂停更新通知",
        id: "武警总医院号源暂停更新通知",
        url: ""
      }
    ]
  },
  discontinuationNotice: {
    leftTitle: "停诊公告",
    rightTitle: "全部",
    titleLink: "",
    dotColor: "#ffab51",
    list: [
      {
        value: "中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告",
        id: "中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告",
        url: ""
      },
      {
        value: "首都医科大学附属北京潞河医院老年医学科门诊停诊公告",
        id: "首都医科大学附属北京潞河医院老年医学科门诊停诊公告",
        url: ""
      },
      {
        value: "中日友好医院中西医结合心内科门诊停诊公告",
        id: "中日友好医院中西医结合心内科门诊停诊公告",
        url: ""
      }
    ]
  }
})
// 选中的数据
const checkedInfo = reactive({
  hostype: "", // 医院等级value
  districtCode: "" // 地区value
})
// 改变选中活跃Id方法
const changeCheckedActiveIdHandler = (attr: string, value: string) => {
  checkedInfo[attr as keyof typeof checkedInfo] = value
}
// 获取医院等级列表
const getHospitalList = async () => {
  try {
    const res = await findByDictCode("Hostype")
    const whole = {
      id: 0,
      createTime: "",
      updateTime: "",
      isDeleted: 0,
      param: {},
      parentId: 0,
      name: "全部",
      value: "",
      dictCode: "",
      hasChildren: false
    }
    pageData.levelDataList = [whole, ...res]
  } catch (error) {
    console.log(error)
  }
}
// 获取地区列表
const getDistrictList = async () => {
  try {
    const res = await getAreaList("Beijin")
    const whole = {
      id: 0,
      createTime: "",
      updateTime: "",
      isDeleted: 0,
      param: {},
      parentId: 0,
      name: "全部",
      value: "",
      dictCode: null,
      hasChildren: false
    }
    pageData.districtDataList = [whole, ...res]
  } catch (error) {
    console.log(error)
  }
}
// 分页获取医院
const getHospitalPage = async () => {
  try {
    const res = await getPageList(pageInfo.currentPage, pageInfo.pageSize, {
      hostype: checkedInfo.hostype,
      districtCode: checkedInfo.districtCode
    })
    pageData.hospitalList = res.content
    pageInfo.currentPage = res.number + 1
    pageInfo.pageSize = res.size
    pageInfo.total = res.totalElements
  } catch (error) {
    console.log(error)
  }
}
// 分页hooks
const { pageInfo, sizeChange, currentChange } = usePage({ callback: getHospitalPage })
// 监视checkedInfo数据变化
watch(checkedInfo, () => {
  getHospitalPage()
})
// 挂载
onMounted(() => {
  getHospitalList()
  getDistrictList()
  getHospitalPage()
})
</script>

<style lang="scss" scoped>
.hospital_wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  .hospital_left {
    min-height: 500px;
    width: 960px;
  }

  .hospital_right {
    width: 200px;
  }
}

.hospital_List {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
