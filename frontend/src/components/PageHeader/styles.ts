import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 6rem 0 3rem 0;

  strong {
    font-size: 2rem;
  }

  span {
    font-size: 1.2rem;
    color: var(--table-gray);
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
