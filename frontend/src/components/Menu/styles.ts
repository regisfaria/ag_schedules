import styled, { css, keyframes } from 'styled-components';
import { shade, lighten } from 'polished';

interface MenuProps {
  menuState: boolean;
}

interface LinkContainerProps {
  role: string;
}

export const Backdrop = styled.section<MenuProps>`
  ${props =>
    props.menuState
      ? css`
          display: block;
          width: 100vw;
          height: 100vh;
          backdrop-filter: blur(3px);
          background-color: rgba(0, 0, 0, 0.3);
        `
      : css`
          display: hidden;
        `}
`;

export const ShowMenu = styled.div`
  button {
    border: none;
    position: fixed;
    top: 10px;
    left: 15px;
    background: transparent;

    svg {
      color: var(--green);
      transition: transform scale color 0.2s;
    }

    &:hover {
      svg {
        color: ${lighten(0.2, '#09644b')};
        transform: scale(1.1);
      }
    }
  }
`;

const blurEffectIn = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    backdrop-filter: blur(3px);
  }
`;

const blurEffectOut = keyframes`
  0% {
    backdrop-filter: blur(3px);
  }
  100% {
    backdrop-filter: 0;
    background-color: transparent;
  }
`;

export const SideMenuBoxContainer = styled.section<MenuProps>`
  position: fixed;

  display: flex;
  flex-direction: column;

  height: 100vh;

  ${props =>
    props.menuState
      ? css`
          width: 100%;
          animation: ${blurEffectIn} 1s;
          animation-fill-mode: forwards;
        `
      : css`
          width: 0;
          transition: width 1s ease-in-out;
          animation: ${blurEffectOut} 1s;
          animation-fill-mode: forwards;
        `}
`;

export const SideMenuBox = styled.div<MenuProps>`
  /* background-color: var(--white); */
  background-color: red;
  height: 100vh;
  box-shadow: 1px 0 10px 0 var(--black);

  ${props =>
    props.menuState
      ? css`
          max-width: 30rem;
          transition: max-width 0.5s ease-in-out;
          overflow: hidden;

          button {
            opacity: 1;
            transition: opacity 0.5s linear;
          }
        `
      : css`
          max-width: 0;
          transition: max-width 0.5s ease-in-out;

          button {
            opacity: 0;
            transition: opacity 0.5s linear;
            pointer-events: none;
          }
        `}
`;

export const SideMenuButtons = styled.div<MenuProps>`
  justify-content: space-between;

  /* Below height must have following math:
  btn height + btn padding top + btn padding bottom

   This happens because we set display none for buttons
  and we cant animate something that have this property
  so setting the div with the same height as it would have
  when the buttons appears, will cause the div to stay with the same
  height when they disappear */
  height: 5.6rem;

  border-bottom: 1px solid var(--table-gray);

  ${props =>
    props.menuState
      ? css`
          display: flex;
          flex-direction: row;
        `
      : css`
          display: hidden;
          button {
            display: none;
          }
        `}
`;

export const CloseMenu = styled.div`
  padding: 0.8rem 0 0.8rem 0;
  margin: 0 1.6rem 0 1.6rem;

  button {
    border: none;
    background: none;

    svg {
      color: var(--green);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${lighten(0.2, '#09644b')};
        transform: scale(1.2);
      }
    }
  }
`;

export const Logout = styled.div`
  padding: 0.8rem 0 0.8rem 0;
  margin: 0 1.6rem 0 1.6rem;

  button {
    border: none;
    background: none;

    svg {
      color: var(--red);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${shade(0.2, '#F7685B')};
        transform: scale(1.1);
      }
    }
  }
`;

export const MenuOption = styled.div<MenuProps>`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 20px;

  ${props =>
    props.menuState
      ? css`
          opacity: 1;
          transition: opacity 0.3s linear;
        `
      : css`
          opacity: 0;
          transition: opacity 0.3s linear;
          pointer-events: none;
        `}

  a {
    padding: 0px 49px 0 36px;
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
        top: 7px;
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

export const LinkContainer = styled.div`
  a {
    color: var(--table-black);
    margin: 20px 0 0 0;
    padding: 5px 0 0 22px;
    text-decoration: none;
    display: block;

    svg {
      position: relative;
      top: 2px;
      color: var(--table-black);
      transition: color 220ms;
      margin-right: 5px;
    }

    &:hover {
      svg {
        color: var(--green);
      }
    }
  }
`;

export const AgentLockedLinkContainer = styled.div<LinkContainerProps>`
  a {
    color: var(--table-black);
    margin: 20px 0 0 0;
    padding: 5px 0 0 22px;
    text-decoration: none;
    display: block;

    svg {
      position: relative;
      top: 2px;
      color: var(--table-black);
      transition: color 220ms;
      margin-right: 5px;
    }

    &:hover {
      svg {
        color: var(--green);
      }
    }

    ${props =>
      props.role === 'agent' &&
      css`
        display: none;
      `}
  }
`;

export const SpecialistLockedLinkContainer = styled.div<LinkContainerProps>`
  a {
    color: var(--table-black);
    margin: 20px 0 0 0;
    padding: 5px 0 0 22px;
    text-decoration: none;
    display: block;

    svg {
      position: relative;
      top: 2px;
      color: var(--table-black);
      transition: color 220ms;
      margin-right: 5px;
    }

    &:hover {
      svg {
        color: var(--green);
      }
    }

    ${props =>
      props.role === 'specialist' &&
      css`
        display: none;
      `}
  }
`;

export const AdminOnlyLinkContainer = styled.div<LinkContainerProps>`
  a {
    color: var(--table-black);
    margin: 20px 0 0 0;
    padding: 5px 0 0 22px;
    text-decoration: none;
    display: none;

    svg {
      position: relative;
      top: 2px;
      color: var(--table-black);
      transition: color 220ms;
      margin-right: 5px;
    }

    &:hover {
      svg {
        color: var(--green);
      }
    }

    ${props =>
      props.role === 'admin' &&
      css`
        display: block;
      `}
  }
`;
