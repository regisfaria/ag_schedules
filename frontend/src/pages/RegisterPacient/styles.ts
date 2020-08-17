import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import doctorImg from '../../assets/doctor.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  background-image: url(${doctorImg});
  /* background-position: center; */
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 50rem;
  background-color: var(--light-blue);

  @media only screen and (max-width: 450px) and (min-height: 500px) and (max-height: 680px) {
    height: 100%;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimatedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  animation: ${appearFromLeft} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 90%;
  }

  > a {
    color: var(--green);
    transition: color 0.2s;
    text-decoration: none;

    margin: 1rem;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#09644b')};
    }
  }
`;
