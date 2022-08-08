function checkIsCorrect(str) {
  let notCorrectItems = new RegExp(
    /^\*|^\/|\D+$|\D\D\D|\*{2}|\/{2}|\*\/|\/\*|\+\*|-\*|\+\/|-\/|\/0/,
    'g'
  );
  if (notCorrectItems.test(str)) return false;
  return true;
}

function getCalcArr(str) {
  const regexp = RegExp(/\d+|\D/g);
  let tempArr = [];
  let resArr = [];

  while ((tempArr = regexp.exec(str)) !== null) {
    let item =
      parseInt(tempArr[0]) || parseInt(tempArr[0]) === 0
        ? parseInt(tempArr[0])
        : tempArr[0];
    resArr.push(item);
  }

  return resArr.reduce((acc, item, index) => {
    if (typeof item === 'number') {
      acc.push(item);
      return acc;
    }

    if (resArr[index - 1] && typeof resArr[index - 1] === 'number') {
      acc.push(item);
      return acc;
    }

    if (
      item === '-' &&
      (!resArr[index - 1] || typeof resArr[index - 1] === 'string')
    ) {
      acc.push(-1);
      acc.push('*');
    }

    return acc;
  }, []);
}

function mathOperation(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return null;
  }
}

function makePlusAndMinus(arr) {
  if (arr.length <= 1) return arr[0];
  const res = mathOperation(arr[0], arr[1], arr[2]);
  return makePlusAndMinus([res, ...arr.slice(3)]);
}

function makeMultiplicationAndDivision(arr) {
  if (arr.indexOf('*') === -1 && arr.indexOf('/') === -1) return arr;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === '*' || arr[i] === '/') {
      let answer = mathOperation(arr[i - 1], arr[i], arr[i + 1]);
      return [
        ...arr.slice(0, i - 1),
        ...makeMultiplicationAndDivision([answer, ...arr.slice(i + 2)]),
      ];
    }
  }
}

export const mathEvaluate = (str) => {
  if (!checkIsCorrect(str)) {
    return false;
  }

  let calcArr = getCalcArr(str);
  calcArr = makeMultiplicationAndDivision(calcArr);
  return makePlusAndMinus(calcArr);
};

export {
  checkIsCorrect,
  getCalcArr,
  makePlusAndMinus,
  makeMultiplicationAndDivision,
};
