//import { evaluate } from 'mathjs';
import { useCallback } from 'react';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import Comp from './components/Comp';
import Info from './components/Info';
import NumbersPanel from './components/NumbersPanel';
import Popap from './components/Popap';
import UserAnswersBlock from './components/UserAnswersBlock';
import { NUMBER_COUNT, ROW_COUNT } from './constants';
import { mathEvaluate } from './mathFunctions';
import { useMemo } from 'react';
import { usePopap } from './components/PopapContext';

const Wrapper = styled.section`
  height: 100vh;
  background: #e7e7e6e0;
`;

const Content = styled.div`
  width: 460px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Button = styled.button`
  box-shadow: 0px 10px 14px -7px #3e7327;
  background: linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
  background-color: #77b55a;
  border-radius: 4px;
  border: 1px solid #4b8f29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 12px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #5b8a3c;
  width: 125px;
  margin-top: 10px;
  z-index: 1;
  &:hover {
    background: linear-gradient(to bottom, #72b352 5%, #77b55a 100%);
    background-color: #72b352;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

const checkAnswer = (referenceArr, userArr, complexity) => {
  let arrForCheckExist = [...referenceArr];
  let historyItem = [];

  userArr.map((item, index) => {
    let answer = { content: item };
    let rightPosOfItem = arrForCheckExist.indexOf(item);

    if (item === referenceArr[index]) {
      answer.type = 'correct';
    } else if (rightPosOfItem !== -1 && complexity === 'low') {
      answer.type = 'exists';
      arrForCheckExist.splice(rightPosOfItem, 1);
    } else {
      answer.type = 'wrong';
    }
    historyItem.push(answer);
    return true;
  });

  return historyItem;
};

const updateNumberButtons = (numberButtons, newHistoryRow) => {
  let updatedNumberButtons = { ...numberButtons };
  newHistoryRow.map((item) => {
    if (item.type === 'wrong' && !updatedNumberButtons[item.content]) {
      updatedNumberButtons[item.content] = 'wrong';
    } else if (
      item.type === 'exists' &&
      updatedNumberButtons[item.content] !== 'correct'
    ) {
      updatedNumberButtons[item.content] = 'exists';
    } else if (item.type === 'correct') {
      updatedNumberButtons[item.content] = 'correct';
    }
    return true;
  });
  return updatedNumberButtons;
};

const initialData = {
  history: [],
  currentRow: [],
  gameStatus: false,
  numberButtons: {
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
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    case 'SET_NUMBER_BUTTONS':
      return { ...state, numberButtons: action.payload };
    case 'SET_CURRENT_ROW':
      return { ...state, currentRow: action.payload };
    case 'SET_GAME_STATUS':
      return { ...state, gameStatus: action.payload };
    default:
      return state;
  }
};

const Game = ({
  calculation,
  newGameHandler,
  complexity,
  changeComplexityHandler,
}) => {
  const rightAnswer = useMemo(
    () => mathEvaluate(calculation.join('')),
    [calculation]
  );

  const [state, dispatch] = useReducer(reducer, initialData);
  const popap = usePopap();

  const userClick = useCallback(
    (val) => {
      if (state.currentRow.length === NUMBER_COUNT) return;
      dispatch({
        type: 'SET_CURRENT_ROW',
        payload: [...state.currentRow, val],
      });
    },
    [state.currentRow]
  );

  const delClick = useCallback(() => {
    dispatch({
      type: 'SET_CURRENT_ROW',
      payload: [...state.currentRow.slice(0, state.currentRow.length - 1)],
    });
  }, [state.currentRow]);

  const delAllClick = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_ROW', payload: [] });
  }, []);

  const enterHandler = () => {
    if (state.gameStatus) {
      newGameHandler();
      return;
    }

    if (state.currentRow.length !== 6) {
      popap.show('Not enough items', 'Fill in all items');
      return;
    }

    //const userAnswer = evaluate(currentRow.join(''));
    const userAnswer = mathEvaluate(state.currentRow.join(''));
    if (userAnswer === false) {
      popap.show('Incorrect calculation', 'calculation is incorrect');
      return;
    }

    if (userAnswer !== rightAnswer) {
      popap.show(
        'Wrong calculation',
        'calculation does not equal ' + rightAnswer
      );
      return;
    }

    const historyItem = checkAnswer(calculation, state.currentRow, complexity);
    const updatedNumberButtons = updateNumberButtons(
      state.numberButtons,
      historyItem
    );

    dispatch({ type: 'SET_HISTORY', payload: historyItem });
    dispatch({ type: 'SET_NUMBER_BUTTONS', payload: updatedNumberButtons });
    delAllClick();
  };

  const showInfo = useCallback(() => {
    popap.show('How to play Mathler', <Info />);
  }, [popap]);

  useEffect(() => {
    if (!state.history.length) return;

    const isRightAnswer = state.history[state.history.length - 1].every(
      (item) => item.type === 'correct'
    );

    if (isRightAnswer) {
      dispatch({ type: 'SET_GAME_STATUS', payload: 'winner' });
    } else if (state.history.length === ROW_COUNT) {
      dispatch({ type: 'SET_GAME_STATUS', payload: 'gameOver' });
    }
  }, [state.history]);

  return (
    <Wrapper>
      <Popap />
      <Content>
        <Header
          content={rightAnswer}
          showInfo={showInfo}
          changeComplexity={changeComplexityHandler}
          complexity={complexity}
        />
        <UserAnswersBlock history={state.history} current={state.currentRow} />
        {state.gameStatus && <GameStatus status={state.gameStatus} />}
        {!state.gameStatus && (
          <NumbersPanel
            numbers={state.numberButtons}
            clickHandler={userClick}
            delHandler={delClick}
            delAllHandler={delAllClick}
          />
        )}
        <Button onClick={enterHandler}>
          {state.gameStatus ? 'NEW GAME' : 'ENTER'}
        </Button>
      </Content>
    </Wrapper>
  );
};

export default Game;
export { checkAnswer, updateNumberButtons };
