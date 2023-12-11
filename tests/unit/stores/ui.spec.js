import { vi, beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useQuasar } from 'quasar';

import { useUiStore  } from "@/stores/ui.js";


vi.mock('quasar');

describe('test "uiStore"', () => {
    
    let uiStore = null;

    useQuasar.mockReturnValue({
        dark: { mode: false, set: vi.fn() },
    });

    beforeEach(() => {
        setActivePinia(createPinia());
        uiStore = useUiStore();
    });

    test('whether initializes with correct values', () => {
        expect(uiStore.getHeightHeader).toBe(56);
        expect(uiStore.getHeightFooter).toBe(28);
        expect(uiStore.getHeightContent).toBe(-4);
        expect(uiStore.getDarkModeState).toBe(false);
        expect(uiStore.getDarkModeProps).toStrictEqual({
                color: "blue",
                text: "Dark Mode Off",
            }
        );
    });
    
    test('set viewportheight and compute viewport height', () => {
        uiStore.setViewportHeight(204);
        expect(uiStore.getHeightContent).toBe(200);
    });

    test('switch to darkmode and reverse', () => {
        uiStore.setDarkmode(true);
        expect(uiStore.getDarkModeState).toBe(true);
        expect(uiStore.getDarkModeProps).toStrictEqual({
                color: "red",
                text: "Dark Mode On",
            }
        );

        uiStore.setDarkmode(false);
        expect(uiStore.getDarkModeState).toBe(false);
        expect(uiStore.getDarkModeProps).toStrictEqual({
                color: "blue",
                text: "Dark Mode Off",
            }
        );

        useQuasar().dark.set.mockReset();
        
    });

    test('switch to darkmode with valid parameter from type boolean', () => {
        uiStore.setDarkmode(undefined);
        expect(uiStore.getDarkModeState).toBe(false);
        
    });

    
    test('check currect work of scrollMainContentToBottom()', () => {
      
        let spy_getElementById = vi.spyOn(document, "getElementById");
        spy_getElementById.mockImplementation((v) => {
            console.log('spy__getElementById: ', v);
        });

        uiStore.scrollMainContentToBottom();

        expect(spy_getElementById).toBeCalledTimes(1);
        expect(spy_getElementById).toBeCalledWith("main-content-el");
                
        spy_getElementById.mockRestore();
    });
});