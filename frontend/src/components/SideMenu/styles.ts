import styled, { css } from 'styled-components';

interface ShowMenuProps {
  menuState: boolean;
}

export const ShowMenu = styled.div`
  button {
    border: none;
    position: relative;
    top: 10px;
    left: 15px;
    background: transparent;

    svg {
      color: var(--green);
    }
  }
`;

export const SideMenuBox = styled.div<ShowMenuProps>`
  position: fixed;

  ${props =>
    props.menuState
      ? css`
          max-width: 500px;
          transition: max-width 1s ease-in-out;
          button {
            opacity: 1;
            transition: opacity 1s linear;
          }
        `
      : css`
          max-width: 0;
          transition: max-width 1s ease-in-out;
          button {
            opacity: 0;
            transition: opacity 1s linear;
          }
        `}

  left: 0px;
  top: 0px;
  bottom: 0px;
  background-color: var(--white);
  box-shadow: 1px 0 10px 0px var(--black);

  button {
    border: none;
    position: relative;
    background: transparent;
    top: 10px;
    left: 15px;

    svg {
      color: var(--green);
    }
  }
`;

export const MenuOption = styled.div<ShowMenuProps>`
  margin-top: 20px;
  border-top: 1px solid var(--table-gray);

  ${props =>
    props.menuState
      ? css`
          opacity: 1;
          transition: opacity 1s linear;
        `
      : css`
          opacity: 0;
          transition: opacity 1s linear;
          pointer-events: none;
        `}

  a {
    padding: 0px 50px 0 16px;
    width: 100%;
    align-items: center;
    display: flex;
    text-decoration: none;
    color: var(--table-black);
    transition: color 0.2s;

    div {
      margin-top: 20px;
      display: flex;
      padding-left: 16px;

      p {
        padding-left: 16px;
      }
    }

    svg {
      position: relative;
      top: 5px;
      color: var(--table-black);
      transition: color 220ms;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
      }
    }

    & + a {
      margin-top: 60px;
    }
  }
`;
