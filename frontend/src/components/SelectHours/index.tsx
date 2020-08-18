import React from 'react';
import { Container } from './styles';

import Select from '../Select';
import Main from '../Main';

const SelectHours: React.FC = () => {
  return (
    <Container>
      <Main>
        <span>De:</span>
        <Select name="openTimeHour">
          <option value="" selected hidden>
            Horas
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>

        <Select name="openTimeMinute">
          <option value="" selected hidden>
            Min
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Main>

      <Main>
        <span>Até:</span>
        <Select name="closeTimeHour">
          <option value="" selected hidden>
            Horas
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>

        <Select name="closeTimeMinute">
          <option value="" selected hidden>
            Min
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Main>
    </Container>
  );
};

export default SelectHours;
