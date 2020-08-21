import React, { useEffect } from 'react';
import { Container } from './styles';

import Select from '../Select';
import Main from '../Main';

interface Day {
  id: string | undefined;
  formatedOpenTime: string | undefined;
  formatedCloseTime: string | undefined;
}

const SelectHours: React.FC<Day> = ({
  id,
  formatedOpenTime,
  formatedCloseTime,
}) => {
  return (
    <Container>
      <Main>
        <span>De:</span>
        <Select name="openTimeHour">
          <option value={formatedOpenTime} selected hidden>
            {formatedOpenTime}
          </option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>

        <Select name="openTimeMinute">
          <option value="" selected hidden>
            Min
          </option>
          <option value="00">00</option>
          <option value="30">30</option>
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

        <Select name="closeTimeMinute" disabled>
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
