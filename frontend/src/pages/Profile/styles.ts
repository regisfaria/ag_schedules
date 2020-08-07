import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  @media (min-width: 810px) {
    height: 100vh;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 13rem;
    border-radius: 50%;
  }

  @media (min-width: 430px) {
    img {
      margin-top: 8rem;
      height: 15rem;
      border-radius: 50%;
    }
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  background: var(--light-blue);

  form {
    input {
      width: 90% !important;
    }
  }

  button {
    width: 15rem;
  }

  @media (min-width: 810px) {
    width: 90%;

    margin-top: 15px;

    height: 600px;

    border-radius: 10px;
    box-shadow: 0 1px 4px 2px var(--black);

    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: red;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #b30000;
    }

    form {
      margin-top: 4rem;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-around;
      width: 100%;
    }
  }
`;

export const ButtonContainer = styled.div`
  button {
    width: 20rem;
    margin-bottom: 1rem;
  }
`;
