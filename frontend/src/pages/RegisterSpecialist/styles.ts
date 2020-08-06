import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;

  /* cellphone view */
  @media (max-width: 600px) {
    margin: 0;
    margin-top: 0;

    border-radius: 0;
    width: 100%;

    h1 {
      padding-top: 5px;
    }
  }
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  align-items: stretch;

  background: var(--light-blue);

  place-content: center;
  justify-self: center;
  border-radius: 50px;

  /* cellphone view */
  @media (max-width: 600px) {
    border-radius: 0;
    margin-bottom: 0;
    height: 100vh;
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

  place-content: center;
  align-items: center;
  justify-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 40px 0 20px 0;
    width: 100%;

    text-align: center;

    h1 {
      margin-top: 10px;
      margin-bottom: 26px;
      font-weight: 500;
      color: var(--table-black);
    }

    #userType {
      text-align: center;
    }
  }

  > a {
    color: var(--green);
    transition: color 0.2s;
    text-decoration: none;

    margin-top: 24px;
    margin-bottom: 30px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#09644b')};
    }
  }

  /* cellphone view */
  @media (max-width: 600px) {
    border-radius: 0;
    margin-bottom: 0;

    form {
      margin: 0;
    }
  }
`;