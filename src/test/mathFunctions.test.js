import {
  checkIsCorrect,
  getCalcArr,
  makeMultiplicationAndDivision,
  makePlusAndMinus,
  mathEvaluate,
} from '../mathFunctions';

describe('checkIsCorrect function', () => {
  test('should return TRUE', () => {
    expect(checkIsCorrect('-100-10/2')).toBeTruthy();
    expect(checkIsCorrect('123456')).toBeTruthy();
    expect(checkIsCorrect('00000')).toBeTruthy();
    expect(checkIsCorrect('--24/3+8')).toBeTruthy();
  });

  test('should return FALSE', () => {
    expect(checkIsCorrect('1+2+3+')).toBeFalsy();
    expect(checkIsCorrect('+-*98')).toBeFalsy();
    expect(checkIsCorrect('5+*9/3')).toBeFalsy();
    expect(checkIsCorrect('5+6/0')).toBeFalsy();
    expect(checkIsCorrect('------')).toBeFalsy();
  });
});

describe('getCalcArr function', () => {
  test('should return correct array', () => {
    expect(getCalcArr('6+7*9')).toEqual([6, '+', 7, '*', 9]);
    expect(getCalcArr('-+24/3+8')).toEqual([-1, '*', 24, '/', 3, '+', 8]);
    expect(getCalcArr('24--3+8/2')).toEqual([
      24,
      '-',
      -1,
      '*',
      3,
      '+',
      8,
      '/',
      2,
    ]);
    expect(getCalcArr('000000')).toEqual([0]);
  });
});

describe('makeMultiplicationAndDivision function', () => {
  test('should replace 7 * 9 on 63', () => {
    const result = makeMultiplicationAndDivision([6, '+', 7, '*', 9]);
    const expectedResult = [6, '+', 63];
    expect(result).toEqual(expectedResult);
  });

  test('should replace 100 */ 2 on 50 and 5 * 9 on 45', () => {
    const result = makeMultiplicationAndDivision([100, '/', 2, '+', 5, '*', 9]);
    const expectedResult = [50, '+', 45];
    expect(result).toEqual(expectedResult);
  });

  test('should replace -1 * 5 on -5', () => {
    const result = makeMultiplicationAndDivision([-1, '*', 5]);
    const expectedResult = [-5];
    expect(result).toEqual(expectedResult);
  });

  test('should return the same array', () => {
    expect(makeMultiplicationAndDivision([5 + 9 - 2])).toEqual([5 + 9 - 2]);
    expect(makeMultiplicationAndDivision([123])).toEqual([123]);
  });
});

describe('makePlusAndMinus function', () => {
  test('should return correct value', () => {
    expect(makePlusAndMinus([6, '+', 7, '-', 9])).toEqual(4);
    expect(makePlusAndMinus([100, '-', 105, '+', 5])).toEqual(0);
    expect(makePlusAndMinus([22])).toEqual(22);
  });
});

describe('mathEvaluate function', () => {
  test('should return correct value', () => {
    expect(mathEvaluate('16/2-8')).toEqual(0);
    expect(mathEvaluate('90/9+7')).toEqual(17);
    expect(mathEvaluate('50-5*6')).toEqual(20);
    expect(mathEvaluate('123456')).toEqual(123456);
  });

  test('should return false', () => {
    expect(mathEvaluate('50-50*')).toEqual(false);
    expect(mathEvaluate('50-/50')).toEqual(false);
  });
});
