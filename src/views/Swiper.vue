<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm title="确定删除吗？" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete">
          <template #reference>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table :load="state.loading" :data="state.swiperData" tooltip-effect="dark" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="轮播图" width="200">
        <template #default="scope">
          <img style="width: 150px; height: 150px;" :src="scope.row.carouselUrl" alt="轮播图" />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #defalut="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
    </el-table>
  </el-card>
  <!-- 轮播图组件 -->
  <DialogAddSwiper ref="addSwiper" :reload="getCarousels" :type="type" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
import DialogAddSwiper from '@/components/DialogAddSwiper.vue'
import { Delete } from '@element-plus/icons-vue';

const state = reactive({
  loading: false, //控制加载动画
  tableData: [], // 数据列表
  currentPage: 1, // 当前页数
  pageSize: 10, // 每页请求数
  type: 'add', // 操作类型
})

const addSwiper = ref(null)


onMounted(() => {
  getCarousels()

})

// 获取轮播图列表
const getCarousels = () => {
  state.loading = true
  axios.get('/carousels', {
    params: {
      pageNumber: state.currentPage,
      pageSize: state.pageSize
    }
  }).then(res => {
    state.tableData = res.list
    state.loading = false
  })
}

// 添加轮播项
const handleAdd = () => {
  state.type = 'add'
  addSwiper.value.open()
  console.log(addSwiper.value)
}

// 修改轮播图
const handleEdit = (id) => {
  state.type = 'edit'
  addSwiper.value.open(id)
}

</script>
<style scoped>

</style>