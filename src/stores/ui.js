import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUiStore = defineStore('uiStore', () => {

    const heightViewport = ref(0);
    const heightHeader = ref(56);

    const heightContent = computed(() => {
        return heightViewport.value - heightHeader.value  + 40;
    });

    const heightExpensesList = computed(() => {
        return heightContent.value - 220;
    });
    
    return {
        heightViewport, heightHeader, heightContent, heightExpensesList
    };
});