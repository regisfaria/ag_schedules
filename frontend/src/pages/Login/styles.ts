import styled from 'styled-components';
import logoImg from '../../assets/logo.png';

export const LoginWindow = styled.div`
  width: 40rem;
  height: 34rem;
  border-radius: 40px;

  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: auto;
  margin-top: 10rem;
  margin-bottom: 5rem;

  background: #dff6fc url(${logoImg}) no-repeat top;
  box-shadow: 0 1px 1px 2px #d4f4fc;
`;

export const Content = styled.div`
  form {
    padding-top: 35%;
    text-align: center;

    h1 {
      margin: 0 0 30px 0;
      font-weight: 300;
      color: var(--table-black);
    }

    a {
      text-decoration: none;
      color: var(--table-black);
      transition: color 0.3s;

      &:hover {
        color: var(--green);
      }
    }

    button {
      margin-top: 20px;
    }
  }
`;
