import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomersList from '@/views/CustomersList.vue'
import ProfileView from '@/views/ProfileView.vue'
import CustomerDetails from '@/views/CustomerDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersList
    },
    {
      path:'/customer/create',
      name: 'createCustomer',
      component: CustomerDetails
    },
    {
      path:'/customer/:_id/view',
      name: 'viewCustomer',
      component: CustomerDetails
    },
    {
      path:'/customer/:_id/edit',
      name: 'editCustomer',
      component: CustomerDetails
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
