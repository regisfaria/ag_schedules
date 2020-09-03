import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 50rem;

  form {
    width: 90%;

    section {
      > span {
        margin-right: 2rem;
      }

      div {
        margin: 0 3rem 0 0;

        svg {
          width: 1.5rem;
          margin-right: 0.5rem;
        }
      }

      & + section {
        margin: 3rem auto;

        span {
          margin-right: 1.5rem;
        }
      }
    }

    p {
      margin: 3rem 0 3rem 0;
      width: 40rem;
      text-align: center;
      color: var(--table-gray);
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
