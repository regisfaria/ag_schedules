import styled from 'styled-components';
import ImgContent from '../../assets/bg.jpg';

export const LoginWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background: url(${ImgContent});
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 85%;
  max-width: 600px;

  img {
    width: 95%;
    max-width: 35rem;
    margin: 2rem 0 0 0;
  }

  background: var(--light-blue);

  border-radius: 7px;
  box-shadow: 0 1px 15px 1px var(--black);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 90%;

    strong {
      text-align: center;
      font-size: 18px;
      color: var(--table-black);
      margin: 1rem;
    }

    div {
      margin-top: 0;

      input {
        width: 100%;
        font-size: 14px;
      }
    }

    a {
      text-decoration: none;
      color: var(--table-black);
      transition: color 0.3s;

      font-size: 14px;

      &:hover {
        color: var(--green);
      }
    }

    button {
      width: 90%;
      max-width: 300px;
      margin: 20px 0 20px 0;
      font-size: 14px;
    }
  }

  @media (min-width: 1024px) {
    form {
      strong {
        font-size: 20px;
      }

      div {
        input {
          font-size: 16px;
        }
      }

      a {
        font-size: 16px;
      }

      button {
        font-size: 16px;
      }
    }
  }
`;
