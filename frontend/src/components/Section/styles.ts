import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    max-width: 70rem;

    span {
      font-size: 1.2rem;
    }

    input {
      width: 100%;
      font-size: 1.4rem;
    }

    select {
      width: 100%;
      font-size: 1.4rem;
    }
  }

  @media (min-width: 425px) {
    div {
      span {
        font-size: 1.4rem;
      }
    }
  }

  @media (min-width: 1024px) {
    margin: 1.5rem;

    strong {
      font-size: 1.6rem;
    }
  }
`;
