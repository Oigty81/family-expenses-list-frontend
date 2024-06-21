import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStateStore = defineStore('appStateStore', () => {

    const currentLanguageId = ref(1);
 
    const inputRequestDebounceTime = ref(300);
    const loadExpensesDebounceTime = ref(100);
    const intervalExpensesViewRefresh = ref(4000);
    const expensesPageFilters = ref({});
    const isExpensesPageFiltersSetInitial = ref(true);
    
    return {
        currentLanguageId,
		inputRequestDebounceTime, loadExpensesDebounceTime, intervalExpensesViewRefresh,
		expensesPageFilters, isExpensesPageFiltersSetInitial
		
    };
});

