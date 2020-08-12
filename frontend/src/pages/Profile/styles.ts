import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  /* @media (min-width: 810px) {
    height: 100vh;
  } */
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: blue;

  width: 100%;

  height: 15.625rem;

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
  height: 100%;
  width: 100%;

  padding-top: 50px;

  form {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
    align-items: center;
    justify-content: center;

    div {
      span {
        font-size: 1.3rem;
      }
      input {
        margin-bottom: 90px;
      }
    }
  }

  background: red;
  /* background: var(--light-blue); */

  button {
    width: 15rem;
  }

  @media (min-width: 510px) {
    font-size: 40%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 20rem;
    margin-bottom: 1rem;
  }
`;
