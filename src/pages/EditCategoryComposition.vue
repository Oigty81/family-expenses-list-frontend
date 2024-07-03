<script setup>

import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAppStateStore  } from '@/stores/appState';
import { useLanguageDataStore  } from '@/stores/languageData';
import { useCategoriesDataStore } from '@/stores/categoriesData.js';

const router = useRouter();

const $q = useQuasar();

const appStateStore = useAppStateStore();
const languageDataStore = useLanguageDataStore();
const categoriesDataStore  = useCategoriesDataStore();

const categoryCompositionSelectField = ref(null);
const model = ref([]);

onMounted( async () => {
  $q.loading.show();
  await categoriesDataStore.fetchCategories();
  $q.loading.hide();
});

const editCategoryCompositionSelectRules = computed(() => {
  return [
    val => val.length > 0 || languageDataStore.getLanguageText('editCategoryCompositionVadidationNoChoice'),
    val => !checkhetherCategoryCompositionIsAlreadyAvailable(val) || languageDataStore.getLanguageText('editCategoryCompositionVadidationAlreadyAvailable'),
  ];
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

watch(appStateStore, () => {
  categoryCompositionSelectField.value.validate(); //NOTE: work around: update possible current validation error text when language was changed
}, { deep: true });

const checkhetherCategoryCompositionIsAlreadyAvailable = () => {
  //TODO: implement it
  return true;
};

const saveNewCategoryComposition = async () => {
  categoryCompositionSelectField.value.validate();
  if(categoryCompositionSelectField.value.hasError) return;
  
  try {
    //await categoriesDataStore.putCategoryComposition(getModelIds.value);
    //await router.push("/");
  } catch(ex) {
    model.value = [];
  }
};

</script>

<template>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <div class="text-h4">{{ languageDataStore.getLanguageText('menuEditCategoryComposition') }}</div>
    </div>
  </div>
  <div class="row q-mx-sm q-mt-xl">
    <div class="col-md-4 col-12 q-mb-sm q-pr-sm">
      <div class="q-">
        <q-select
          ref="categoryCompositionSelectField"
          v-model="model"
          :label="languageDataStore.getLanguageText('editCategoryCompositionLabel')"
          stack-label
          filled
          use-input
          use-chips
          multiple
          input-debounce="0"
          :options="categoriesDataStore.categoryDataForSelector"
          style="width: 100%"
          :rules="editCategoryCompositionSelectRules"
          lazy-rules="ondemand"
        />
      </div>
    </div>
    <div class="col-md-4 col-12 q-pr-sm">
      <q-btn
        no-caps
        style="width: 100%"
        outline
        class="q-py-md"
        :label="languageDataStore.getLanguageText('editCategoryCompositionSubmitButton')"
        color="info"
        @click="saveNewCategoryComposition"
      />
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
</template>