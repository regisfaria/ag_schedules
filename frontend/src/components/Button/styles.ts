import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #09644b;
  height: 54px;
  border: 0px;
  border-radius: 10px;
  padding: 0 16px;
  margin-top: 16px;
  width: 100%;
  color: var(--white);
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#09644b')};
  }
`;
