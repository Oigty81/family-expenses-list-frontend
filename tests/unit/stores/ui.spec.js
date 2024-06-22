import { vi, beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useUiStore  } from "@/stores/ui.js";

describe('test "uiStore"', () => {
    
    let uiStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        uiStore = useUiStore();
    });

    test('whether initializes with correct values', () => {
        expect(uiStore.heightViewport).toBe(0);
        expect(uiStore.heightHeader).toBe(56);
        expect(uiStore.heightContent).toBe(-16);
        expect(uiStore.heightExpensesList).toBe(-236);
    });
    
    test('set viewportheight and compute viewport height', () => {
        uiStore.heightViewport = 200;
        expect(uiStore.heightContent).toBe(184);
        expect(uiStore.heightExpensesList).toBe(-36);
    });
});