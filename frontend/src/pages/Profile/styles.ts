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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 80px;

    width: 90%;
  }

  @media (min-width: 770px) {
    form {
      main {
        max-width: 68.7rem;
      }
    }
  }

  @media (min-width: 1024px) {
    form {
      main {
        max-width: 123rem;
        align-items: flex-start;
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

  width: 100%;
`;

export const AvatarInput = styled.div`
  margin-top: 15.625rem;

  position: relative;
  img {
    border-radius: 50%;
    height: 13rem !important;
    width: 13rem !important;
    z-index: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 4.8rem;
    height: 4.8rem;

    background-color: black;
    border-radius: 50%;

    bottom: 0;
    right: 0;

    border: 0;

    svg {
      width: 20px;
      height: 20px;
      color: white;
    }

    &:hover {
      background: ${shade(0.2, '#000')};
    }
  }

  @media (min-width: 600px) {
    img {
      height: 15rem !important;
      width: 15rem !important;
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

  @media (min-width: 770px) {
    max-width: 68.7rem;
  }

  @media (min-width: 1024px) {
    max-width: 120rem;
  }
`;
