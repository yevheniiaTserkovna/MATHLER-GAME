import styled from 'styled-components';
import winnerImg from '../img/winner.png';
import gameOverImg from '../img/gameOver.png';
import { useEffect } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';

const WinnerBlock = styled.div`
  width: 100%;
  height: ${(props) => (props.status === 'winner' ? '170px' : '120px')};
  margin-top: ${(props) => (props.status === 'winner' ? '-55px' : '0')};
`;

const Image = styled.img`
  width: 100%;
`;

const GameStatus = ({ status }) => {
  const el = useRef(null);

  useEffect(() => {
    gsap.fromTo(el.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <WinnerBlock status={status} ref={el}>
      <Image src={status === 'winner' ? winnerImg : gameOverImg} />
    </WinnerBlock>
  );
};

export default GameStatus;
