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

export const ListRestDay = styled.div`
  max-height: 24rem;
  overflow: auto;

  form {
    height: 100%;
    margin-top: 0;

    section {
      margin: 1rem auto;

      span {
        margin: 0 0.5rem 0 0.5rem;

        & + span {
          margin-left: 1rem;
        }
      }

      div {
        margin: 0;
        padding: 0;
        border-radius: 10px 0 0 10px;

        & + div {
          border-radius: 0 10px 10px 0;
        }
      }
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
      color: red;
    }

    :hover {
      background: none;
      color: red;
      size: 4rem;
    }
  }
`;

export const ButtonToEditOrRemove = styled.div`
  display: flex;
`;

export const ButtonToCancelOrAccept = styled.div`
  display: flex;
`;
