
import { beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useExpensesStore  } from "@/stores/expenses.js";



describe('test "expensesStore"', () => {
    
    let expensesStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        expensesStore = useExpensesStore();
    });

    test('whether initializes with correct values', () => {
        
        expect(expensesStore.GetExpenses1).toBe(100);
        
    });
    //TODO:
});