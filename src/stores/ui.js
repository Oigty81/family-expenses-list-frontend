import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUiStore = defineStore('uiStore', () => {

    const widthViewport = ref(0);
    const heightViewport = ref(0);
    const heightHeader = ref(56);

    const heightContent = computed(() => {
        return heightViewport.value - heightHeader.value  + 40;
    });

    const heightExpensesListControlBoard = ref(0);

    const heightExpensesList = computed(() => {
        return heightContent.value - heightExpensesListControlBoard.value - 85;
    });
    
    return {
        widthViewport, heightViewport, heightHeader, heightContent,
        heightExpensesListControlBoard, heightExpensesList
    };
});