'use strict';

export function characterIsLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i) !== null;
}