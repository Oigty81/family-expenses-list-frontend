<script setup>
import { ref, computed } from 'vue';

import moment from 'moment';
import { useCurrencyInput } from "vue-currency-input";

import { useLanguageDataStore  } from '@/stores/languageData';
import { useCategoriesDataStore } from '@/stores/categoriesData.js';

import CustomDatetime from '@components/ui/CustomDatetime.vue';

const emit = defineEmits(['closeAdd', 'closeCancel']);

const price = useCurrencyInput({ currency: 'EUR' });
const languageDataStore = useLanguageDataStore();
const categoriesDataStore = useCategoriesDataStore();

const categoryCompositionModel = ref(null);
const dateTimeExpenses = ref(moment().format("YYYY-MM-DD HH:mm"));
const metatext = ref("");

const isSaveButtonDisable = computed(() => {
  if(categoryCompositionModel.value === null || price.numberValue.value === null) {
    return true;
  } else {
    return false;
  }
});

const onCancel = async () => {
  emit('closeCancel');
};

const onOk = () => {
  emit('closeAdd', {
    categoryCompositionId: categoryCompositionModel.value.id,
    price: price.numberValue._value,
    created: dateTimeExpenses.value,
    metatext: metatext.value
  });
};

</script>

<template>
  <div class="row">
    <div class="col-sm-6 col-12 q-mt-md q-pr-sm">
      <q-select
        v-model="categoryCompositionModel"
        outlined
        :label="languageDataStore.getLanguageText('labelAddCategoryComposition')"
        :options="categoriesDataStore.categoryCompositionsDataForSelector"
        stack-label
      />
    </div>
    <div class="col-sm-6 col-12 q-mt-md q-pr-sm">
      <CustomDatetime
        :label="languageDataStore.getLanguageText('labelChooseDatetimeExpenses')"
        :datetime-string="dateTimeExpenses"
        :position="{x: -0, y:-40}"
        @update-datetime="($e) => { dateTimeExpenses = $e; }"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6 col-12 q-mt-md q-pr-sm q-pr-sm">
      <q-input
        :ref="price.inputRef"
        v-model="price.formattedValue"
        outlined
        :label="languageDataStore.getLanguageText('labeAddPrice')"
        stack-label
      />
    </div>
    <div class="col-sm-6 col-12 q-mt-md q-pr-sm">
      <q-input
        v-model="metatext"
        outlined
        :label="languageDataStore.getLanguageText('labelAddInfo')"
        stack-label
        lazy-rules="ondemand"
      />
    </div>
  </div>
  <div class="row q-mt-lg">
    <div class="col-sm-2 col-6 offset-sm-8 q-pr-sm">
      <q-btn
        no-caps
        outline
        size="md"
        color="primary"
        :label="languageDataStore.getLanguageText('cancel')"
        style="width:100%;"
        @click="onCancel"
      />
    </div>
    <div class="col-sm-2 col-6 q-px-sm">
      <q-btn
        no-caps
        outline
        size="md"
        color="primary"
        :label="languageDataStore.getLanguageText('ok')"
        :disable="isSaveButtonDisable"
        style="width:100%;"
        @click="onOk"
      />
    </div>
  </div>
</template>
