import React from 'react';
import { useEffect } from 'react';
import { css } from 'styled-components';

const Comp = ({ test }) => {
  console.log('Comp!');
  useEffect(() => {
    console.log('Comp useEffect!');
  }, [test]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'red',
        width: '100px',
        height: '100px',
      }}
    >
      test
    </div>
  );
};

export default Comp;
