<script setup>

import { ref, watch, onMounted } from 'vue';

import { storeToRefs } from 'pinia';

import { useQuasar } from 'quasar';

import { useCategoriesStore } from '@/stores/categories.js';
import { useExpensesStore  } from '@/stores/expenses.js';

import SearchBarSimple from '@components/SearchBarSimple.vue';
import ExpensesTableSimple from '@components/ExpensesTableSimple.vue';

const $q = useQuasar();

const initialView = ref(true);

const categoriesStore = useCategoriesStore();
const expensesStore  = useExpensesStore();

const expensesStoreRefs = storeToRefs(expensesStore);

onMounted( async () => {
  $q.loading.show();
  await categoriesStore.fetchCategories();
  $q.loading.hide();
});

watch(expensesStoreRefs.getExpensesPeriodForTableView, () => {
    initialView.value = false;
  }, {deep: false, immediate: false }
);

</script>

<template>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <SearchBarSimple />
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
  <div
    v-if="!initialView"
    class="row q-mx-sm q-mt-sm"
  >
    <div
      v-if="expensesStore.getExpensesPeriodForTableView.length > 0"
      class="col"
    >
      <div class="row q-mx-sm q-mt-sm">
        <div class="col">
          <ExpensesTableSimple />
        </div>
      </div>
      <div class="row q-mx-sm q-mt-sm">
        <div class="col">
          <h5 class="text-right">
            Total: {{ expensesStore.getExpensesPeriodTotal.toLocaleString() }} €
          </h5>
        </div>
      </div>
    </div>
    <div
      v-else
      class="col"
    >
      <h5 class="q-mx-sm text-red">
        No Expenses found within this time period.
      </h5>
    </div>
  </div>
  <div
    v-else
    class="q-mx-md"
  >
    <h5 class="text-grey">
      Choose time period and click search for show stored expenses.
    </h5>
  </div>
</template>