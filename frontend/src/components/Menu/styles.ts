import styled, { css, keyframes } from 'styled-components';
import { shade, lighten } from 'polished';

interface MenuProps {
  menuState: boolean;
}

interface UserTypeProps {
  role?: string;
}

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
  z-index: 9999;

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
  background-color: var(--white);
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
        color: ${shade(0.3, '#F7685B')};
        transform: scale(1.1);
      }
    }
  }
`;

export const MenuOption = styled.div<MenuProps>`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  font-size: 2rem;

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
`;

export const OptionLinkContainer = styled.div`
  width: 50%;

  a {
    display: flex;
    flex-direction: row;

    margin: 1.6rem 0;

    align-items: center;
    justify-content: flex-start;

    color: var(--table-black);
    text-decoration: none;
    transition: color 220ms;

    svg {
      color: var(--table-black);
      transition: color 220ms;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
        transform: scale(1.2);
      }
    }

    p {
      padding: 0 1.2rem;
    }
  }
`;

export const ProfileLinkContainer = styled.div<UserTypeProps>`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  width: 100%;

  img {
    width: 8rem !important;
    height: 8rem !important;
    border-radius: 50%;
  }

  a {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    margin: 3.2rem 1.6rem;

    color: var(--table-black);
    text-decoration: none;
    transition: color 220ms;

    span {
      font-weight: 200;
      font-size: 1.6rem;
      font-style: italic;
      color: var(--table-gray);
      padding: 0 1.2rem;

      svg {
        color: var(--table-black);
        transition: color 220ms;

        position: relative;
        top: 0.12rem;
      }
    }

    &:hover {
      color: var(--green);

      span {
        color: var(--green);

        svg {
          color: var(--green);
          transform: scale(1.2);
        }
      }
    }
  }

  ${props =>
    props.role === 'admin' &&
    css`
      display: none;
    `}
`;

export const AdminLockedOption = styled.div<UserTypeProps>`
  width: 50%;

  a {
    display: flex;
    flex-direction: row;

    margin: 1.6rem 0;

    align-items: center;
    justify-content: flex-start;

    color: var(--table-black);
    text-decoration: none;
    transition: color 220ms;

    svg {
      color: var(--table-black);
      transition: color 220ms;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
        transform: scale(1.2);
      }
    }

    p {
      padding: 0 1.2rem;
    }
  }

  ${props =>
    props.role === 'admin' &&
    css`
      display: none;
    `}
`;

export const SpecialistOnlyOption = styled.div<UserTypeProps>`
  display: none;
  width: 50%;

  a {
    display: flex;
    flex-direction: row;

    margin: 1.6rem 0;

    align-items: center;
    justify-content: flex-start;

    color: var(--table-black);
    text-decoration: none;
    transition: color 220ms;

    svg {
      color: var(--table-black);
      transition: color 220ms;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
        transform: scale(1.2);
      }
    }

    p {
      padding: 0 1.2rem;
    }
  }

  ${props =>
    props.role === 'specialist' &&
    css`
      display: flex;
    `}
`;

export const AdminOnlyOption = styled.div<UserTypeProps>`
  display: none;
  width: 50%;

  a {
    display: flex;
    flex-direction: row;

    margin: 1.6rem 0;

    align-items: center;
    justify-content: flex-start;

    color: var(--table-black);
    text-decoration: none;
    transition: color 220ms;

    svg {
      color: var(--table-black);
      transition: color 220ms;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
        transform: scale(1.2);
      }
    }

    p {
      padding: 0 1.2rem;
    }
  }

  ${props =>
    props.role === 'admin' &&
    css`
      display: flex;
    `}
`;

export const SupervisorOnlyOption = styled.div<UserTypeProps>`
  display: none;
  width: 50%;

  a {
    display: flex;
    flex-direction: row;

    margin: 1.6rem 0;

    align-items: center;
    justify-content: flex-start;

    color: var(--table-black);
    text-decoration: none;
    transition: color 220ms;

    svg {
      color: var(--table-black);
      transition: color 220ms;
    }

    &:hover {
      color: var(--green);

      svg {
        color: var(--green);
        transform: scale(1.2);
      }
    }

    p {
      padding: 0 1.2rem;
    }
  }

  ${props =>
    props.role === 'supervisor' &&
    css`
      display: flex;
    `}
`;

export const SpecialistLockedSection = styled.section<UserTypeProps>`
  display: flex;
  flex-direction: column;

  width: 100%;

  justify-content: center;
  align-items: center;

  main {
    width: 80%;

    margin: 1.6rem 0;

    border-bottom: 1px solid var(--table-black);

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: var(--table-black);
    }

    p {
      color: var(--table-black);
      padding: 0 1.2rem;

      width: 55%;
    }
  }

  div {
    margin-left: 5.1rem;

    a {
      margin-top: 0;
      padding-top: 0.5rem;
      font-size: 1.5rem;
    }
  }

  div + div {
    a {
      margin: 0 0 1.6rem;
    }
  }

  ${props =>
    props.role === 'specialist' &&
    css`
      display: none;
    `}
`;

export const AdminLockedSection = styled.section<UserTypeProps>`
  display: flex;
  flex-direction: column;

  width: 100%;

  justify-content: center;
  align-items: center;

  main {
    width: 80%;

    margin: 1.6rem 0;

    border-bottom: 1px solid var(--table-black);

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: var(--table-black);
    }

    p {
      color: var(--table-black);
      padding: 0 1.2rem;

      width: 55%;
    }
  }

  div {
    margin-left: 5.1rem;

    a {
      margin-top: 0;
      padding-top: 0.5rem;
      font-size: 1.5rem;
    }
  }

  div + div {
    a {
      margin: 0 0 1.6rem;
    }
  }

  ${props =>
    props.role === 'admin' &&
    css`
      display: none;
    `}
`;
