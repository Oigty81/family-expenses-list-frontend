<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

import { useCategoriesStore } from '@/stores/categories.js';
import { useExpensesStore  } from '@/stores/expenses.js';

const $q = useQuasar();

const categoriesStore = useCategoriesStore();
const expensesStore  = useExpensesStore();

onMounted( async () => {
  $q.loading.show();
  await categoriesStore.fetchCategories();
  $q.loading.hide();
});

</script>

<template>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      ...
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
</template>