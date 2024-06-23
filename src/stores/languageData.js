import moment from 'moment';

import { defineStore } from 'pinia';
import { computed } from 'vue';

import {useAppStateStore} from "@stores/appState.js";

import en from '@lang/en';
import ge from '@lang/ge';

export const useLanguageDataStore = defineStore('languageDataStore', () => {
    const appStateStore = useAppStateStore();

    const languageData = {
        "en": en,
        "ge": ge,
    };

    const getLanguageText = computed(() => {
        return (textKey) => {
            const currentSet = appStateStore.currentLanguageId === 1 ?  languageData.en : languageData.ge;
            if(currentSet !== undefined && currentSet.dictionary !== undefined && currentSet.dictionary[textKey] !== undefined) {
                return currentSet.dictionary[textKey];
            } else {
                return "?-?-?"
            }
        }
    });

    const useCommaForNumberInUi = computed(() => {
        if(languageSettings.value.useCommaForNumberInUi === undefined) {
            return false;
        } else {
            return languageSettings.value.useCommaForNumberInUi;
        }
    });

    const formatedDateTime = computed(() => {
        return (format, value) => {
            let result = "";
            switch(format) {
                case "d":
                    result = appStateStore.currentLanguageId === 1 ? moment(value).format('YYYY-MM-DD') : moment(value).format('DD.MM.YYYY');
                break;
                case "t":
                    result =  moment(value).format('HH:mm');
                break;
                case "dt":
                    result = appStateStore.currentLanguageId === 1 ? moment(value).format('YYYY-MM-DD HH:mm') : moment(value).format('DD.MM.YYYY HH:mm');
                break;
                case "dts":
                default:
                    result = appStateStore.currentLanguageId === 1 ? moment(value).format('YYYY-MM-DD HH:mm:ss') : moment(value).format('DD.MM.YYYY HH:mm:ss');
                break;
            }
            return result;
        };
    });

    const dateTimePickerLocation = computed (()=> {
        if(appStateStore.currentLanguageId === 1 ) {
            return 'en';
        } else {
            return 'ge'
        }
    });

    return {
        getLanguageText, useCommaForNumberInUi, formatedDateTime, dateTimePickerLocation
    };
});

