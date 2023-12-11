'use strict';

export function convertDateFromDeToUs(dateDe) {
    
    const year = dateDe.substring(6,10);
    const month = dateDe.substring(3,5);
    const day = dateDe.substring(0,2);

    return year + "-" + month + "-" + day;
}