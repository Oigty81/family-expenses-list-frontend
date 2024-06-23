<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useCurrencyInput } from "vue-currency-input";

import { useCategoriesDataStore } from '@/stores/categoriesData.js';
import { useExpensesDataStore  } from '@/stores/expensesData.js';

const router = useRouter();

const $q = useQuasar();

const price = useCurrencyInput({ currency: 'EUR' });

const categoriesDataStore  = useCategoriesDataStore();
const expensesDatsStore  = useExpensesDataStore();

const errorMessage = ref("");

const categoryCompositionModel = ref(null);
const info = ref("");

const isSaveButtonDisable = computed(() => {
  if(categoryCompositionModel.value === null || price.numberValue.value === null) {
    return true;
  } else {
    return false;
  }
});

onMounted( async () => {
  $q.loading.show();
  await categoriesStore.fetchCategories();
  $q.loading.hide();
});


const saveNewExpenses = async () => {
  errorMessage.value = "";
  try {
    await expensesStore.putExpenses(categoryCompositionModel.value.id, price.numberValue._value, info.value);
    await router.push("/");
  } catch(ex) {
    errorMessage.value = ex.text;
  }
};

</script>

<template>
  <div class="row q-ml-md">
    <div class="col-9">
      <h5>Add Expenses</h5>
    </div>
  </div>
  <div class="row q-mt-sm q-mx-md">
    <div class="col-md-2 col-12">
      <p>Category Composition:</p>
    </div>
    <div class="col-md-3 col-12">
      <q-select
        v-model="categoryCompositionModel"
        outlined
        :options="categoriesStore.getCategoryCompositionsDataForSelector"
        style="width: 100%"
      />
    </div>
  </div>
  <div class="row q-mt-md q-mx-md">
    <div class="col-md-2 col-12">
      <p>Price:</p>
    </div>
    <div class="col-md-3 col-12">
      <q-input
        :ref="price.inputRef"
        v-model="price.formattedValue"
        outlined
        class="my-q-add-category"
        label="Add Price (€)"
        stack-label
        style="width: 100%"
      />
    </div>
  </div>
  <div class="row q-mt-md q-mx-md">
    <div class="col-md-2 col-12">
      <p>Info:</p>
    </div>
    <div class="col-md-3 col-12">
      <q-input
        v-model="info"
        outlined
        class="my-q-add-category"
        label="Add Info"
        stack-label
        style="width: 100%"
      />
    </div>
  </div>
  <div class="row q-mt-md q-mx-md">
    <div class="col-md-5 col-12">
      <q-btn
        style="width: 100%"
        outline
        class=""
        label="Save Expenses"
        color="info"
        :disable="isSaveButtonDisable"
        @click="saveNewExpenses"
      />
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
</template>