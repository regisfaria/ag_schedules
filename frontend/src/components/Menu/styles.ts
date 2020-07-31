import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface MenuProps {
  menuState: boolean;
}

interface DropdownButtonProps {
  open: boolean;
  menuState: boolean;
}

export const ShowMenu = styled.div`
  button {
    border: none;
    position: relative;
    position: fixed;
    top: 10px;
    left: 15px;
    background: transparent;

    svg {
      color: var(--green);
    }
  }
`;

export const SideMenuBox = styled.div<MenuProps>`
  position: fixed;
  display: flex;
  flex-direction: column;

  ${props =>
    props.menuState
      ? css`
          max-width: 500px;
          transition: max-width 0.8s ease-in-out;
          button {
            opacity: 1;
            transition: opacity 0.8s linear;
          }
        `
      : css`
          max-width: 0;
          transition: max-width 0.8s ease-in-out;
          button {
            opacity: 0;
            transition: opacity 0.8s linear;
          }
        `}

  left: 0px;
  top: 0px;
  bottom: 0px;
  background-color: var(--white);
  box-shadow: 1px 0 10px 0px var(--black);
  }
`;

export const CloseMenu = styled.div`
  button {
    border: none;
    position: relative;
    background: transparent;
    top: 10px;
    left: 15px;

    svg {
      color: var(--green);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${lighten(0.2, '#09644b')};
        transform: scale(1.1);
      }
    }
  }
`;

export const Logout = styled.div`
  justify-self: flex-end;

  button {
    border: none;
    position: relative;
    position: fixed;
    top: 10px;
    left: 200px;
    background: transparent;

    svg {
      color: var(--red);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${shade(0.2, '#F7685B')};
      }
    }
  }
`;

export const MenuOption = styled.div<MenuProps>`
  margin-top: 20px;
  border-top: 1px solid var(--table-gray);
  display: flex;
  flex-direction: column;

  ${props =>
    props.menuState
      ? css`
          opacity: 1;
          transition: opacity 0.8s linear;
        `
      : css`
          opacity: 0;
          transition: opacity 0.8s linear;
          pointer-events: none;
        `}

  a {
    padding: 0px 38px 0 40px;
    margin-right: 50px;
    align-items: center;
    display: flex;
    text-decoration: none;
    color: var(--table-black);
    transition: color 0.2s;

    margin-bottom: 30px;

    div {
      margin-top: 20px;
      display: flex;
      padding-left: 16px;

      svg {
        position: relative;
        top: 5px;
        color: var(--table-black);
        transition: color 220ms;
      }

      p {
        padding-left: 12px;
      }
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
        transform: scale(1.1);
      }
    }
  }
`;

export const DropdownButton = styled.div<DropdownButtonProps>`
  position: relative;
  display: inline-block;
  align-self: center;

  button {
    padding: 0px 50px 0 0;
    align-items: center;
    background: transparent;

    display: flex;
    flex-direction: column;
    align-self: flex-start;

    color: var(--table-black);
    border: none;
    transition: color 0.2s;

    margin-top: 20px;
    margin-bottom: 35px;

    svg {
      position: relative;
      top: 2px;
      color: var(--table-black);
      transition: color 220ms;
      margin-right: 12px;
    }

    p {
      padding-left: 16px;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
      }
    }

    div {
      position: relative;
      display: none;
      background: transparent;
      text-align: center;

      a {
        color: var(--table-black);
        margin: 20px 0 0 0;

        padding: 5px 0 0 22px;
        text-decoration: none;
        display: block;
      }

      ${props =>
        props.open
          ? css`
              display: block;
            `
          : css`
              display: none;
            `}
    }
  }

  ${props =>
    props.menuState
      ? css`
          button {
            opacity: 1;
            transition: opacity 0.8s linear;
          }
        `
      : css`
          button {
            opacity: 0;
            transition: opacity 0.8s linear;
            pointer-events: none;
          }
        `}
`;
