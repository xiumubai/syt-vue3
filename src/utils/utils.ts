// 递归树形结构获取指定属性
export const getTreeDataProperty = (data: any, key: string, subChildrenName = "children") => {
  let arr: any = []
  data.forEach((item: any) => {
    arr.push(item[key])
    if (item[subChildrenName]?.length) {
      arr = arr.concat(getTreeDataProperty(item[subChildrenName], key))
    }
  })
  return arr
}
