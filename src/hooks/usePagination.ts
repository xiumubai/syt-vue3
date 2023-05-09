// 分页hooks
import { reactive } from "vue"

export const usePage = ({ callback }: { callback: any }) => {
  // 定义翻页属性
  const pageInfo = reactive({
    currentPage: 1,// 当前页
    pageSize: 10,// 每页数量
    total: 0 // 总条目数
  })

  const sizeChange = (pageSize: number) => {
    console.log("sizeChange", pageSize)
    pageInfo.pageSize = pageSize
    callback()
  }
  const currentChange = (currentPage: number) => {
    console.log("currentPage", currentPage)
    pageInfo.currentPage = currentPage
    callback()
  }
  return {
    pageInfo,
    sizeChange,
    currentChange
  }
}
