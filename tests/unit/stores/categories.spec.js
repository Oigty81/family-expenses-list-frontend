import { beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useCategoriesStore  } from "@/stores/categories.js";

describe('test "categoriesStore"', () => {
    
    let categoriesStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        categoriesStore = useCategoriesStore();
    });

    test('whether initializes with correct values', () => {
        
        expect(categoriesStore.GetCategories).toBe([]);
        
    });
    //TODO:
});