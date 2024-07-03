import { defineStore } from 'pinia';
import { ref } from 'vue';

import moment from 'moment';

export const useAppStateStore = defineStore('appStateStore', () => {

    const currentLanguageId = ref(1);
    const tooltipDelay = ref(800);
    const inputRequestDebounceTime = ref(300);
    const loadExpensesDebounceTime = ref(100);
    const intervalExpensesViewRefresh = ref(4000);

    //NOTE: set current month range initial
    const expensesPageFilters = ref({
        daterangeFilter: {
            from: moment().startOf('month').format('YYYY-MM-DD'),
            to:  moment().endOf('month').format('YYYY-MM-DD')
        }
    });
    const isExpensesPageFiltersSetInitial = ref(true);
    
    return {
        currentLanguageId, tooltipDelay,
		inputRequestDebounceTime, loadExpensesDebounceTime, intervalExpensesViewRefresh,
		expensesPageFilters, isExpensesPageFiltersSetInitial
		
    };
});

