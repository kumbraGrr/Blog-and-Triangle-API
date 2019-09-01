const {stringToNum, lineLng, checking, compare, check} = require('../util');

test('Should convert string to a number', () => {
    const stringToNumb = stringToNum('11, 3.2');
    expect(stringToNumb).toStrictEqual([11, 3.2]);
    //Second test
    const stringToNumb2 = stringToNum('0, -123');
    expect(stringToNumb2).toStrictEqual([0, -123]);
});

test('Should check if user input more than 2 expected values', () => {
    const stringToNumb = stringToNum('11, 23, 33');
    expect(stringToNumb).toBe(false);
    //Second test
    const stringToNumb2 = stringToNum('11, 23, 33, 22, 3.2');
    expect(stringToNumb2).toBe(false);
});

test('Should check if user input less than two value or undefined', () => {
    const stringToNumb = stringToNum('2');
    expect(stringToNumb).toBe(false);
    //Second test
    const stringToNumbNone = stringToNum('');
    expect(stringToNumbNone).toBe(false);
    //Third test
    const stringToNumbNone2 = stringToNum(undefined);
    expect(stringToNumbNone2).toBe(false);
});

test('Should measure vector distance between two points', () => {
    const measureVector = lineLng([2, 3], [3, 4]);
    expect(measureVector).toEqual(1.41);
    //Second test
    const measureVector2 = lineLng([3, 4.2], [-1, 0]);
    expect(measureVector2).toEqual(5.8);
});

test('Check if any of the input values is not converted to a number', () => {
    const checkiFNaN = checking([[2, 3], [3, 3.14], [0,-12]]);
    expect(checkiFNaN).toBe(true);
    //Second test
    const checkiFNaN2 = checking([[2, NaN], [3, 3.14], [0,-12]]);
    expect(checkiFNaN2).toBe(false);
});

test('If two points are the same return false', () => {
    const samePoint = check([1,5], [1,5]);
    expect(samePoint).toBe(false);
    //Second test
    const check2 = check([2,4], [1,4]);
    expect(check2).toBe(true);
});

test('Comparing lengths of the vectors', () => {
    const comparation = compare(2.8, 2.8, 2.8);
    expect(comparation).toEqual("Equilateral");
    //Second test
    const comparation2 = compare(2.8, 2.8, 3);
    expect(comparation2).toEqual("Isosceles");
    //Third test
    const comparation3 = compare(3, 2.8, 2.8);
    expect(comparation3).toEqual("Isosceles");
    //Fourth test
    const comparation4 = compare(2.8, 3, 2.8);
    expect(comparation4).toEqual("Isosceles");
    //Fifth test
    const comparation5 = compare(1.4, 3, 2.8);
    expect(comparation5).toEqual("Scalene");
});
