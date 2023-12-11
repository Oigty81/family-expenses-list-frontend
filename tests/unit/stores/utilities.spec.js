import { beforeEach, afterEach, describe, expect, test, vi} from "vitest";

import { createPinia, setActivePinia } from "pinia";

import { useUtilitiesStore  } from "@/stores/utilities.js";

import axios from 'axios';

vi.mock('axios');

describe('test "utilitiesStore"', () => {
    
    let utilitiesStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        utilitiesStore = useUtilitiesStore();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });


    test('whether initializes with correct values', () => {
        expect(utilitiesStore.getBatteryState).toBe(66);
        
    });

    test('whether method loadBatterystate calls axios correct and set State', async () => {
        const responseMock = "99" ;

        axios.mockResolvedValue({
            data: responseMock,
        });

        await new Promise((resolve) => {
            utilitiesStore.loadBatterystate();
            setTimeout(() => { resolve(); }, 200);
        });
        
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'get',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utility/batterystate'
        });
        expect(utilitiesStore.getBatteryState).toBe(99);
    });

    test('whether method loadBatterystate calls axios correct and return error', async () => {
        const logSpy = vi.spyOn(global.console, 'log');
        axios.mockRejectedValue("unit test dummy error message");

        await new Promise((resolve) => {
            utilitiesStore.loadBatterystate();
            setTimeout(() => { resolve(); }, 200);
        });
        
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'get',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utility/batterystate'
        });
        expect(utilitiesStore.getBatteryState).toBe(66);
        
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("error loadBatterystate() ", "unit test dummy error message");

        logSpy.mockRestore();
    });

    test('whether method appMinimize calls axios correct', async () => {
        utilitiesStore.appMinimize();
        
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'get',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utility/minimize'
        });
    });

    test('whether method appQuit calls axios correct', async () => {
        utilitiesStore.appQuit();
        
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'get',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utility/quit'
        });
    });
});