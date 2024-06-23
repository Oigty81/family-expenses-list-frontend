import { beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useCategoriesDataStore  } from "@stores/categoriesData.js";

describe('test "categoriesDataStore"', () => {
    
    let categoriesDataStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        categoriesDataStore = useCategoriesDataStore();
    });

    test('whether initializes with correct values', () => {
        expect(categoriesDataStore.categoriesData).toStrictEqual({
            categories : [],
            categoryCompositions: []
        });
    });
    //TODO:
});