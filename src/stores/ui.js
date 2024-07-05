import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

export const useUiStore = defineStore('uiStore', () => {
    const $q = useQuasar();

    const widthViewport = ref(0);
    const heightViewport = ref(0);
    const heightHeader = ref(56);

    const heightExpensesListAddition = computed(() => {
        return $q.screen.lt.md ? -20 : 85;
    });



    const heightContent = computed(() => {
        return heightViewport.value - heightHeader.value  + 40;
    });

    const heightExpensesListControlBoard = ref(0);

    const heightExpensesList = computed(() => {
        return heightContent.value - heightExpensesListControlBoard.value - heightExpensesListAddition.value;
    });
    
    return {
        widthViewport, heightViewport, heightHeader, heightContent,
        heightExpensesListControlBoard, heightExpensesList
    };
});