import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: var(--light-blue);

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  place-content: center;
  justify-self: center;

  form {
    h1 {
      align-self: center;
      text-align: center;
      margin-bottom: 1em;
    }

    align-self: center;

    #consultStatus {
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
    align-self: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.5, '#09644b')};
    }
  }
`;
