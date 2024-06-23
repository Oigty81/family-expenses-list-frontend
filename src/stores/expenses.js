import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { ajaxRequestAuthWithParams, ajaxRequestAuthWithData } from '@/utilities/ajax';

import { useCategoriesStore } from '@/stores/categories.js';

export const useExpensesStore = defineStore('expensesStore', () => {

    const categoriesStore  = useCategoriesStore();

    const expensesData = ref([]);
    const isFetchExpenses = ref(false);

    const expensesForTableView = computed(() => {
        if( expensesPeriod.value.length > 0 &&
            categoriesStore.getCategoriesData.categoryCompositionsData !== undefined &&
            categoriesStore.getCategoriesData.categoryCompositionsData.length > 0) {
                let destObject = [];
            expensesPeriod.value.forEach(e => {
               
                categoriesStore.getCategoriesData.categoryCompositionsData.forEach(cc => {
                    
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

    const expensesTotal = computed(() => {
        if( expensesPeriod.value.length > 0 &&
            categoriesStore.getCategoriesData.categoryCompositionsData !== undefined &&
            categoriesStore.getCategoriesData.categoryCompositionsData.length > 0) {
                let total = 0;
                expensesPeriod.value.forEach(e => {
                    total += e.price;
                });
                return total;
            } else {
                return 0;
            }
       
    });

    const fetchExpenses = async (filters) => {
        return new Promise((resolve, reject) => {
            isFetchExpenses.value = true;
            ajaxRequestAuthWithParams("/expenses/getExpenses", "GET", filters)
            .then((response) => {
                isFetchExpenses.value = false;
                expensesData.value = response.data;
                resolve();
            })
            .catch((err)=> {
                isFetchExpenses.value = false;
                expensesData.value = [];
                reject(err);
            });
        });
    };

    const putExpenses = async (categoryCompositionId, price, metatext) => {
        return new Promise((resolve, reject) => {
            ajaxRequestAuthWithData("/expenses/putExpenses", 'POST', { categoryCompositionId: categoryCompositionId, price: price, metatext: metatext })
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
        expensesData, isFetchExpenses, expensesForTableView, expensesTotal,
        fetchExpenses, putExpenses, updateExpenses, deleteExpenses
    };
});

