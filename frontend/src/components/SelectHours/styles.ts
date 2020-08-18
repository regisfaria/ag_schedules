import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 90%;

  main {
    flex-direction: row;
  }

  div {
    margin: 0.5rem;
    max-width: 15rem;

    select {
    }
  }

  @media (min-width: 425px) {
    strong {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 1024px) {
    strong {
      font-size: 3rem;
    }
  }
`;
