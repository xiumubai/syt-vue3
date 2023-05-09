<template>
  <el-upload
    v-model:file-list="fileList"
    action='http://syt.atguigu.cn/api/oss/file/fileUpload?fileHost=userAuah'
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
    v-bind="$attrs"
  >
    <div>
      <div v-if="props.samplePicture" class="sample_picture">
        <img :src="props.samplePicture" alt="">
      </div>
      <el-icon v-else><Plus /></el-icon>
    </div>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts">
/*
对外暴露了 init初始化方法 当初次渲染时，父组件图片列表数据第一次获取到的时候，可在父组件内调用此函数
defineExpose({ init })
* */
import { defineComponent} from "vue"
export default defineComponent({
  name: "upload_img_page"
})
</script>
<script lang="ts" setup>
import { ref,onMounted, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'
import {ElMessage} from "element-plus";
const props = defineProps({
  samplePicture: {
    type: String,
    default: ''
  },
  updateUpLoadFileListHandler: {
    type: Function ,
    required: true,
  },
  limit: {
    type: Number,
    default: 1
  }
})
const fileList = ref<UploadUserFile[]>([
])
const init = (newFileList:any[]) => {
  fileList.value = newFileList
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('uploadFile',uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile',rawFile)
  if (fileList.value.length >= props.limit) {
    ElMessage.error(`最多只能上传${props.limit}张图片!`)
    return false
  }
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true
}
// 监视图片上传列表
watch(fileList, (newVal, oldVal) => {
  props.updateUpLoadFileListHandler(newVal)
})
// 主动暴露childMethod方法
defineExpose({ init })
// 挂载
onMounted(() => {
  init([])
})
</script>
<style lang="scss" scoped>
  .sample_picture {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
