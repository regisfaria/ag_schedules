import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  width: 100%;

  div {
    width: 100%;
    height: 100%;

    h1 {
      padding-top: 0.65rem;
      font-weight: 500px;
      color: var(--table-black);
      text-align: center;
    }
  }
`;
