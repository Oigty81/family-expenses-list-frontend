<script setup>

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useCategoriesStore } from '@/stores/categories.js';

const router = useRouter();

const $q = useQuasar();

const categoriesStore  = useCategoriesStore();

const errorMessage = ref("");
const model = ref(null);

onMounted( async () => {
  $q.loading.show();
  await categoriesStore.fetchCategories();
  $q.loading.hide();
});

const isModelEmpty = computed(() => {
  if(model.value === null || model.value === undefined || model.value.length === undefined || model.value.length === 0) {
    return true;
  } else {
    return false;
  }
});

const getModelIds = computed(()=> {
  let destObject = [];
  if(model.value === null || model.value === undefined || model.value.length === undefined || model.value.length === 0) {
    return [];
  } else {
    model.value.forEach(m => {
      destObject.push(m.id);
    });
    return destObject;
  }
});

const saveNewCategoryComposition = async () => {
  errorMessage.value = "";
  
  try {
    await categoriesStore.putCategoryComposition(getModelIds.value);
    await router.push("/");
  } catch(ex) {
    errorMessage.value = ex.text;
  }
};

</script>

<template>
  <div class="row q-mt-md">
    <div class="col">
      <div class="q-pa-md">
        <q-select
          v-model="model"
          label="Choose Categories"
          filled
          use-input
          use-chips
          multiple
          input-debounce="0"
          :options="categoriesStore.getCategoryDataForSelector"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="col">
      <q-btn
        style="width: 100%"
        outline
        class="q-pa-md q-ml-md"
        label="Add Category Composition"
        color="info"
        :disable="isModelEmpty"
        @click="saveNewCategoryComposition"
      />
    </div>
  </div>
  <div class="row q-mx-sm">
    <div class="col-4">
      <h5 class="text-red">
        {{ errorMessage }}
      </h5>
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
</template>