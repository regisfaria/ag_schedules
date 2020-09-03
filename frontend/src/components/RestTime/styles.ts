import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 50rem;
`;

export const ListRestDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  max-height: 24rem;
  overflow: auto;

  form {
    height: 100%;
    width: 90%;
    margin-top: 0;

    section {
      margin: 1rem auto;

      span {
        margin: 0 0.5rem 0 0.5rem;
        font-size: 1.4rem;

        & + span {
          margin-left: 1rem;
        }
      }

      > div {
        margin: 0;
        max-width: 10rem;
        padding: 1rem;
        > svg {
          width: 1.5rem;
          margin-right: 0.5rem;
        }
      }

      button {
        margin: 0;
        background: none;
        border: none;
        text-decoration: none;
        text-align: center;

        svg {
          padding-top: 0.5rem;
        }

        :hover {
          background: none;
          color: red;
          size: 4rem;
        }
      }
    }
  }

  > span {
    text-align: center;
  }
`;

export const ButtonToEditOrRemove = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 5rem !important;
`;

export const ButtonToCancelOrAccept = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  max-width: 5rem !important;
`;

export const NewRestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  form {
    width: 90%;

    section {
      > span {
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

    p {
      margin-top: 3rem;
      width: 30rem;
      text-align: center;
      color: var(--table-gray);
    }
  }
`;
