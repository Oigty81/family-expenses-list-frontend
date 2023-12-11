import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { ajaxRequestAuthWithParams, ajaxRequestAuthWithData } from '@/utilities/ajax';
import { bindTextArray } from '@/utilities/text';

import { useCategoriesStore } from '@/stores/categories.js';

export const useExpensesStore = defineStore('expensesStore', () => {

    const categoriesStore  = useCategoriesStore();
    
    // -------------------

    const expensesPeriod = ref([]);
    const isFetchExpensesPeriod = ref(false);

    // -------------------

    const getExpensesPeriod = computed(() => expensesPeriod.value);
    const getIsFetchExpensesPeriod = computed(() => isFetchExpensesPeriod.value);

    const getExpensesPeriodForTableView = computed(() => {
        if( expensesPeriod.value.length > 0 &&
            categoriesStore.getCategoriesData.categoryCompositionsData !== undefined &&
            categoriesStore.getCategoriesData.categoryCompositionsData.length > 0) {
                let destObject = [];
            expensesPeriod.value.forEach(e => {
               
                categoriesStore.getCategoriesData.categoryCompositionsData.forEach(cc => {
                    
                    if(e.categoryCompositionId === cc.categoryCompositionId) {
                        let categoryCompositionText = bindTextArray(cc.categories);
                        
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

    const getExpensesPeriodTotal = computed(() => {
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

    // -------------------

    const fetchExpensesPeriod = async (from, to ) => {
        return new Promise((resolve, reject) => {
            isFetchExpensesPeriod.value = true;
            ajaxRequestAuthWithParams("/expenses/getExpensesPeriod", "GET", { from: from, to: to })
            .then((response) => {
                isFetchExpensesPeriod.value = false;
                expensesPeriod.value = response.data;
                resolve();
            })
            .catch((err)=> {
                isFetchExpensesPeriod.value = false;
                reject(err);
            });
        });
    };

    const clearExpensesPeriod = async () => {
        expensesPeriod.value = [];
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

    // -------------------

    return {
        getExpensesPeriod, getIsFetchExpensesPeriod, getExpensesPeriodForTableView, getExpensesPeriodTotal,
        
        fetchExpensesPeriod, clearExpensesPeriod, putExpenses
    };
});

