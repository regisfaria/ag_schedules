import styled from 'styled-components';

export const SearchDiv = styled.div`
  display: flex;
  position: relative;
  background-color: var(--white);
  width: 86.5%;
  left: 256px;
  height: 51px;
  align-items: center;
  padding: 0 20px 0 20px;
  border-left: 1px solid var(--divider);
  box-shadow: 0px 1px 0px 0px var(--divider);

  svg {
    position: relative;
    top: 3px;
    color: var(--icon-gray);
  }

  input {
    padding-left: 10px;
    margin-left: 10px;
    border: none;
    transition: background-color 300ms;
    border-radius: 10px;
    color: var(--white);
    margin-right: 5px;

    &:focus {
      background-color: var(--accent-blue);

      &::placeholder {
        color: var(--white);
      }
    }

    &::placeholder {
      color: var(--accent-blue);
    }
  }

  button {
    background-color: transparent;
    border: none;
  }
`;
