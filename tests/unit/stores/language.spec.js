import { vi, beforeEach, describe, expect, test} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useLanguageStore  } from "@/stores/language.js";

import * as en from '@lang/en';
import * as de from '@lang/de';

describe('test "languageStore"', () => {
    
    let languageStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        languageStore = useLanguageStore();
    });

    test('whether import correct default language file (en) with required properties', () => {
        const spyEn= vi.spyOn(en, 'default');

        spyEn.mockImplementation(() => {
            return {
                useCommaForNumberInUi: true,
                dictionary:
                {
                    test1: "en"
                }
            };
        });

        languageStore.loadLanguageSettings(undefined);

        expect(spyEn).toHaveBeenCalledTimes(1);
        expect(languageStore.getDictionary).toHaveProperty('test1');
        expect(languageStore.getDictionary.test1).toBe("en");
        expect(languageStore.getUseCommaForNumberInUi).toBe(true);

        spyEn.mockRestore();
    });

    test('whether import correct language file with required properties when set "de"', () => {
        const spyDe= vi.spyOn(de, 'default');

        spyDe.mockImplementation(() => {
            return {
                useCommaForNumberInUi: false,
                dictionary:
                {
                    test2: "de"
                }
            };
        });

        languageStore.loadLanguageSettings("de");

        expect(spyDe).toHaveBeenCalledTimes(1);
        expect(languageStore.getDictionary).toHaveProperty('test2');
        expect(languageStore.getDictionary.test2).toBe("de");
        expect(languageStore.getUseCommaForNumberInUi).toBe(false);

        spyDe.mockRestore();
    });
    
    test('whether import correct language file with required properties when set "DE"', () => {
        const spyDe= vi.spyOn(de, 'default');

        spyDe.mockImplementation(() => {
            return {
                useCommaForNumberInUi: false,
                dictionary:
                {
                    test2: "de"
                }
            };
        });

        languageStore.loadLanguageSettings("DE");

        expect(spyDe).toHaveBeenCalledTimes(1);
        expect(languageStore.getDictionary).toHaveProperty('test2');
        expect(languageStore.getDictionary.test2).toBe("de");
        expect(languageStore.getUseCommaForNumberInUi).toBe(false);

        spyDe.mockRestore();
    });

    test('whether getter getUseCommaForNumberInUi returns false when property is undefined', () => {
        const spyEn= vi.spyOn(en, 'default');

        spyEn.mockImplementation(() => {
            return {
                dictionary:
                {
                    test1: "en"
                }
            };
        });

        languageStore.loadLanguageSettings("en");

        expect(spyEn).toHaveBeenCalledTimes(1);
        expect(languageStore.getDictionary).toHaveProperty('test1');
        expect(languageStore.getUseCommaForNumberInUi).toBe(false);

        spyEn.mockRestore();
    });

    test('whether getter getDictionary returns undefined when property is dictionary is not defined', () => {
        const spyEn= vi.spyOn(en, 'default');

        spyEn.mockImplementation(() => {
            return {
                anyProp: "TestStuff"
            };
        });

        languageStore.loadLanguageSettings("en");

        expect(spyEn).toHaveBeenCalledTimes(1);
        expect(languageStore.getDictionary).toBe(undefined);
       
        spyEn.mockRestore();
    });
});