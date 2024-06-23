
import { beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useExpensesDataStore  } from "@stores/expensesData.js";



describe('test "expensesDataStore"', () => {
    
    let expensesDataStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        expensesDataStore = useExpensesDataStore();
    });

    test('whether initializes with correct values', () => {
        
        expect(expensesDataStore.expensesData).toStrictEqual([]);
        
    });
    //TODO:
});