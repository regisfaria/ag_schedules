import styled, { css } from 'styled-components';
import { shade } from 'polished';

import imgProfile from '../../assets/imgProfile.jpg';

interface ButtonForEditProps {
  cancel: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  overflow-x: hidden;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 80px;

    width: 90%;
  }

  @media (min-width: 1024px) {
    form {
      main {
        flex-direction: row;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${imgProfile});

  height: 15.625rem;

  width: 100vw;

  img {
    margin-top: 15.625rem;
    height: 13rem;
    border-radius: 50%;
    z-index: 1;
  }

  @media (min-width: 600px) {
    img {
      height: 15rem;
      border-radius: 50%;
    }
  }
`;

export const ButtonEditContainer = styled.div<ButtonForEditProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${props =>
    props.cancel &&
    css`
      display: none;
    `}
`;

export const ButtonSaveAndCancelContainer = styled.div<ButtonForEditProps>`
  display: none;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  button {
    max-width: 10rem;
    padding: 0;
    & + button {
      background: var(--error-red);

      &:hover {
        background: ${shade(0.2, '#c53030')};
      }
    }
  }
  ${props =>
    props.cancel &&
    css`
      display: flex;
    `}

  @media (min-width: 460px) {
    button {
      max-width: 15rem;
    }
  }

  @media (min-width: 768px) {
    justify-content: center;
    button {
      max-width: 20rem;

      & + button {
        margin-left: 10rem;
      }
    }
  }
`;

export const TextAreaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
