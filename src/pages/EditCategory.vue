<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAppStateStore  } from '@/stores/appState';
import { useLanguageDataStore  } from '@/stores/languageData';
import { useCategoriesDataStore } from '@/stores/categoriesData.js';

import { characterIsLetter } from '@/utilities/text.js';

const router = useRouter();

const $q = useQuasar();

const appStateStore = useAppStateStore();
const languageDataStore = useLanguageDataStore();
const categoriesDataStore  = useCategoriesDataStore();

const categoryInputField = ref(null);
const categoryName = ref("");

onMounted( async () => {
  $q.loading.show();
  await categoriesDataStore.fetchCategories();
  $q.loading.hide();
});

const editCategoryInputRules = computed(() => {
  return [
    val => val.length > 1 || languageDataStore.getLanguageText('editCategoryVadidationLength'),
    val => characterIsLetter(val[0]) || languageDataStore.getLanguageText('editCategoryVadidationLetterFirst'),
    val => !checkhetherCategorynameIsAlreadyAvailable(val) || languageDataStore.getLanguageText('editCategoryVadidationAlreadyAvailable')
  ];
});

watch(appStateStore, () => {
  if(categoryInputField.value.hasError) {
    categoryInputField.value.validate(); //NOTE: work around: update possible current validation error text when language was changed
  }
}, { deep: true });

const checkhetherCategorynameIsAlreadyAvailable = (val) => {
  let result = false;
  categoriesDataStore.categoriesData.categories.forEach(c => {
      if(c.title.toLowerCase() === val.toLowerCase()) {
        result = true;
      }
  });
  return result;
};

const saveNewCategory = async () => {
  categoryInputField.value.validate();
  if(categoryInputField.value.hasError) return;

  try {
    await categoriesDataStore.putCategory(categoryName.value);
    await router.push("/");
  } catch(ex) {
    categoryName.value = "";
  }
};

</script>

<template>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <div class="text-h4">{{ languageDataStore.getLanguageText('menuEditCategory') }}</div>
    </div>
  </div>
  <div class="row q-mx-sm q-mt-xl">
    <div class="col-md-4 col-12 q-mb-sm q-pr-sm">
      <q-input
        ref="categoryInputField"
        v-model="categoryName"
        outlined
        class="my-q-add-category"
        :label="languageDataStore.getLanguageText('editCategoryLabel')"
        stack-label
        :rules="editCategoryInputRules"
        lazy-rules="ondemand"
      />
    </div>
    <div class="col-md-4 col-12 q-pr-sm">
      <q-btn
        no-caps
        style="width: 100%"
        outline
        class="q-py-md"
        :label="languageDataStore.getLanguageText('editCategorySubmitButton')"
        color="info"
        @click="saveNewCategory"
      />
    </div>
  </div>
  <div class="row q-mx-sm q-mt-sm">
    <div class="col">
      <hr class="line-separator-2">
    </div>
  </div>
</template>