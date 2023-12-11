import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import en from '@lang/en';
import de from '@lang/de';

export const useLanguageStore = defineStore('languageStore', () => {

    const languageSettings = ref({});

    const getDictionary = computed(() => {
        
        if(languageSettings.value.dictionary === undefined) {
            return undefined;
        } else {
            return languageSettings.value.dictionary;
        }
    });

    const getUseCommaForNumberInUi = computed(() => {
        
        if(languageSettings.value.useCommaForNumberInUi === undefined) {
            return false;
        } else {
            return languageSettings.value.useCommaForNumberInUi;
        }
    });

    const loadLanguageSettings = (lang) => {
            if(lang === undefined || typeof lang !== 'string') {
                languageSettings.value = en();
                return;
            }
        
            switch(lang.toLowerCase()) {
                case "de":
                    languageSettings.value = de();
                break;
                default:
                    languageSettings.value = en();
            }
        };

    return {
        getUseCommaForNumberInUi, getDictionary,
        
        loadLanguageSettings
    };
});

