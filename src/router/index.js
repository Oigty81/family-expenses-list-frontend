import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import ExpensesViewPage from '@pages/ExpensesViewPage.vue';
import EditCategory from '@pages/EditCategory.vue';
import EditCategoryComposition from '@pages/EditCategoryComposition.vue';
import LoginMask from '@pages/LoginMask.vue';

import { useUserStore } from '@stores/user.js';

// -----------------------------------------------

const routes =[
  {
    path: '/',
    name: 'ExpensesViewPage',
    component: ExpensesViewPage,
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
  
  if (to.name !== 'LoginMask' && !userStore.isAuthenticated) {
    next({ name: 'LoginMask' });
  } else {
    next();
  }
});

export default router;
