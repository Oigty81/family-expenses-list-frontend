import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { ajaxRequestAuthWithData } from '@/utilities/ajax';

import { useCategoriesDataStore } from '@stores/categoriesData.js';

export const useExpensesDataStore = defineStore('expensesDataStore', () => {

    const categoriesDataStore  = useCategoriesDataStore();

    const expensesSet = ref([]);
    const isFetchExpenses = ref(false);

    const expensesForTableView = computed(() => {
        if( expensesSet.value.expenses !== undefined && expensesSet.value.expenses.length > 0 &&
            categoriesDataStore.categoriesData.categoryCompositions !== undefined &&
            categoriesDataStore.categoriesData.categoryCompositions.length > 0) {
                let destObject = [];
            expensesSet.value.expenses.forEach(e => {
                categoriesDataStore.categoriesData.categoryCompositions.forEach(cc => {
                    
                    if(e.categoryCompositionId === cc.categoryCompositionId) {
                        let categoryCompositionText = cc.categories.join(' / ');
                        
                        destObject.push({
                            categoryCompositionText: categoryCompositionText,
                            displayname: e.displayname,
                            price: e.price.toLocaleString() + " €",
                            created: e.created,
                            metatext: e.metatext,
                        });
                    }
                });
            });
            return destObject;
        } else {
            return [];
        }
    });

    const fetchExpenses = async (filters) => {
        return new Promise((resolve, reject) => {
            isFetchExpenses.value = true;
            ajaxRequestAuthWithData("/expenses/getExpenses", "POST", filters)
            .then((response) => {
                isFetchExpenses.value = false;
                expensesSet.value = response.data;
                resolve();
            })
            .catch((err)=> {
                isFetchExpenses.value = false;
                expensesSet.value = [];
                reject(err);
            });
        });
    };

    const putExpenses = async (data) => {
        return new Promise((resolve, reject) => {
            ajaxRequestAuthWithData("/expenses/putExpenses", 'POST', data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    const updateExpenses = async (id, data) => {
        return new Promise((resolve, reject) => {
            ajaxRequestAuthWithData("/expenses/updateExpenses", 'POST', { id: id, data: data })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    const deleteExpenses = async (id) => {
        return new Promise((resolve, reject) => {
            ajaxRequestAuthWithData("/expenses/deleteExpenses", 'POST', { id: id })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    return {
        expensesSet, isFetchExpenses, expensesForTableView,
        fetchExpenses, putExpenses, updateExpenses, deleteExpenses
    };
});

