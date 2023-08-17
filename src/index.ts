/**
 * **ASYNC** Checks if the given data is truthy. https://developer.mozilla.org/en-US/docs/Glossary/Truthy  
 * If an object, array, set, or map contains ANY truthy values, it is truthy.  
 * The value 0 is truthy.  
 * @param data The data, object or array to check.
 * @param zero Optional false - if this parameter === false, then 0 is also considered falsy.
 * @param obj Optional - if this parameter === true, then the function will only allow objects where all values are truthy.
 * @returns true if TRUTHY and false if FALSY.
 */
export const isTruthyAsync = async (data: any, zero?: boolean, obj?: boolean): Promise<boolean> => {
    // Checking for falsy objects. https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (data && Object.getOwnPropertyNames(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) return false;

    // Checking the individual elements of an object.
    if (data && typeof data === 'object' && data.constructor === Object) {
        if (obj === true) { // If the obj parameter is true, then only allow objects where ALL values are truthy.
            return (await Promise.all(Object.values(data).map(val => isTruthyAsync(val, zero, obj)))).every(v => v);
        }

        return (await Promise.all(Object.values(data).map(val => isTruthyAsync(val, zero)))).some(v => v);
    }

    if (Array.isArray(data)) {
        if (data.length === 0) return false;
        return (await Promise.all(data.map(foo => isTruthyAsync(foo, zero)))).some(v => v);
    }

    if (data instanceof Set) {
        for (const item of data) {
            if (await isTruthyAsync(item, zero)) return true;
        }
        return false;
    }

    if (data instanceof Map) {
        for (const [, value] of data) {
            if (await isTruthyAsync(value, zero)) return true;
        }
        return false;
    }

    if (typeof (data) === 'string' && data.trim().length === 0) return false;

    if (typeof (data) === 'undefined' || data === null) return false;

    if (data === 0) {
        if (zero === false) return false; // If the zero parameter is false, then the value 0 is falsy.
        return true;
    }

    if (!data) return false;

    if (obj === true) {
        return Object.values(data).some(val => isTruthyAsync(val, zero));
    }

    return true;
};

/**
 * **SYNC** Checks if the given data is truthy. https://developer.mozilla.org/en-US/docs/Glossary/Truthy  
 * If an object, array, set, or map contains ANY truthy values, it is truthy.  
 * The value 0 is truthy.  
 * @param data The data, object or array to check.
 * @param zero Optional false - if this parameter === false, then 0 is also considered falsy.
 * @param obj Optional - if this parameter === true, then the function will only allow objects where all values are truthy.
 * @returns true if TRUTHY and false if FALSY.
 */
export const isTruthy = (data: any, zero?: boolean, obj?: boolean): boolean => {
    // Checking for falsy objects. https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (data && Object.getOwnPropertyNames(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) return false;

    // Checking the individual elements of an object.
    if (data && typeof data === 'object' && data.constructor === Object) {
        if (obj === true) { // If the obj parameter is true, then only allow objects where ALL values are truthy.
            return Object.values(data).map(val => isTruthy(val, zero, obj)).every(v => v);
        }

        return Object.values(data).map(val => isTruthy(val, zero)).some(v => v);
    }

    if (Array.isArray(data)) {
        if (data.length === 0) return false;
        return data.map(foo => isTruthy(foo, zero)).some(v => v);
    }

    if (data instanceof Set) {
        for (const item of data) {
            if (isTruthy(item, zero)) return true;
        }
        return false;
    }

    if (data instanceof Map) {
        for (const [, value] of data) {
            if (isTruthy(value, zero)) return true;
        }
        return false;
    }

    if (typeof (data) === 'string' && data.trim().length === 0) return false;

    if (typeof (data) === 'undefined' || data === null) return false;

    if (data === 0) {
        if (zero === false) return false; // If the zero parameter is false, then the value 0 is falsy.
        return true;
    }

    if (!data) return false;

    if (obj === true) {
        return Object.values(data).some(val => isTruthy(val, zero));
    }

    return true;
};