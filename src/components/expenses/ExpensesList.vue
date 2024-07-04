<script setup>
import { ref, computed } from 'vue';

import { useAppStateStore  } from '@/stores/appState';
import { useLanguageDataStore  } from '@/stores/languageData';
import { useExpensesDataStore  } from '@/stores/expensesData.js';

import CustomDataTimeSelector from '@components/ui/CustomDataTimeSelector.vue';
import ExpensesListEditPrice from '@components/expenses/ExpensesListEditPrice.vue';
import ExpensesListEditMetatext from '@components/expenses/ExpensesListEditMetatext.vue';

const emit = defineEmits([
  'updatePrice', 'updateCreated', 'updateMetatext', 'deleteExpenses',
]);

defineProps({
    tableHeight: { type: Number, required: false, default: () => {
        return 240;
      }
    },
});

const appStateStore = useAppStateStore();
const languageDataStore = useLanguageDataStore();
const expensesDataStore  = useExpensesDataStore();

const pagination = ref({
        page: 1,
        rowsPerPage: 0,
        sortBy: 'created',
        descending: true,
      });

const columns = computed(() => [
    {
        name: 'displayname',
        required: true,
        label: languageDataStore.getLanguageText('expensesListColumnUser'),
        align: 'left',
        field: 'displayname',
        sortable: true
    },
    {
        name: 'categoryCompositionText',
        required: true,
        label: languageDataStore.getLanguageText('expensesListColumnCategoryComposition'),
        align: 'left',
        field: 'categoryCompositionText',
        sortable: false
    },
    {
        name: 'price',
        required: true,
        label: languageDataStore.getLanguageText('expensesListColumnPrice'),
        align: 'left',
        field: 'price',
        sortable: true,
        sort: (a, b, rowA, rowB) => parseFloat(a).toFixed(2) - parseFloat(b).toFixed(2),
    },
    {
        name: 'created',
        required: true,
        label: languageDataStore.getLanguageText('expensesListColumnCreated'),
        align: 'left',
        field: 'created',
        sortable: true
    },
    {
        name: 'metatext',
        required: true,
        label: languageDataStore.getLanguageText('expensesListColumnMetatext'),
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
      <div v-if="expensesDataStore.expensesForTableView.length !== undefined && expensesDataStore.expensesForTableView.length > 0">
        <q-table
          v-model:pagination="pagination"
          class="this-q-table"
          :style="{height: tableHeight +'px'}"
          :rows="expensesDataStore.expensesForTableView"
          :columns="columns"
          :hide-bottom="true"
          row-key="name"
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
          <template #body-cell-price="props">
            <q-td
            class="text-left"
            >
              {{ props.row.price }}
              <i class="q-ml-sm fa-solid fa-pencil">
                <q-popup-edit
                  v-slot="scope"
                  class="popup-edit"
                >
                  <ExpensesListEditPrice
                    :current-price="props.row.priceRaw"
                    @update-price="($e) => {
                      emit('updatePrice', {
                        id: props.row.id,
                        price: $e
                      });
                      scope.set();
                    }"
                  />
                </q-popup-edit>
              </i>
              
            </q-td>
          </template>
          <template #body-cell-created="props">
            <q-td
            class="text-left"
            style="width: 200px;"
            >
              {{ languageDataStore.formatedDateTime('dt',props.row.created) }}
              <CustomDataTimeSelector
                :initial-date-time="props.row.created"
                @update="($e) => {
                  emit('updateCreated', {
                    id: props.row.id,
                    created: $e
                  });
                }"
              />
            </q-td>
          </template>
          <template #body-cell-metatext="props">
            <q-td
            class="text-left"
            >
              {{ props.row.metatext }}
              <i class="q-ml-sm fa-solid fa-pencil">
                <q-popup-edit
                  v-slot="scope"
                  class="popup-edit"
                >
                  <ExpensesListEditMetatext
                    :current-metatext="props.row.metatext"
                    @update-metatext="($e) => {
                      emit('updateMetatext', {
                        id: props.row.id,
                        metatext: $e
                      });
                      scope.set();
                    }"
                  />
                </q-popup-edit>
              </i>
            </q-td>
          </template>
          <template #body-cell-controls="props">
            <q-td
            class="text-left"
            style="width: 80px;"
            >
              <q-btn
                outline
                no-caps
                size="md"
                color="primary"
                @click.stop="emit('deleteExpenses', props.row.id);"
              >
                <i class="fa-solid fa-trash"></i>
                <q-tooltip
                  class="tooltip-1"
                  :delay="appStateStore.tooltipDelay"
                  anchor="bottom left"
                >
                  {{ languageDataStore.getLanguageText('tooltipDeleteExpenses') }}
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
        <div class="text-h6 text-green text-right">{{ languageDataStore.getLanguageText('expensesListTotal') }}: {{ expensesDataStore.expensesSet.total.toFixed(2)}} € </div>
      </div>
      <p v-else class="text-h4 text-red">
        {{ languageDataStore.getLanguageText('expensesListNoData') }}
      </p>
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