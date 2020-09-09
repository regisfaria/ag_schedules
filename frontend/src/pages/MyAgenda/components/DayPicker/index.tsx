import React, { useRef, useState, useEffect, useCallback } from 'react';
import { parseISO, getYear, getDate, getMonth } from 'date-fns';
import DayPicker, {
  DayModifiers,
  DateUtils,
  DayPickerProps,
} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import * as Yup from 'yup';

import { Container, Modal, Legend } from './styles';

import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';

import Button from '../../../../components/Button';
import PageHeader from '../../../../components/PageHeader';

const Calendar: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef(null);
  const dayPickerRef = useRef(null);

  const [selectDate, setSelectDate] = useState<Date[]>([]);

  const [selectHoliday, setSelectHoliday] = useState<Date[]>([]);

  const [specialistHolidays, setSpecialistHolidays] = useState<Date[]>([]);

  const [specialistAvailableDays, setSpecialistAvailableDays] = useState<
    number[]
  >([]);

  const [specialistUnavailableDays, setSpecialistUnavailableDays] = useState<
    number[]
  >([]);

  const [validHoliday, setValidHolidays] = useState<Date[]>([]);

  useEffect(() => {
    api.get(`/schedules/holiday/${user.id}`).then(response => {
      setSpecialistHolidays(response.data);
    });

    api.get(`/schedules/availableDays/${user.id}`).then(response => {
      setSpecialistAvailableDays(response.data);
    });
  }, [user.id]);

  useEffect(() => {
    if (!specialistHolidays.length) {
      return;
    }
    const holidayDates: Date[] = specialistHolidays.map(holiday => {
      return parseISO(String(holiday));
    });

    setValidHolidays(holidayDates);
  }, [specialistHolidays]);

  useEffect(() => {
    if (!specialistAvailableDays.length) {
      return;
    }

    const unavailable: number[] = [0, 1, 2, 3, 4, 5, 6];

    specialistAvailableDays.forEach(day => {
      if (unavailable.findIndex(number => number === day)) {
        const index = unavailable.findIndex(number => number === day);

        unavailable.splice(index, 1);
      }
    });

    setSpecialistUnavailableDays(unavailable);
  }, [specialistAvailableDays]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.disabled) {
        return;
      }

      if (modifiers.holidays) {
        const index = selectHoliday.findIndex(selectedDay => {
          return DateUtils.isSameDay(selectedDay, day);
        });

        if (index !== -1) {
          const removeSelectedHoliday = selectHoliday.slice(0);
          removeSelectedHoliday.splice(index, 1);
          setSelectHoliday(removeSelectedHoliday);
        } else {
          setSelectHoliday([...selectHoliday, day]);
        }

        return;
      }

      if (modifiers.available) {
        const index = selectDate.findIndex(selectedDay => {
          return DateUtils.isSameDay(selectedDay, day);
        });

        if (index !== -1) {
          const removeSelectedDay = selectDate.slice(0);
          removeSelectedDay.splice(index, 1);
          setSelectDate(removeSelectedDay);
        } else {
          setSelectDate([...selectDate, day]);
        }
      }
    },
    [selectDate, selectHoliday],
  );

  const handleSubmit = useCallback(async (dates: Date[], holiday: Date[]) => {
    try {
      if (!dates.length && !holiday.length) {
        throw new Error();
      }

      const schema = Yup.array().max(50).of(Yup.date());

      await schema.validate(dates, {
        abortEarly: false,
      });

      await schema.validate(holiday, {
        abortEarly: false,
      });

      console.log(
        dates.map(
          date => `${getYear(date)}-${getMonth(date)}-${getDate(date)}`,
        ),
      );

      await dates.map(date =>
        api.post('/schedules/holiday', {
          day: `${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`,
        }),
      );
    } catch (err) {
      alert('erro');
    }
  }, []);

  return (
    <Container>
      <PageHeader
        title="Folgas"
        subTitle="Marque no calendario os dias de folgas"
      />
      <Modal>
        <DayPicker
          weekdaysShort={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
          fromMonth={new Date()}
          selectedDays={[...selectDate, ...selectHoliday]}
          onDayClick={handleDateChange}
          modifiers={{
            available: { daysOfWeek: specialistAvailableDays },
            holidays: validHoliday,
          }}
          disabledDays={[
            { daysOfWeek: specialistUnavailableDays },
            { before: new Date() },
          ]}
          showOutsideDays
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
        />

        <Legend>
          <div id="Hoje">
            <div />
            <span>Hoje</span>
          </div>

          <div id="DiaDeFolga">
            <div />
            <span>Dia de Folga</span>
          </div>

          <div id="DiasSelecionados">
            <div />
            <span>Dias Selecionados</span>
          </div>
        </Legend>
      </Modal>

      <Button
        type="submit"
        onClick={() => {
          handleSubmit(selectDate, selectHoliday);
        }}
      >
        Salvar
      </Button>
    </Container>
  );
};

export default Calendar;
