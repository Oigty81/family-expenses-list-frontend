<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useCategoriesDataStore } from '@/stores/categoriesData.js';

import { characterIsLetter } from '@/utilities/text.js';

const router = useRouter();

const $q = useQuasar();

const categoriesStore  = useCategoriesDataStore();

const categoryName = ref("");
const errorMessage = ref("");
const validationMessage = ref("");
const isValidCategoryName = ref(false);


onMounted( async () => {
  $q.loading.show();
  await categoriesDataStore.fetchCategories();
  $q.loading.hide();
});


const checkCategorynameWhetherIsAlreadyAvailable = () => {
  return new Promise((resolve, reject) => {
    categoriesDataStore.categoriesData.categories.forEach(c => {
      if(c.title.toLowerCase() === categoryName.value.toLowerCase()) {
        reject({ text: "Category name is already available"});
      }
    });
    resolve();
  });
};

const saveNewCategory = async () => {
  errorMessage.value = "";
  try {
    await checkCategorynameWhetherIsAlreadyAvailable();
    await categoriesDataStore.putCategory(categoryName.value);
    await router.push("/");
  } catch(ex) {
    errorMessage.value = ex.text;
    categoryName.value = "";
  }
};

watch(categoryName, (v) => {
    validationMessage.value = "";
    isValidCategoryName.value = true;

    if(v === "") {
      isValidCategoryName.value = false;
      return;
    }
    if(!characterIsLetter(v[0])) {
      validationMessage.value = "category name must start with a letter";
      isValidCategoryName.value = false;
      return;
    }
  }, {deep: false, immediate: false }
);

</script>

<template>
  <div class="row q-mx-sm q-mt-xl">
    <div class="col-md-4">
      <q-input
        v-model="categoryName"
        outlined
        class="my-q-add-category"
        label="Add Category"
        stack-label
        :hint="validationMessage"
      />
    </div>
    <div class="col-md-2">
      <q-btn
        style="width: 100%"
        outline
        class="q-pa-md q-ml-md"
        label="Save new category"
        color="info"
        :disable="!isValidCategoryName"
        @click="saveNewCategory"
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