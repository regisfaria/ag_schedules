import styled, { css } from 'styled-components';

import imgProfile from '../../assets/imgProfile.jpg';

interface ButtonForEditProps {
  cancel: boolean;
}

export const Container = styled.div`
  width: 100%;

  overflow-x: hidden;

  /* @media (min-width: 810px) {
    height: 100vh;
  } */
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

export const Main = styled.div`
  width: 100%;

  padding-top: 80px;

  /* background: red; */
  background: var(--light-blue);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      div {
        width: 90%;
        max-width: 900px;

        input {
          width: 100%;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    form {
      flex-direction: row;
    }
  }
`;

export const ButtonEditContainer = styled.div<ButtonForEditProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    width: 90%;
    max-width: 200px;

    margin-bottom: 1rem;
  }

  ${props =>
    props.cancel &&
    css`
      display: none;
    `}
`;
export const ButtonSaveAndCancelContainer = styled.div<ButtonForEditProps>`
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    width: 90%;
    max-width: 200px;

    margin-bottom: 1rem;

    & + button {
      background: var(--error-red);
      margin-left: 100px;
    }
  }
  ${props =>
    props.cancel &&
    css`
      display: flex;
    `}
`;

export const TextAreaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  div {
    width: 90%;
    height: 300px;
    max-width: 2200px;

    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    div {
      width: 95%;
    }
  }
`;
