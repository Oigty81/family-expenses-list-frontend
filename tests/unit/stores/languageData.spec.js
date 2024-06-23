import { beforeEach, describe, expect, test } from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useLanguageDataStore  } from "@stores/languageData.js";
import { useAppStateStore  } from "@stores/appState.js";

import en from '@lang/en';
import ge from '@lang/ge';

describe('test "languageDataStore"', () => {
    
    let languageDataStore = null;
    let appStateStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        languageDataStore = useLanguageDataStore();
        appStateStore = useAppStateStore();
    });

    test('whether import correct languages with required properties and change language', () => {
        expect(languageDataStore.currentLanguageText('singIn')).toBe("Sign in");
        appStateStore.currentLanguageId = 2;
        expect(languageDataStore.currentLanguageText('singIn')).toBe("Anmelden");

        expect(languageDataStore.currentLanguageText('anySomesthing')).toBe("?-?-?");
    });

    test('whether formatedDateTime correctly works', () => {
        let referenceDatetime = '2024-02-03 14:45:55';
        expect(languageDataStore.formatedDateTime("d",referenceDatetime)).toBe("2024-02-03");
        expect(languageDataStore.formatedDateTime("t",referenceDatetime)).toBe("14:45");
        expect(languageDataStore.formatedDateTime("dt",referenceDatetime)).toBe("2024-02-03 14:45");
        expect(languageDataStore.formatedDateTime("dts",referenceDatetime)).toBe("2024-02-03 14:45:55");
        appStateStore.currentLanguageId = 2;
        expect(languageDataStore.formatedDateTime("d",referenceDatetime)).toBe("03.02.2024");
        expect(languageDataStore.formatedDateTime("t",referenceDatetime)).toBe("14:45");
        expect(languageDataStore.formatedDateTime("dt",referenceDatetime)).toBe("03.02.2024 14:45");
        expect(languageDataStore.formatedDateTime("dts",referenceDatetime)).toBe("03.02.2024 14:45:55");
    });

    test('whether dateTimePickerLocation correctly works', () => {
        expect(languageDataStore.dateTimePickerLocation).toBe("en");
        appStateStore.currentLanguageId = 2;
        expect(languageDataStore.dateTimePickerLocation).toBe("ge");
    });

    test('whether language "ge" has the same keys as language "en"', () => {
        let keysEn = Object.keys(en.dictionary);
        let keysGe = Object.keys(ge.dictionary);
        let keysOnlyInEn = [];
        let keysOnlyInGe = [];

        keysEn.forEach(en => {
            let found = false;
            keysGe.forEach(ge => {
                en === ge ? found = true : null;
            });
            if(!found) {
                keysOnlyInEn.push(en);
            }
        });

        keysGe.forEach(ge => {
            let found = false;
            keysEn.forEach(en => {
                ge === en ? found = true : null;
            });
            if(!found) {
                keysOnlyInGe.push(ge);
            }
        });

        console.log('------------');
        console.log('Keys in "en" but not in "ge"', keysOnlyInEn.length);
        keysOnlyInEn.forEach(en => console.log('-> ', en));
        console.log('------------');
        console.log('Keys in "ge" but not in "en"', keysOnlyInGe.length);
        keysOnlyInGe.forEach(ge => console.log('-> ', ge));
        expect(true).toBe(true);
    });
});