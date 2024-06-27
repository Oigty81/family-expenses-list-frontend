<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

import { useUiStore } from '@/stores/ui.js';
import { useCategoriesDataStore } from '@/stores/categoriesData.js';
import { useExpensesDataStore  } from '@/stores/expensesData.js';

import ExpensesListControlBoard from '@/components/expenses/ExpensesListControlBoard.vue';
import ExpensesList from '@/components/expenses/ExpensesList.vue';

const $q = useQuasar();

const uiStore = useUiStore();
const categoriesDataStore = useCategoriesDataStore();
const expensesDataStore  = useExpensesDataStore();

onMounted( async () => {
  $q.loading.show();
  await categoriesDataStore.fetchCategories({});
  $q.loading.hide();
});

const onUpdateFilter = ($e) => {
  expensesDataStore.fetchExpenses($e);
};

</script>

<template>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <ExpensesListControlBoard
        @update-filter="onUpdateFilter"
      />
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <ExpensesList
        :expenses-data="expensesDataStore.expensesForTableView"
        :table-height="uiStore.heightContent"
      />
    </div>
  </div>
</template>