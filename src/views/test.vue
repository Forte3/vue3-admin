<template>
   <el-card class="category-container">
      <el-table :load="state.loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
         @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55">
         </el-table-column>
         <el-table-column prop="categoryName" label="分类名称">
         </el-table-column>
         <el-table-column prop="categoryRank" label="排序值" width="120">
         </el-table-column>
         <el-table-column prop="createTime" label="添加时间" width="200">
         </el-table-column>
         <el-table-column label="操作" width="220">
            <template #default="scope">
               <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.categoryId)">修改</a>
               <a style="cursor: pointer; margin-right: 10px" @click="handleNext(scope.row)">下级分类</a>
               <el-popconfirm title="确定删除吗？" @confirm="handleDeleteOne(scope.row.categoryId)">
                  <template #reference>
                     <a style="cursor: pointer">删除</a>
                  </template>
               </el-popconfirm>
            </template>
         </el-table-column>
      </el-table>
      <!--总数超过一页，再展示分页器-->
      <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.pageSize"
         :current-page="state.currentPage" @current-change="changePage" />
   </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'

const props = defineProps({
   type: String, // 用于判断是添加还是编辑
   reload: Function // 添加或修改完后，刷新列表页
})

const formRef = ref(null)
const route = useRoute()
const state = reactive({
   visible: false,
   categoryLevel: 1,
   parentId: 0,
   ruleForm: {
      name: '',
      rank: ''
   },
   rules: {
      name: [
         { required: 'true', message: '名称不能为空', trigger: ['change'] }
      ],
      rank: [
         { required: 'true', message: '编号不能为空', trigger: ['change'] }
      ]
   },
   id: ''
})
// 获取详情
const getDetail = (id) => {
   axios.get(`/categories/${id}`).then(res => {
      state.ruleForm = {
         name: res.categoryName,
         rank: res.categoryRank
      }
      state.parentId = res.parentId
      state.categoryLevel = res.categoryLevel
   })
}
// 开启弹窗
const open = (id) => {
   state.visible = true
   if (id) {
      state.id = id
      // 如果是有 id 传入，证明是修改模式
      getDetail(id)
   } else {
      // 否则为新增模式
      // 新增类目，从路由获取分类 level 级别和父分类 id
      const { level = 1, parent_id = 0 } = route.query
      state.ruleForm = {
         name: '',
         rank: ''
      }
      state.parentId = parent_id
      state.categoryLevel = level
   }
}
// 关闭弹窗
const close = () => {
   state.visible = false
}
const submitForm = () => {
   formRef.value.validate((valid) => {
      if (valid) {
         if (props.type == 'add') {
            // 添加方法
            axios.post('/categories', {
               categoryLevel: state.categoryLevel, // 分类等级
               parentId: state.parentId, // 当前分类的父分类 id
               categoryName: state.ruleForm.name, // 分类名称
               categoryRank: state.ruleForm.rank // 分类权重
            }).then(() => {
               ElMessage.success('添加成功')
               state.visible = false
               // 接口回调之后，运行重新获取列表方法 reload
               if (props.reload) props.reload()
            })
         } else {
            // 修改方法
            axios.put('/categories', {
               categoryId: state.id,
               categoryLevel: state.categoryLevel,
               parentId: state.categoryLevel,
               categoryName: state.ruleForm.name,
               categoryRank: state.ruleForm.rank
            }).then(() => {
               ElMessage.success('修改成功')
               state.visible = false
               // 接口回调之后，运行重新获取列表方法 reload
               if (props.reload) props.reload()
            })
         }
      }
   })
}
</script>