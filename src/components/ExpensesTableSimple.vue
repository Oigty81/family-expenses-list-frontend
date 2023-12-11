<script setup>
import { ref } from 'vue';

import { useExpensesStore  } from '@/stores/expenses.js';

const expensesStore  = useExpensesStore();

defineProps({
    tableHeight: { type: Number, required: false, default: () => {
        return 240;
      }
    },
});

const pagination = ref({
        page: 1,
        rowsPerPage: 0
      });

const columns = ref([
    {
        name: 'displayname',
        required: true,
        label: 'User',
        align: 'left',
        field: 'displayname',
        sortable: true
    },
    {
        name: 'categoryCompositionText',
        required: true,
        label: 'Category-Composition',
        align: 'left',
        field: 'categoryCompositionText',
        sortable: false
    },
    {
        name: 'price',
        required: true,
        label: 'Price',
        align: 'left',
        field: 'price',
        sortable: true
    },
    {
        name: 'created',
        required: true,
        label: 'Created',
        align: 'left',
        field: 'created',
        sortable: true
    },
    {
        name: 'metatext',
        required: true,
        label: 'Metatext',
        align: 'left',
        field: 'metatext',
        sortable: false
    },
]);

</script>

<template>
  <div class="row">
    <div class="col">
      <q-table
        v-model:pagination="pagination"
        class="this-q-table"
        :style="{height: tableHeight +'px'}"
        :rows="expensesStore.getExpensesPeriodForTableView"
        :columns="columns"
        :hide-bottom="true"
        row-key="name"
        :rows-per-page-options="[0]"
        virtual-scroll
        :virtual-scroll-item-size="4"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="my-table-header"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.this-q-table {
      thead tr th {
          position: sticky;
          z-index: 1;
          background-color: $primary;
      }
  
      thead tr:first-child th {
          top: 0
      }
}

.my-table-header {
    font-size: 1rem;
}
</style>