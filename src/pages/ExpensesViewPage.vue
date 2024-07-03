<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';

import { useUiStore } from '@/stores/ui.js';
import { useAppStateStore  } from '@/stores/appState';
import { useLanguageDataStore  } from '@/stores/languageData';
import { useCategoriesDataStore } from '@/stores/categoriesData.js';
import { useExpensesDataStore  } from '@/stores/expensesData.js';

import DialogWrapperAutoHeight from '@/components/ui/DialogWrapperAutoHeight.vue';
import LanguageSelector from "@components/ui/LanguageSelector.vue";

import ExpensesListControlBoard from '@/components/expenses/ExpensesListControlBoard.vue';
import ExpensesList from '@/components/expenses/ExpensesList.vue';
import AddExpenses from '@/components/expenses/AddExpenses.vue';

const $q = useQuasar();

const uiStore = useUiStore();
const appStateStore = useAppStateStore();
const languageDataStore = useLanguageDataStore();
const categoriesDataStore = useCategoriesDataStore();
const expensesDataStore  = useExpensesDataStore();

let expensesPageFilters = {};
let timeoutLoadExpensesList = null;
let refreshHandler = null;

const loadExpensesListDebounced = async () => {
  clearTimeout(timeoutLoadExpensesList);
  timeoutLoadExpensesList = setTimeout(() => {
    expensesDataStore.fetchExpenses(expensesPageFilters);
  }, appStateStore.loadExpensesDebounceTime);
};

onMounted( async () => {
  $q.loading.show();
  await categoriesDataStore.fetchCategories();
  $q.loading.hide();
  refreshHandler = setInterval(()=> {
    loadExpensesListDebounced();
  }, appStateStore.intervalExpensesViewRefresh);
});

onUnmounted(() => {
    clearInterval(refreshHandler);
});

const onResizeExpensesListControlBoard = ($e) => {
  uiStore.heightExpensesListControlBoard = $e.height;
};

const onUpdateFilter = ($e) => {
  expensesPageFilters = $e;
  loadExpensesListDebounced();
};

const dlgAddExpensesVisible = ref(false);
const onAddExpenses = () => {
  dlgAddExpensesVisible.value = true;
};

const onCloseAddExpenses = async ($e) => {
  dlgAddExpensesVisible.value = false;
  console.log('sdgsdg', $e);
  await expensesDataStore.putExpenses($e);
  loadExpensesListDebounced();
};

</script>

<template>
  <div class="row q-mx-sm q-my-xs">
    <div class="col">
      <ExpensesListControlBoard
        @update-filter="onUpdateFilter"
        @add-expenses="onAddExpenses"
      />
      <q-resize-observer @resize="onResizeExpensesListControlBoard" />
    </div>
  </div>
  <div class="row q-mx-sm q-my-xs">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <ExpensesList
        :expenses-data="expensesDataStore.expensesForTableView"
        :table-height="uiStore.heightExpensesList"
      />
    </div>
  </div>
  <DialogWrapperAutoHeight
    :title="languageDataStore.getLanguageText('dlgAddExpenses')"
    :visible="dlgAddExpensesVisible"
    @dialog-closed="() => {
      dlgAddExpensesVisible = false;
    }"
  >
    <template #header>
      <div class="q-pr-md">
        <LanguageSelector />
      </div>
    </template>
    <AddExpenses
      @close-add="onCloseAddExpenses"
      @close-cancel="() => {
        dlgAddExpensesVisible = false;
      }"
    />
  </DialogWrapperAutoHeight>
</template>