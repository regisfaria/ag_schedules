import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: var(--white);
  border-radius: 10px;
  padding: 16px;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;

  border: 2px solid var(--white);
  color: var(--input-placeholder);

  display: flex;
  align-items: center;

  select {
    background: transparent;
    flex: 1;
    border: none;
    color: var(--black);

    &::placeholder {
      color: var(--input-placeholder);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error-red);
    color: #fff;

    &::before {
      border-color: var(--error-red) transparent;
    }
  }
`;
