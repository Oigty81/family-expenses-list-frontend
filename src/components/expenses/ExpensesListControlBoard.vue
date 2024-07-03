<script setup>
import { ref, watch, onBeforeUpdate } from 'vue';

import moment from 'moment';

import CustomDateRange from '@/components/ui/CustomDateRange.vue';

import { useAppStateStore  } from '@/stores/appState';
import { useLanguageDataStore  } from '@/stores/languageData';
import { useCategoriesDataStore } from '@/stores/categoriesData';

const emit = defineEmits(['updateFilter', 'addExpenses']);

const appStateStore = useAppStateStore();
const languageDataStore = useLanguageDataStore();
const categoriesDataStore  = useCategoriesDataStore();

const filterOptions = ref({});
const dateRange = ref([]);
const categoriesModel = ref([]);
const metatextFilterModel = ref("");

onBeforeUpdate(() => {
    if(appStateStore.expensesPageFilters.daterangeFilter !== undefined) {
      dateRange.value = [appStateStore.expensesPageFilters.daterangeFilter.from, appStateStore.expensesPageFilters.daterangeFilter.to]; //NOTE: set possible dater ange initial filter values
    } else {
      dateRange.value = [];
    }
});

watch(filterOptions, () => {
  appStateStore.expensesPageFilters = filterOptions.value;
  emit('updateFilter');
  }, {deep: true, immediate: false }
);

watch(categoriesModel, () => {
    if(categoriesModel.value.length > 0) {
      let categoriesFilter = [];
      categoriesModel.value.forEach(e => {
        categoriesFilter.push(e.id);
     });
     filterOptions.value.categoriesFilter = categoriesFilter;
    } else {
      delete filterOptions.value.categoriesFilter;
    }
    
  }, {deep: true, immediate: false }
);

watch(metatextFilterModel, () => {
    if(metatextFilterModel.value.length > 0) {
     filterOptions.value.metatextFilter = metatextFilterModel.value;
    } else {
      delete filterOptions.value.metatextFilter;
    }
  }, {deep: false, immediate: false }
);

const onChangeDatetimeRange = (e) => {
  if((e !== null && e !== undefined) && e.length === 2) {
    filterOptions.value.daterangeFilter = {
      from: e[0],
      to: e[1],
    };
  } else {
    delete filterOptions.value.daterangeFilter;
  }
};

</script>

<template>
  <div class="row">
    <div class="col-lg-3 col-sm-6 col-12 q-mt-md q-px-sm">
      <q-btn
        outline
        no-caps
        class="q-mt-sm"
        color="primary"
        size="16px"
        @click="() => { emit('addExpenses'); }"
      >
        <i class="fa-solid fa-file-circle-plus" />
        <q-tooltip
          class="tooltip-1"
          :delay="appStateStore.tooltipDelay"
          anchor="bottom right"
        >
          {{ languageDataStore.getLanguageText('tooltipAddExpenses') }}
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-lg-3 col-sm-6 col-12 q-mt-md q-px-sm">
      <CustomDateRange
        :label="languageDataStore.getLanguageText('labelExpensesPeriod')"
        :datetime-range-strings="dateRange"
        :position="{x: 20, y:180}"
        @update-date-range="($e) => { onChangeDatetimeRange($e); }"
      />
    </div>
    <div class="col-lg-3 col-sm-6 col-12 q-mt-md q-px-sm">
      <q-select
        v-model="categoriesModel"
        filled
        multiple
        stack-label
        :options="categoriesDataStore.categoryDataForSelector"
        :label="languageDataStore.getLanguageText('labelCategorySelector')"
      >
        <template #append>
          <q-icon
            v-if="categoriesModel.length !== 0"
            class="cursor-pointer"
            name="clear"
            @click.stop.prevent="categoriesModel = []"
          />
        </template>
      </q-select>
    </div>
    <div class="col-lg-3 col-sm-6 col-12 q-mt-md q-px-sm">
      <q-input
        v-model="metatextFilterModel"
        filled
        stack-label
        :label="languageDataStore.getLanguageText('labelMetatextFilter')"
        :debounce="appStateStore.inputRequestDebounceTime"
      >
        <template #append>
          <q-icon
            v-if="metatextFilterModel.length !== 0"
            class="cursor-pointer"
            name="clear"
            @click.stop.prevent="metatextFilterModel = ''"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<style lang="scss" scoped>

//display q-select content in single line
:deep(.q-select) .q-field__native > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>