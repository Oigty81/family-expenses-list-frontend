import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { ajaxRequestAuthWithParams, ajaxRequestAuthWithData } from '@/utilities/ajax';

export const useCategoriesDataStore = defineStore('categoriesDataStore', () => {

    const categoriesData = ref({
        categories : [],
        categoryCompositions: []
    });

    const isFetchCategories = ref(false);

    // -------------------

    const categoryDataForSelector = computed(()=> {
        let cd = categoriesData.value.categories;
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

    const categoryCompositionsDataForSelector = computed(()=> {
        let ccd = categoriesData.value.categoryCompositions;
        let destObject = [];
        if(ccd !== undefined && ccd.length !== 0) {
            ccd.forEach(cc => {
                let categoriesText = cc.categories.join(' / ');
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
                categoriesData.value = {
                    categories : [],
                    categoryCompositions: []
                };
                reject(err);
            });
        });
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
        categoriesData, isFetchCategories, categoryDataForSelector, categoryCompositionsDataForSelector,
        fetchCategories, putCategory, putCategoryComposition
    };
});


