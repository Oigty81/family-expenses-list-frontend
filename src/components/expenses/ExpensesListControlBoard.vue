<script setup>
import { ref, watch, onBeforeUpdate } from 'vue';

import moment from 'moment';

import CustomDateRange from '@/components/ui/CustomDateRange.vue';

import { useAppStateStore  } from '@/stores/appState';
import { useLanguageDataStore  } from '@/stores/languageData';
import { useCategoriesDataStore } from '@/stores/categoriesData';

const emit = defineEmits(['updateFilter']);

const appStateStore = useAppStateStore();
const languageDataStore = useLanguageDataStore();
const categoriesDataStore  = useCategoriesDataStore();

const filterOptions = ref({});
const dateRange = ref([]);
const categoriesModel = ref([]);
const metatextFilterModel = ref("");

let isUpdateInitial = true;

onBeforeUpdate(() => {
    if(isUpdateInitial) {
      dateRange.value = [moment().format('YYYY-MM-DD'), null]; //NOTE: set day filter initial
      isUpdateInitial = false;
    }
});

watch(filterOptions, () => {
  emit('updateFilter', filterOptions.value);
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
  <div class="row q-ma-xs">
    <div class="col-4 q-px-sm">
      <CustomDateRange
        :label="languageDataStore.getLanguageText('???')"
        :datetime-range-strings="dateRange"
        :position="{x: 20, y:180}"
        @update-date-range="($e) => { onChangeDatetimeRange($e); }"
      />
    </div>
    <div class="col-4 q-px-sm">
      <q-select
        v-model="categoriesModel"
        filled
        multiple
        :options="categoriesDataStore.categoryDataForSelector"
        :label="languageDataStore.getLanguageText('???')"
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
    <div class="col-4 q-px-sm">
      <q-input
        v-model="metatextFilterModel"
        filled
        :label="languageDataStore.getLanguageText('???')"
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