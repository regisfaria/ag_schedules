import styled, { css, keyframes } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
}

const blurEffectIn = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    backdrop-filter: blur(3px);
  }
`;

export const Modal = styled.div<ModalProps>`
  position: fixed;

  width: 100%;
  height: 100%;

  z-index: 100;

  background-color: rgba(0, 0, 0, 0.9);

  section {
    display: flex;

    section {
      flex-direction: column;
    }

    justify-content: center;
    align-items: center;

    svg {
      color: #42d778;
    }

    strong {
      color: var(--white);
      font-size: 2rem;
      border-bottom: 1px solid var(--table-black);
    }

    span {
      color: var(--white);
      font-size: 1.6rem;
    }
  }

  ${props =>
    props.isOpen
      ? css`
          display: flex;
          animation: ${blurEffectIn} 1s;
          animation-fill-mode: forwards;
        `
      : css`
          display: none;
        `}

  @media (min-width: 1024px) {
    section {
      section {
        flex-direction: row;
      }

      strong {
        font-size: 3rem;
      }

      span {
        font-size: 2.2rem;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 3rem;
  padding: 0 3rem;

  width: 25rem;

  button {
    width: 100%;
  }
`;
