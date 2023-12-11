import { beforeEach, afterEach, describe, expect, test, vi} from "vitest";
import { createPinia, setActivePinia } from "pinia";


import { ajaxAppRequestAuthWithParams, ajaxAppRequestAuthWithData } from '@/utilities/ajaxApp';

import axios from 'axios';

vi.mock('axios');

describe('test "utilities/ajaxApp"', () => {

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
        ajaxAppRequestAuthWithParams("/r1", "GET", { t: 1});
       
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'GET',
            headers: {
                "Authorization" : "Bearer " + null
            },
            url: '/api/r1',
            params: { t: 1 }
        });
    });

    test('whether method ajaxRequestAuthWithData calls axios with correct parameters', () => {
        const responseMock = "OK";

        axios.mockResolvedValue({
            data: responseMock,
        });
        ajaxAppRequestAuthWithData("/r2", "POST", { t: 2});
    
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + null
            },
            url: '/api/r2',
            data: { t: 2 }
        });
    });
});