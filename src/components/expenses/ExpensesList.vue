<script setup>
import { ref } from 'vue';

import moment from 'moment';

import { useLanguageDataStore  } from '@/stores/languageData';

import CustomDataTimeSelector from '@components/ui/CustomDataTimeSelector.vue';

const emit = defineEmits([
  'updatePrice', 'updateCreated', 'updateMetatext', 'deleteExpenses',
]);

defineProps({
    expensesData: { type: Array, required: true, default: () => {
            return [ ];
        }
    },
    tableHeight: { type: Number, required: false, default: () => {
        return 240;
      }
    },
});

const languageDataStore = useLanguageDataStore();

const pagination = ref({
        page: 1,
        rowsPerPage: 0,
        sortBy: 'created',
        descending: true,
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
        sortable: true,
        sort: (a, b, rowA, rowB) => parseFloat(a).toFixed(2) - parseFloat(b).toFixed(2),
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
    {
        name: 'controls',
        required: true,
        align: 'left',
        field: 'controls',
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
        :rows="expensesData"
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
        <template #body-cell-created="props">
          <q-td
          class="text-left"
          style="width: 200px;"
          >
            {{ languageDataStore.formatedDateTime('dt',props.row.created) }}
            <CustomDataTimeSelector
              :initial-date-time="props.row.created"
              @update="($e)=> {
                emit('updateCreated', {
                  id: props.row.id,
                  created: $e
                });
              }"
            />
          </q-td>
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