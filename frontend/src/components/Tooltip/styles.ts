import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: var(--green);
    width: 160px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700px;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: var(--green) transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 720px) {
    span {
      transform: translateX(-85%);

      &::before {
        content: '';

        left: 89%;
        transform: translateX(-95%);
      }
    }
  }
`;
