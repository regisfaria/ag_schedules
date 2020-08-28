import styled from 'styled-components';

export const Container = styled.div`
  section {
    span {
      margin-right: 2rem;
    }

    div {
      margin: 0 3rem 0 0;
    }

    & + section {
      margin: 3rem auto;

      span {
        margin-right: 1.5rem;
      }
    }
  }

  button {
    background-image: linear-gradient(180deg, #0aa278 0%, #043c2c 100%);
  }

  #spanNotification {
    margin-top: 3rem;
    width: 30rem;
    text-align: center;
    color: var(--table-gray);
  }
`;
