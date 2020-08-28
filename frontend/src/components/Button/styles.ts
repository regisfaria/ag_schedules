import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  height: 5rem;
  width: 90%;
  max-width: 20rem;

  background-image: linear-gradient(180deg, #0aa278 0%, #043c2c 100%);
  border: 0px;
  border-radius: 10px;
  color: var(--white);
  font-weight: 700;

  padding: 0 1.6rem;
  margin-bottom: 1rem;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#09644b')};
  }
`;
