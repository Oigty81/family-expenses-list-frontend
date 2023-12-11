import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import MainDashboard from '@pages/MainDashboard.vue';
import EditCategory from '@pages/EditCategory.vue';
import EditCategoryComposition from '@pages/EditCategoryComposition.vue';
import AddExpenses from '@pages/AddExpenses.vue';
import ViewExpensesSimple from '@pages/ViewExpensesSimple.vue';
import LoginMask from '@pages/LoginMask.vue';

import { useUserStore } from '@stores/user.js';
import { useExpensesStore  } from '@/stores/expenses.js';

// -----------------------------------------------

const routes =[
  {
    path: '/',
    name: 'MainDashboard',
    component: MainDashboard,
    alias: '/dashboard',
  },
  {
    path: '/edit-category',
    name: 'EditCategory',
    component: EditCategory,
  },
  {
    path: '/edit-category-composition',
    name: 'EditCategoryComposition',
    component: EditCategoryComposition,
  },
  {
    path: '/add-expenses',
    name: 'AddExpenses',
    component: AddExpenses,
  },
  {
    path: '/view-expenses-simple',
    name: 'ViewExpensesSimple',
    component: ViewExpensesSimple,
    beforeEnter: () => {
      useExpensesStore().clearExpensesPeriod();
    }
  },
  {
    path: '/login',
    name: 'LoginMask',
    component: LoginMask,
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import('../pages/helper/ErrorNotFound.vue'),
  }
];

// ------------------------------------------------

let historyMode = undefined;

if(import.meta.env.VITE_LOCAL_HISTORY_MODE === 'true') {
  historyMode = createWebHistory();
} else {
  historyMode = createWebHashHistory();
}

// -----------------------------------------------

const router = createRouter({
  history: historyMode,
  routes
});

router.beforeEach((to, from, next) => {
  
  const userStore = useUserStore();
  
  if (to.name !== 'LoginMask' && !userStore.IsAuthenticated) {
    next({ name: 'LoginMask' });
  } else {
    next();
  }
});

export default router;
