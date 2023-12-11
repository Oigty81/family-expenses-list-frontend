'use strict';

export function bindTextArray(textArray) {
    let destObject = "";
    
    if(textArray !== undefined && textArray.length !== undefined && textArray.length > 0) {
        textArray.forEach((e, i) => {
            if(typeof e === "string") {
                
                if(i < textArray.length - 1 ) {
                    destObject += e + " / ";
                } else {
                    destObject += e;
                }
                
            }
        });
    }
    return destObject;
}

export function characterIsLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i) !== null;
}