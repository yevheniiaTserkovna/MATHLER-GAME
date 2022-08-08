import styled from 'styled-components';
import { COLORS } from '../constants';

const Content = styled.div``;

const P = styled.p`
  margin: 10px 0;
`;

const PBold = styled(P)`
  font-weight: 500;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const Item = styled.div`
  width: 35px;
  height: 35px;
  margin: 2px 5px;
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

const SpanSmall = styled.span`
  font-size: 12px;
  font-style: italic;
`;

const Info = () => {
  const example = [
    { content: '1', type: 'correct' },
    { content: '0', type: 'exists' },
    { content: '/', type: 'wrong' },
    { content: '2', type: 'correct' },
    { content: '+', type: 'wrong' },
    { content: '7', type: 'exists' },
  ];

  return (
    <Content>
      <P>Try to find the hidden calculation in 6 guesses!</P>
      <P>
        After each guess, the color of the tiles will change to show how close
        you are to the solution.
      </P>
      <Row>
        {example.map((item, index) => (
          <Item key={index} itemColor={COLORS[item.type]}>
            {item.content}
          </Item>
        ))}
      </Row>
      <P>• Green are in the correct place.</P>
      <P>• Yellow are in the solution, but in a different place.</P>
      <P>• Gray are not in the solution.</P>
      <br />
      <PBold>Difficulty</PBold>
      <P>• LOW - with yellow hints.</P>
      <P>
        • HIGH - no yellow hints
        <br />
        <SpanSmall>
          (Gray numbers may be in the solution but in a different place.)
        </SpanSmall>
      </P>
    </Content>
  );
};

export default Info;
