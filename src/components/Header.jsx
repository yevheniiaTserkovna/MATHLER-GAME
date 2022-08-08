import { HelpOutlineOutlined, SchoolOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import bgImg from '../img/headerBg_2.webp';

const Container = styled.header`
  width: 90%;
  margin-top: 15px;
  padding: 20px 0 110px 0;
  background: url(${bgImg});
  border-radius: 5px;
  color: white;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  position: relative;
  @media (max-width: 480px) {
    width: 100%;
    margin-top: -10px;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 10px;
  left: ${(props) => props.type === 'info' && '10px'};
  right: ${(props) => props.type === 'complexity' && '10px'};
  cursor: pointer;
  font-size: 30px;
  display: flex;
  align-items: center;
  @media (max-width: 480px) {
    top: 20px;
  }
`;

const MainTitle = styled.h1`
  text-align: center;
  margin: 20px 0 10px 0;
`;

const SubTitle = styled.h3`
  text-align: center;
  margin-bottom: 15px;
  font-size: 17px;
  font-weight: 400;
`;

const LevelSpan = styled.span`
  margin-right: 3px;
  font-size: 14px;
  text-transform: uppercase;
`;

const Span = styled.span`
  font-size: 20px;
`;

const Header = ({ content, showInfo, complexity, changeComplexity }) => {
  return (
    <Container>
      <Info onClick={showInfo} type='info'>
        <HelpOutlineOutlined style={{ fontSize: '30px' }} />
      </Info>
      <Info type='complexity' onClick={changeComplexity}>
        <LevelSpan>{complexity}</LevelSpan>
        <SchoolOutlined style={{ fontSize: '30px' }} />
      </Info>
      <MainTitle>MATHLER GAME</MainTitle>
      <SubTitle>
        Find the hidden calculation that equals <Span>{content}</Span>
      </SubTitle>
    </Container>
  );
};

export default Header;
