import { createApp } from 'vue'
import {
  ElButton,
  ElContainer,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElPopover,
  ElTag,
  ElCard,
  ElTable,
  ElUpload,
  ElDialog,
  ElPagination,
  ElTableColumn,
  ElPopconfirm,
  ElCascader,
  ElRadioGroup,
  ElRadio,

} from 'element-plus'
import App from './App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App) // 生成 Vue 实例 app

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局方法
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      // 当 url 以 http 开头时候， 返回原路径
      return url
    } else {
      // 否则给路径添加 host，如下
      url = `http://backend-api-02.newbee.ltd${url}`
      return url
    }
  }
}

app.use(router) // 引用路由实例

app.use(ElButton)
  .use(ElContainer)
  .use(ElAside)
  .use(ElMenu)
  .use(ElSubMenu)
  .use(ElMenuItemGroup)
  .use(ElMenuItem)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElCheckbox)
  .use(ElInput)
  .use(ElPopover)
  .use(ElTag)
  .use(ElCard)
  .use(ElTable)
  .use(ElUpload)
  .use(ElDialog)
  .use(ElPagination)
  .use(ElTableColumn)
  .use(ElPopconfirm)
  .use(ElCascader)
  .use(ElRadioGroup)
  .use(ElRadio)

app.mount('#app') // 挂载到 #app
