<template>
   <el-table :load="state.loading" :data="state.tableData" tooltip-effect="dark" style="width: 100%;"
      @selection-change="handleSelectionChange">
      <slot name="column"></slot>
   </el-table>
   <!-- 标页码 -->
   <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.pageSize"
      :current-change="changePage">
   </el-pagination>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import axios from '@/utils/axios'

const props = defineProps({
   action: String
})

const state = reactive({
   loading: false,
   tableData: [], // 数据列表
   total: 0, // 总条数
   currentPage: 1, // 当前页
   pageSize: 10, // 分页大小
   multipleSelection: [] // 多选框
})

onMounted(() => {
   getList()
})

const getList = () => {
   state.loading = true
   axios.get(props.action, {
      params: {
         pageNumber: state.currentPage,
         pageSize: state.pageSize
      }
   }).then(res => {
      state.tableData = res.list
      state.total = res.totalCount
      state.currentPage = res.currPage
      state.loading = false
   })
}

// 选项
const handleSelectionChange = (val) => {
   state.multipleSelection = val
}

// 分页方法
const changePage = (val) => {
   state.currentPage = val
   getList()
}

</script>

<style scoped>

</style>