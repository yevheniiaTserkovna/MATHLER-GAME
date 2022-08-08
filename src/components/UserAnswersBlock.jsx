import styled from 'styled-components';
import { COLORS, NUMBER_COUNT, ROW_COUNT } from '../constants';

const Container = styled.div`
  margin-top: -90px;
  margin-bottom: 15px;
  width: 80%;
  background: #b6b6b8;
  padding: 10px 0;
  border-radius: 5px;
  position: relative;
  @media (max-width: 480px) {
    width: 92%;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const Item = styled.div`
  width: 40px;
  height: 40px;
  margin: 2px 8px;
  font-size: 20px;
  background-color: ${(props) => props.itemColor || 'white'};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 0 0 / 35%) 0px 1px 3px;
  color: ${(props) => (props.itemColor ? 'white' : '#0e0e10')};
  font-weight: 500;
`;

const UserAnswersBlock = ({ history, current }) => {
  const currentRow = [
    ...current,
    ...new Array(NUMBER_COUNT - current.length).fill(''),
  ];

  return (
    <Container>
      {history.map((historyRow, index) => (
        <Row key={index}>
          {historyRow.map((item, index) => (
            <Item key={index} itemColor={COLORS[item.type]}>
              {item.content}
            </Item>
          ))}
        </Row>
      ))}
      {history.length < ROW_COUNT && (
        <Row>
          {currentRow.map((item, index) => (
            <Item key={index}>{item}</Item>
          ))}
        </Row>
      )}
      {ROW_COUNT - history.length > 1 &&
        new Array(ROW_COUNT - history.length - 1)
          .fill('')
          .map((item, index) => {
            return (
              <Row key={index}>
                {new Array(NUMBER_COUNT).fill('').map((item, index) => (
                  <Item key={index} />
                ))}
              </Row>
            );
          })}
    </Container>
  );
};

export default UserAnswersBlock;
