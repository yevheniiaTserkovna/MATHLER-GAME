import { checkAnswer, updateNumberButtons } from '../Game';

describe('checkAnswer function', () => {
  test('should return correct array', () => {
    const calculation = ['1', '6', '/', '2', '-', '8'];
    const userArr = ['1', '8', '/', '2', '-', '9'];

    const resultLowComplexity = [
      { content: '1', type: 'correct' },
      { content: '8', type: 'exists' },
      { content: '/', type: 'correct' },
      { content: '2', type: 'correct' },
      { content: '-', type: 'correct' },
      { content: '9', type: 'wrong' },
    ];

    const resultHighComplexity = [
      { content: '1', type: 'correct' },
      { content: '8', type: 'wrong' },
      { content: '/', type: 'correct' },
      { content: '2', type: 'correct' },
      { content: '-', type: 'correct' },
      { content: '9', type: 'wrong' },
    ];

    expect(checkAnswer(calculation, userArr, 'low')).toEqual(
      resultLowComplexity
    );
    expect(checkAnswer(calculation, userArr, 'high')).toEqual(
      resultHighComplexity
    );
  });
});

describe('updateNumberButtons function', () => {
  test('should return correct array', () => {
    const numberButtons = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      '+': '',
      '-': '',
      '*': '',
      '/': '',
    };
    const userAnswer = [
      { content: '1', type: 'correct' },
      { content: '8', type: 'exists' },
      { content: '/', type: 'correct' },
      { content: '2', type: 'correct' },
      { content: '-', type: 'correct' },
      { content: '9', type: 'wrong' },
    ];
    const result = {
      0: '',
      1: 'correct',
      2: 'correct',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: 'exists',
      9: 'wrong',
      '+': '',
      '-': 'correct',
      '*': '',
      '/': 'correct',
    };

    expect(updateNumberButtons(numberButtons, userAnswer)).toEqual(result);
  });
});
