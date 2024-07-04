import { describe, expect, test} from "vitest";

import { characterIsLetter, compareTextArraysExact } from '@/utilities/text';

describe('test "utilities/text"', () => {

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


    test('whether method compareTextArraysExact returns true when text array contains the same elements', () => {
        const result1 = compareTextArraysExact(
            [ "AAA", "BBB", "CCC", "AbcD" ],
            [ "AAA", "BBB", "CCC", "AbcD" ],
        );

        const result2 = compareTextArraysExact(
            [ "AAA", "BBB", "CCC", "ABCD" ],
            [ "BBB", "ABCD", "CCC", "AAA" ],
        );

        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

    test('whether method compareTextArraysExact returns false when text array contains not the same elements', () => {
        const result1 = compareTextArraysExact(
            [ "AAA", "BBB", "CCC", "AbcD" ],
            [ "AAA", "BBB", "CCC" ],
        );

        const result2 = compareTextArraysExact(
            [ "AAA", "CCC" ],
            [ "AAA", "BBB", "CCC" ],
        );

        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });

});