import { beforeEach, afterEach, describe, expect, test, vi} from "vitest";
import { createPinia, setActivePinia } from "pinia";


import { ajaxWebRequestAuthWithParams, ajaxWebRequestAuthWithData } from '@/utilities/ajaxWeb';

import axios from 'axios';

vi.mock('axios');

describe('test "utilities/ajaxWeb"', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    test('whether method ajaxRequestAuthWithParams calls axios with correct parameters', () => {
        const responseMock = "OK";

        axios.mockResolvedValue({
            data: responseMock,
        });
        ajaxWebRequestAuthWithParams("/r1", "GET", { t: 1});
       
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + null
            },
            url: '/api/v1/r1',
            params: { t: 1 }
        });
    });

    test('whether method ajaxRequestAuthWithData calls axios with correct parameters', () => {
        const responseMock = "OK";

        axios.mockResolvedValue({
            data: responseMock,
        });
        ajaxWebRequestAuthWithData("/r2", "POST", { t: 2});
    
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + null
            },
            url: '/api/v1/r2',
            data: { t: 2 }
        });
    });
});