import { useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px 0;
`;

const Item = styled.div`
  width: 35px;
  height: 35px;
  margin: 4px;
  background-color: ${(props) => props.itemColor || '#3b3b3b'};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: white;
  font-weight: 500;
  &:hover {
    background-color: ${(props) => props.itemColorHover || '#555557'};
  }
  @media (max-width: 480px) {
    width: 32px;
    height: 40px;
    margin: 2px;
  }
`;

const Button = styled.div`
  width: 90px;
  height: 40px;
  margin: 5px;
  background-color: #3b3b3b;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #555557;
  }
`;

const NumbersPanel = ({ numbers, clickHandler, delHandler, delAllHandler }) => {
  return (
    <Container>
      <Row>
        {Object.keys(numbers)
          .slice(0, 10)
          .map((key) => (
            <Item
              key={key}
              itemColor={COLORS[numbers[key]]}
              itemColorHover={COLORS[numbers[key] + '_hover']}
              onClick={() => clickHandler(key)}
            >
              {key}
            </Item>
          ))}
      </Row>
      <Row>
        <Button onClick={delHandler}>Delete</Button>
        {Object.keys(numbers)
          .slice(10)
          .map((key) => (
            <Item
              key={key}
              itemColor={COLORS[numbers[key]]}
              itemColorHover={COLORS[numbers[key] + '_hover']}
              onClick={() => clickHandler(key)}
            >
              {key}
            </Item>
          ))}
        <Button onClick={delAllHandler}>Delete All</Button>
      </Row>
    </Container>
  );
};

export default NumbersPanel;
