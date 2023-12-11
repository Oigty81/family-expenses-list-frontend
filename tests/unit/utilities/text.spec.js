import { describe, expect, test} from "vitest";


import { bindTextArray, characterIsLetter } from '@/utilities/text';


describe('test "utilities/text"', () => {

    test('whether method bindTextArray returns correct value when param 1 is a string array', () => {
        const result1 = bindTextArray(["AAA", "BBB", "CCC"]);
        const result2 = bindTextArray(["AAA"]);
        
        expect(result1).toBe("AAA / BBB / CCC");
        expect(result2).toBe("AAA");
    });

    test('whether method bindTextArray returns correct value when param 1 is not a string array', () => {
        const result1 = bindTextArray([]);
        const result2 = bindTextArray(undefined);
        const result3 = bindTextArray([1, 2]);
        
        expect(result1).toBe("");
        expect(result2).toBe("");
        expect(result3).toBe("");
    });

    test('whether method characterIsLetter returns true when param 1 is a letter', () => {
        const result1 = characterIsLetter("A");
        const result2 = characterIsLetter("a");
                
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        
    });

    test('whether method characterIsLetter returns false when param 1 is not a letter', () => {
        const result1 = characterIsLetter("1");
        const result2 = characterIsLetter("=");
        
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        
    });

    test('whether method characterIsLetter returns false when param 1 is a string with length != 1', () => {
        const result1 = characterIsLetter("AAA");
        const result2 = characterIsLetter("");
                
        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });
});