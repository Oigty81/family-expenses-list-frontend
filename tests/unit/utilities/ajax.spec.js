import { afterEach, describe, expect, test, vi} from "vitest";

import { ajaxRequestForLogin, ajaxRequestAuthWithParams, ajaxRequestAuthWithData } from '@/utilities/ajax';
import { ajaxWebRequestForLogin, ajaxWebRequestAuthWithParams, ajaxWebRequestAuthWithData } from '@/utilities/ajaxWeb';
import { ajaxAppRequestForLogin, ajaxAppRequestAuthWithParams, ajaxAppRequestAuthWithData } from '@/utilities/ajaxApp';


vi.mock('@/utilities/ajaxWeb');
vi.mock('@/utilities/ajaxApp');

describe('test "utilities/ajax"', () => {

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    test('whether select current method when using app mode "web"', () => {
        import.meta.env.VITE_LOCAL_USE_FOR = "web";
                
        ajaxRequestForLogin('');
        ajaxRequestAuthWithParams('');
        ajaxRequestAuthWithData('');

        expect(ajaxWebRequestForLogin).toHaveBeenCalledTimes(1);
        expect(ajaxWebRequestAuthWithParams).toHaveBeenCalledTimes(1);
        expect(ajaxWebRequestAuthWithData).toHaveBeenCalledTimes(1);
        
    });

    test('whether select current method when using app mode "app"', () => {
        import.meta.env.VITE_LOCAL_USE_FOR = "app";
        
        ajaxRequestForLogin('');
        ajaxRequestAuthWithParams('');
        ajaxRequestAuthWithData('');

        expect(ajaxAppRequestForLogin).toHaveBeenCalledTimes(1);
        expect(ajaxAppRequestAuthWithParams).toHaveBeenCalledTimes(1);
        expect(ajaxAppRequestAuthWithData).toHaveBeenCalledTimes(1);
    });

    
});