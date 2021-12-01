import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/pages/Tabela'),
    },
    {
      path: '/login',
      component: () => import('@/views/dashboard/pages/Login'),
    },
    {
      path: '/tabela/json',
      component: () => import('@/views/dashboard/pages/Json'),
    },
    // {
    //   path: '/',
    //   component: () => import('@/views/dashboard/pages/Tabela'),
    // },
    {
      path: '/sms-verification',
      component: () => import('@/views/dashboard/pages/SmsVerification'),
    },
    {
      path: '/user/exit',
      component: () => import('@/views/dashboard/pages/user/Logout'),
    },
    {
      path: '/exit',
      component: () => import('@/views/dashboard/pages/Logout'),
    },
    {
      path: '/admin/login',
      component: () => import('@/views/dashboard/pages/Login'),
    },
    {
      path: '/soon',
      component: () => import('@/views/dashboard/pages/soon'),
    },
    {
      path: '/*',
      component: () => import('@/views/dashboard/Index'),
      redirect: '/dashboard',
    },
  ],
})