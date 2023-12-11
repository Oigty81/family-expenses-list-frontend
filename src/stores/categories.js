import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { ajaxRequestAuthWithParams, ajaxRequestAuthWithData } from '@/utilities/ajax';
import { bindTextArray } from '@/utilities/text';

export const useCategoriesStore = defineStore('categoriesStore', () => {

    const categoriesData = ref({
        categoriesData : [],
        categoryCompositionsData: []
    });

    const isFetchCategories = ref(false);

    // -------------------

    const getCategoriesData = computed(() => categoriesData.value);
    const getIsFetchCategories = computed(() => isFetchCategories.value);

    const getCategoryDataForSelector = computed(()=> {
        let cd = categoriesData.value.categoriesData;
        let destObject = [];
        if(cd !== undefined && cd.length !== 0) {
            cd.forEach(c => {
                destObject.push({
                    id: c.id,
                    label: c.title
                });
            });
            return destObject;
        } else {
            return [];
        }
       
    });

    const getCategoryCompositionsDataForSelector = computed(()=> {
        let ccd = categoriesData.value.categoryCompositionsData;
        let destObject = [];
        if(ccd !== undefined && ccd.length !== 0) {
            ccd.forEach(cc => {
                let categoriesText = bindTextArray(cc.categories);
                destObject.push({
                    id: cc.categoryCompositionId,
                    label: categoriesText
                });
            });
            return destObject;
        } else {
            return [];
        }
    });

    // -------------------

    const fetchCategories = async () => {
        return new Promise((resolve, reject) => {
            isFetchCategories.value = true;
            ajaxRequestAuthWithParams("/category/getCategories")
            .then((response) => {
                isFetchCategories.value = false;
                categoriesData.value = response.data;
                resolve();
            })
            .catch((err)=> {
                isFetchCategories.value = false;
                reject(err);
            });
        });
    };

    const clearCategories = async () => {
        categoriesData.value = {
            categoriesData : [],
            categoryCompositionsData: []
        };
    };

    const putCategory = async (title) => {
        return new Promise((resolve, reject) => {
            ajaxRequestAuthWithParams("/category/putCategory", 'POST', { title: title })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    const putCategoryComposition = async (categoryIds) => {
        return new Promise((resolve, reject) => {
            ajaxRequestAuthWithData("/category/putCategoryComposition", 'POST', { categoryIds: categoryIds })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    // -------------------

    return {
        getCategoriesData, getIsFetchCategories, getCategoryDataForSelector, getCategoryCompositionsDataForSelector,
        
        fetchCategories, clearCategories, putCategory, putCategoryComposition
    };
});


