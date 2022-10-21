import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import AddGood from '@/views/AddGood.vue'
import Login from '@/views/Login.vue'
import Swiper from '@/views/Swiper.vue'
import IndexConfig from '@/views/IndexConfig.vue'
import Good from '@/views/Good.vue'
import Order from '@/views/Order.vue'
import OrderDetail from '@/views/OrderDetail.vue'

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/add',
      name: 'add',
      component: AddGood
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: Swiper
    },
    {
      path: '/hot',
      name: 'hot',
      component: IndexConfig
    },
    {
      path: '/new',
      name: 'new',
      component: IndexConfig
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: IndexConfig
    },
    {
      path: '/good',
      name: 'good',
      component: Good
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: OrderDetail
    }
  ]
})

export default router