import { isTruthy } from "..";


describe("isTruthy", () => {

    // Truthy values include non-zero numbers, non-empty strings, and objects containing at least one truthy value.
    describe("Truthy values", () => {

        test("Primitive truthy values", () => {
            expect(isTruthy(true)).toBe(true);
            expect(isTruthy(69)).toBe(true);
            expect(isTruthy("foo")).toBe(true);

            // 0 is considered truthy by default, but can be made falsy by passing false as the second argument.
            expect(isTruthy(0)).toBe(true);
            expect(isTruthy(0, false)).toBe(false);
        });

        test("Objects containing at least one truthy value", () => {
            const obj = { id: NaN, foo: "bar", baz: undefined };

            // objects are considered truthy if any value is truthy by default, but can be made falsy by passing false as the third argument.
            expect(isTruthy(obj)).toBe(true);
            expect(isTruthy(obj, true, true)).toBe(false);
        });

        test("Arrays containing at least one truthy value", () => {
            const toCheck = [null, undefined, NaN, "", {}, [], 0];
            expect(isTruthy(toCheck)).toBe(true);
            expect(isTruthy(toCheck, false)).toBe(false); // With zero as falsy
        });

        test("Nested arrays containing at least one truthy value", () => {
            const toCheck = [[null, undefined], NaN, [{}, [], [[""], 0]]];
            expect(isTruthy(toCheck)).toBe(true);
            expect(isTruthy(toCheck, false)).toBe(false); // With zero as falsy
        });

        test("Sets containing at least one truthy value", () => {
            const truthySet = new Set(); truthySet.add(0);
            const truthySet2 = new Set([null, NaN, 0]);

            expect(isTruthy(truthySet)).toBe(true);
            expect(isTruthy(truthySet2)).toBe(true);
        });

        test("Maps containing at least one truthy value", () => {
            const truthyMap = new Map(); truthyMap.set("foo", 0);
            const truthyMap2 = new Map([["foo", 0]]);

            expect(isTruthy(truthyMap)).toBe(true);
            expect(isTruthy(truthyMap2)).toBe(true);
        });
    });

    //--------------------------------------------------

    // Falsy values include null, undefined, empty strings, NaN, and empty objects or objects containing only falsy values.
    describe("Falsy values", () => {
        test("Primitive falsy values", () => {
            expect(isTruthy(null)).toBe(false);
            expect(isTruthy(undefined)).toBe(false);
            expect(isTruthy(false)).toBe(false);
            expect(isTruthy(NaN)).toBe(false);
            expect(isTruthy("")).toBe(false);
            expect(isTruthy(0, false)).toBe(false); // 0 considered falsy
        });

        test("Empty or falsy-only objects", () => {
            expect(isTruthy({})).toBe(false);
            expect(isTruthy({ id: NaN, foo: "", baz: undefined })).toBe(false);
            expect(isTruthy({ id: 0 }, false)).toBe(false); // With zero as falsy
        });

        test("Objects with all values being falsy when the third argument is true", () => {
            expect(isTruthy({ id: 1, foo: "" }, true, true)).toBe(false);
            expect(isTruthy({ id: 1, data: { foo: "" } }, true, true)).toBe(false);
        });

        test("Empty or falsy-only arrays", () => {
            expect(isTruthy([])).toBe(false);
            expect(isTruthy([[null, undefined], NaN, [{}, [], [[""], false]]])).toBe(false);
            expect(isTruthy([[null, undefined], NaN, [{}, [], [[""], false]], 0], false)).toBe(false); // With zero as falsy
        });

        test("Empty or falsy-only sets", () => {
            const falsySet = new Set([null, NaN, ""]);
            const falsyZeroSet = new Set([null, NaN, "", 0]);

            expect(isTruthy(new Set())).toBe(false);
            expect(isTruthy(falsySet)).toBe(false);
            expect(isTruthy(falsyZeroSet, false)).toBe(false); // With zero as falsy
        });

        test("Empty or falsy-only maps", () => {
            const falsyMap = new Map(); falsyMap.set("foo", undefined);
            const falsyZeroMap = new Map(); falsyZeroMap.set("foo", 0);

            expect(isTruthy(new Map())).toBe(false);
            expect(isTruthy(falsyMap)).toBe(false);
            expect(isTruthy(falsyZeroMap, false)).toBe(false); // With zero as falsy
        });
    });
});