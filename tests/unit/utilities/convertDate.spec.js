import { describe, expect, test} from "vitest";


import { convertDateFromDeToUs } from '@/utilities/convertDate';


describe('test "utilities/convertDate"', () => {

    test('whether method convertDateFromDeToUs returns correct value', () => {
        const d1 = convertDateFromDeToUs("01.12.1777");
        const d2 = convertDateFromDeToUs("20.06.2020");
        
        expect(d1).toBe("1777-12-01");
        expect(d2).toBe("2020-06-20");
    });
});