import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/auth/LoginPage.vue'
import Signup from '@/components/auth/SignUPP.vue'
import ProviderTable from '@/components/Providers/ProviderTable.vue'
import InvoiceTable from '@/components/Invoices/InvoiceTable.vue'
import RoleSelection from '@/components/RoleSelection.vue'
import '@/assets/styles.css'

const routes = [
  { path: '/', component: RoleSelection }, // RoleSelection is now the first page
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { 
    path: '/InvoiceTable', 
    component: InvoiceTable,
    meta: { roles: ['Admin', 'Chef Accountant', 'Accountant'] } 
  },
  { 
    path: '/ProviderTable', 
    component: ProviderTable,
    meta: { roles: ['Admin', 'Chef Accountant'] } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole');

  if (to.path === '/' || to.path === '/login') {
    next(); // Allow access to role selection and login pages without a role
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    alert('Access Denied: You do not have permission to view this page.');
    return next('/InvoiceTable'); // Redirect to RoleSelection if unauthorized
  } else {
    next();
  }
});

export default router;
