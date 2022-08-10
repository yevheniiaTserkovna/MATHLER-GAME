import styled from 'styled-components';
import { usePopap } from './PopapContext';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.isVisible ? 'rgba(85, 82, 82, 0.8)' : 'transparent'};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  z-index: 999;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  padding: 20px;
  width: 300px;
  border-radius: 5px;
  background-color: #d2dadd;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.isVisible ? '0' : '-150vh')};
  transition: all 0.5s ease;
`;

const Content = styled.div``;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const Button = styled.div`
  width: 80px;
  height: 35px;
  margin: 20px 0 0 0;
  background-color: #3b3b3b;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #555557;
  }
`;

const Popap = () => {
  const { isVisible, title, text, hide } = usePopap();
  const popap = usePopap();

  console.log('popap = ', popap);

  const closeClick = (e) => {
    if (e.target.dataset.closepopap) hide();
  };

  return (
    <Wrapper isVisible={isVisible} onClick={closeClick} data-closepopap={true}>
      <Container isVisible={isVisible}>
        <Title>{title}</Title>
        <Content>{text}</Content>
        <Button onClick={hide}>OK</Button>
      </Container>
    </Wrapper>
  );
};

export default Popap;
