import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomersList from '@/views/CustomersList.vue'
import ProfileView from '@/views/ProfileView.vue'
import CustomerDetails from '@/views/CustomerDetails.vue'
import LoginComponent from '@/components/AuthComponents/LoginComponent.vue'
import RegisterComponent from '@/components/AuthComponents/RegisterComponent.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
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
    },
     // catch all redirect to home page
     { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      return '/login';
  }
});
